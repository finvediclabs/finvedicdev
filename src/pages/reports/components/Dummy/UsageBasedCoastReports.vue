<template>
  <div class="vm-container">
    <!-- Dropdown above charts -->
    <div class="dropdown-container" v-if="!isStudent">
      <label for="user-select">Users:</label>
      <select id="user-select" v-model="selectedUser" @change="filterVMsByUser">
        <option value="">All Users</option>
        <option v-for="vm in groupedVMs" :key="vm.userName" :value="vm.userName">
          {{ vm.userName || 'N/A' }}
        </option>
      </select>
    </div>

    <!-- Chart containers -->
    <div class="charts-container">
      <!-- Left: Doughnut Chart -->
      <div class="chart-half doughnut-container">
        <DoughnutChart2 :data="filteredVMs" />
      </div>
      <div class="chart-half bar-chart-container">
        <div class="navigation-buttons">
          <q-btn @click="previousWeek">←</q-btn>
          <q-btn @click="nextWeek">→</q-btn>
        </div>
        <BarChart :data="chartData" />
      </div>
    </div>

    <!-- Bottom: Table -->
    <div class="table-container" style="margin-top: 7%;">
      <!-- First Table with Pagination -->
      <table class="vm-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>VM Name</th>
            <th>Active Time For All VMs</th>
            <th>Remaining Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vm in paginatedFirstTableVMs" :key="vm.userName + '-' + vm.names.join('-')">
            <td>{{ vm.userName || 'N/A' }}</td>
            <td>{{ vm.names.join(', ') }}</td>
            <td>{{ formatTime(vm.totalActiveTime2) }}</td>
            <td>{{ formatTime(calculateRemainingTime(vm.totalActiveTime2)) }}</td> <!-- Remaining Time -->
          </tr>
        </tbody>
      </table>
      <div v-if="!selectedUser" class="pagination">
            <button @click="prevPageFirstTable" :disabled="currentPageFirstTable === 1">Previous</button>
            <span>Page {{ currentPageFirstTable }}</span>
            <button @click="nextPageFirstTable" :disabled="currentPageFirstTable >= totalPagesFirstTable">Next</button>
      </div>


      <!-- Second Table with Pagination -->
      <table class="vm-table" style="margin-top: 3%;">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>VM Name</th>
            <th>Created Date</th>
            <th>Started Time</th>
            <th>End Time</th>
            <th>Active Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(vm, index) in paginatedSecondTableVMs" :key="vm.name + '-' + index">
            <td>{{ (index + 1) + (currentPageSecondTable - 1) * rowsPerPage }}</td>
            <td>{{ vm.name }}</td>
            <td>{{ formatDate(vm.createdDate) }}</td>
            <td>{{ formatTimeFromDateTime(vm.createdDate) }}</td>
            <td>{{ formatTimeFromDateTime(vm.deletedDate) || 'N/A' }}</td>
            <td>{{ formatTime(vm.activeTime || 0) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="filteredSecondTableVMs.length > rowsPerPage" class="pagination">
            <button @click="prevPageSecondTable" :disabled="currentPageSecondTable === 1">Previous</button>
            <span>Page {{ currentPageSecondTable }}</span>
            <button @click="nextPageSecondTable" :disabled="currentPageSecondTable >= totalPagesSecondTable">Next</button>
        </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DoughnutChart2 from './DoughnutChart2.vue';
import BarChart from 'src/pages/reports/components/BarChart.vue';
import { storeToRefs } from 'pinia';
import { useProfileStore } from "src/stores/profile";
import { useSessionStore } from 'src/stores/session';

export default {
  components: {
    BarChart,
    DoughnutChart2
  },
  data() {
    return {
      vms: [],
      groupedVMs: [],
      filteredVMs: [],
      selectedUser: '',
      chartData: { labels: [], datasets: [] },
      startDate: new Date(),
      currentPageFirstTable: 1,
      currentPageSecondTable: 1,
      rowsPerPage: 5, // Number of rows to display per page
    };
  },
  setup() {
    const profileStore = useProfileStore();
    const session = useSessionStore();
    const { userType, userId } = storeToRefs(session);
    return {
      userType,
      userId,
      profileStore
    };
  },
  computed: {
    isStudent() {
      return this.userType === 'Student';
    },
    filteredSecondTableVMs() {
    // Get the names of the VMs from the first table
    const firstTableVMNames = this.filteredVMs.flatMap(vm => vm.names);
    
    // Filter the `vms` array to include only the VMs present in the first table
    return this.vms.filter(vm => firstTableVMNames.includes(vm.name));
  },
  paginatedFirstTableVMs() {
      const start = (this.currentPageFirstTable - 1) * this.rowsPerPage;
      const end = this.currentPageFirstTable * this.rowsPerPage;
      return this.filteredVMs.slice(start, end);
    },
    // Paginated data for the second table
    paginatedSecondTableVMs() {
      const start = (this.currentPageSecondTable - 1) * this.rowsPerPage;
      const end = this.currentPageSecondTable * this.rowsPerPage;
      return this.filteredSecondTableVMs.slice(start, end);
    },
    // Calculate total pages for the first table
    totalPagesFirstTable() {
      return Math.ceil(this.filteredVMs.length / this.rowsPerPage);
    },
    // Calculate total pages for the second table
    totalPagesSecondTable() {
      return Math.ceil(this.filteredSecondTableVMs.length / this.rowsPerPage);
    }
  },
  mounted() {

    this.fetchVMs();
        this.setSelectedUser();
  },
  methods: {
    
    async fetchVMs() {
      try {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const labsURL = baseUrl + 'api/labVms/deleted';
        const response = await axios.get(labsURL);
        this.vms = response.data.data; // Adjust according to the data structure

        if (this.isStudent) {
          this.vms = this.vms.filter(vm => vm.userId === this.userId);
          
        }

        this.groupVMsByUser();
        this.filterVMsByUser(); // Update filtered data based on initial conditions
      } catch (error) {
        console.error('Error fetching VM data:', error);
      }
    },

    setSelectedUser() {
        this.selectedUser = this.profileStore.user.email;
        this.filterVMsByUser(); // Ensure that data is filtered for the selected user
      
    },
    groupVMsByUser() {
      const grouped = {};
      
      this.vms.forEach(vm => {
        const userName = vm.userName || 'N/A';
        if (!grouped[userName]) {
          grouped[userName] = {
            userName,
            names: [],
            totalActiveTime: 0,
            totalActiveTime2: 0
          };
        }
        grouped[userName].names.push(vm.name);
        grouped[userName].totalActiveTime2 += vm.activeTime;
        grouped[userName].totalActiveTime += vm.activeTime/60;
      });

      this.groupedVMs = Object.values(grouped);
    },
    async filterVMsByUser() {
      if (this.isStudent) {
        const userEmail = this.profileStore.user.email;
        this.filteredVMs = this.groupedVMs.filter(vm => vm.userName === userEmail);
        this.chartData = this.getChartDataForUser(userEmail); // Update chart data
      } else {
        if (this.selectedUser) {
          this.filteredVMs = this.groupedVMs.filter(vm => vm.userName === this.selectedUser);
          this.chartData = this.getChartDataForUser(this.selectedUser); // Update chart data
        } else {
          this.filteredVMs = this.groupedVMs;
          this.chartData = this.getChartDataForUser(); // Optionally, update for all users if needed
        }
      }
    },
    getChartDataForUser(userName) {
      const userVMs = this.vms.filter(vm => vm.userName === userName);
      const result = {};

      userVMs.forEach(vm => {
        const createdDate = new Date(vm.createdDate);
        if (createdDate >= this.startDate && createdDate < this.getNextWeekStart()) {
          const dateKey = createdDate.toISOString().split('T')[0]; // YYYY-MM-DD

          if (!result[dateKey]) {
            result[dateKey] = {
              totalActiveTime: 0,
              vms: []
            };
          }

          const activeTime = vm.activeTime || 0;
          result[dateKey].totalActiveTime += activeTime;
          result[dateKey].vms.push(vm);
        }
      });

      return this.formatChartData(result);
    },
    formatTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60); // Get the whole number of hours
    const minutes = totalMinutes % 60;           // Get the remaining minutes
    return `${hours} hours ${minutes} minutes`;
  },
  
    formatChartData(result) {
      const data = [];
      const labels = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(this.startDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];

        labels.push(dateStr);
        data.push(result[dateStr]?.totalActiveTime/60 || 0);
      }

      return {
        labels,
        datasets: [
          {
            label: 'Active Time',
            data,
            backgroundColor: '#5479F7', // Customize color
          }
        ]
      };
    },
        calculateRemainingTime(activeTime) {
        const totalTime = 18000; // Total time is 5 hours (18000 seconds)
        const remainingTime = totalTime - activeTime;
        return remainingTime > 0 ? remainingTime : 0; // Ensure no negative time
        },
        formatDate(dateString) {
        if (!dateString) return 'N/A';
        return dateString.split('T')[0]; // Get date part
      },

      // Extracts the time part (after the "T")
      formatTimeFromDateTime(dateString) {
        if (!dateString) return 'N/A';
        return dateString.split('T')[1].split('.')[0]; // Get time part, remove milliseconds
      },

      // Format active time (already implemented)
      formatTime(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours} hours ${minutes} minutes`;
      },
    previousWeek() {
      this.startDate.setDate(this.startDate.getDate() - 7);
      this.filterVMsByUser();
    },
    nextWeek() {
      this.startDate.setDate(this.startDate.getDate() + 7);
      this.filterVMsByUser();
    },
    getNextWeekStart() {
      const nextWeekStart = new Date(this.startDate);
      nextWeekStart.setDate(this.startDate.getDate() + 7);
      return nextWeekStart;
    },
    nextPageFirstTable() {
      if (this.currentPageFirstTable < this.totalPagesFirstTable) {
        this.currentPageFirstTable++;
      }
    },
    prevPageFirstTable() {
      if (this.currentPageFirstTable > 1) {
        this.currentPageFirstTable--;
      }
    },
    nextPageSecondTable() {
      if (this.currentPageSecondTable < this.totalPagesSecondTable) {
        this.currentPageSecondTable++;
      }
    },
    prevPageSecondTable() {
      if (this.currentPageSecondTable > 1) {
        this.currentPageSecondTable--;
      }
    }
  }
}
</script>

<style scoped>
.vm-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
}

.dropdown-container {
  margin-bottom: 20px;
}

.charts-container {
  display: flex;
  justify-content: space-between;
  height: 60%;
  margin-bottom: 20px;
}

.chart-half {
  width: 48%;
}

.doughnut-container {
  width: 60%;
  height: 80%;
}

.bar-chart-container {
  width: 100%;
  position: relative; /* Added for positioning navigation buttons */
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  background-color: #5479F7;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #4059d0;
}

.table-container {
  flex-grow: 1;
}

.vm-table {
  width: 100%;
  border-collapse: collapse;
}

th {
  color: #ffffff;
  background-color: #5479F7;
}

th, td {
  border: 1px solid #5479F7;
  padding: 8px;
  text-align: left;
}
</style>

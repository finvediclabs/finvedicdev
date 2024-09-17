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
    <div class="table-container">
      <table class="vm-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>VM Name</th>
            <th>Active Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vm in filteredVMs" :key="vm.userName + '-' + vm.names.join('-')">
            <td>{{ vm.userName || 'N/A' }}</td>
            <td>{{ vm.names.join(', ') }}</td>
            <td>{{ formatTime(vm.totalActiveTime2) }}</td>
          </tr>
        </tbody>
      </table>
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
      chartData: { labels: [], datasets: [] }, // Initialize chartData
      startDate: new Date(),
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

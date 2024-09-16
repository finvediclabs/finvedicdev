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

      <!-- Right: Bar Chart for Daily VM Usage -->
      <div class="chart-half bar-chart-container">
        <BarChart :labels="dailyUsageLabels" :data="dailyUsageData" />
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
            <td>{{ vm.totalActiveTime }} minutes</td>
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
      dailyUsageLabels: [],
      dailyUsageData: []
    };
  },
  setup() {
    const profileStore = useProfileStore();
    const session = useSessionStore();
    const { userType, userId } = storeToRefs(session);

     const email = profileStore.user.email;
     console.log("email", email);
    return {
      userType,
      userId,
      profileStore
    };
  },
  computed: {
    isStudent() {
      // Check if the logged-in user is a student
      return this.userType === 'Student';
    }
  },
  mounted() {
    this.fetchVMs();
  },
  methods: {
    async fetchVMs() {
      try {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const labsURL = baseUrl + 'api/labVms/deleted';
        const response = await axios.get(labsURL);
        this.vms = response.data.data; // Adjust according to the data structure

        if (this.isStudent) {
          // Filter data for student users (display only their VMs)
          this.vms = this.vms.filter(vm => vm.userId === this.userId);
        }

        this.groupVMsByUser();
        this.filterVMsByUser(); // Update filtered data based on initial conditions
        this.calculateDailyUsage();
      } catch (error) {
        console.error('Error fetching VM data:', error);
      }
    },
    groupVMsByUser() {
      const grouped = {};
      
      this.vms.forEach(vm => {
        const userName = vm.userName || 'N/A';
        if (!grouped[userName]) {
          grouped[userName] = {
            userName,
            names: [],
            totalActiveTime: 0
          };
        }
        grouped[userName].names.push(vm.name);
        grouped[userName].totalActiveTime += vm.activeTime;
      });

      this.groupedVMs = Object.values(grouped);
    },
    filterVMsByUser() {
  if (this.isStudent) {
    // For students, filter VMs based on user email
    const userEmail = this.profileStore.user.email;
    this.filteredVMs = this.groupedVMs.filter(vm => vm.userName === userEmail);
  } else {
    if (this.selectedUser) {
      this.filteredVMs = this.groupedVMs.filter(vm => vm.userName === this.selectedUser);
    } else {
      this.filteredVMs = this.groupedVMs;
    }
  }
    },
    calculateDailyUsage() {
      // Group VM data by day
      const usageByDate = {};

      this.vms.forEach(vm => {
        const date = new Date(vm.date).toLocaleDateString(); // Convert to a readable date format
        if (!usageByDate[date]) {
          usageByDate[date] = {
            label: date,
            data: 0
          };
        }
        usageByDate[date].data += vm.activeTime; // Summing up the active time for each day
      });

      // Prepare the labels and data for the bar chart
      this.dailyUsageLabels = Object.keys(usageByDate);
      this.dailyUsageData = Object.values(usageByDate);
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
  height: 60%; /* Increased height for charts */
  margin-bottom: 20px;
}

.chart-half {
  width: 48%;
}

.doughnut-container {
  width: 60%; /* Increase width for doughnut chart */
  height: 80%; /* Increase height for doughnut chart */
}

.bar-chart-container {
  width: 100%; /* Adjust width for bar chart to balance the layout */
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

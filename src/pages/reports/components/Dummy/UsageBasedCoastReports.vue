<template>
  <div class="vm-container">
    <BarChart :data="groupedVMs" barColor="rgba(84, 121, 247, 0.8)" borderColor="rgba(84, 121, 247, 1)" class="half-height" />
    <table class="half-height">
      <thead>
        <tr>
          <th>Username</th>
          <th>VM Name</th>
          <th>Active Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vm in groupedVMs" :key="vm.userName">
          <td>{{ vm.userName || 'N/A' }}</td>
          <td>{{ vm.names.join(', ') }}</td>
          <td>{{ vm.totalActiveTime }} minutes</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import BarChart from './Barchart.vue';

export default {
  components: {
    BarChart
  },
  data() {
    return {
      vms: [],
      groupedVMs: []
    };
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
        this.groupVMsByUser();
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

.half-height {
  height: 50%;
}

table {
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

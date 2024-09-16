<template>
  <div>
    <!-- Date Selector -->
    <div class="date-selector">
      <label for="date-select">Select Date: </label>
      <input type="date" id="date-select" v-model="selectedDate" @change="onDateChange" />
    </div>

    <!-- Bar Chart -->
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import ColorHash from 'color-hash';

// Register the required Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const colorHash = new ColorHash();

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    data: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      selectedDate: '',
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + ' hours';
                }
                return label;
              }
            }
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Day of the Week',
            },
          },
          y: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 1,
            },
            title: {
              display: true,
              text: 'Time of VM Usage (hours)',
            },
          },
        },
      },
    };
  },
  computed: {
    chartData() {
      // Calculate usage data based on the selected user
      const usageByDay = this.processDataByDay();
      return {
        labels: this.weekdays,
        datasets: [
          {
            label: 'VM Usage Time (hours)',
            data: usageByDay,
            backgroundColor: usageByDay.map((_, index) => colorHash.hex(this.weekdays[index])), // Assign dynamic colors to bars
          },
        ],
      };
    },
  },
  methods: {
    onDateChange() {
      this.fetchDailyData(this.selectedDate);
    },
    processDataByDay() {
      // Initialize usage by day with zero
      const usageByDay = Array(7).fill(0);

      // Calculate usage by day for the selected user
      if (this.data.length > 0) {
        this.data.forEach(vm => {
          const date = new Date(vm.date);
          const dayIndex = date.getDay();
          const usageHours = vm.activeTime / 60;
          usageByDay[dayIndex] += usageHours;
        });
      }

      return usageByDay;
    },
  },
};
</script>

<style scoped>
#my-chart-id {
  max-width: 100%;
  max-height: 100%;
}
.date-selector {
  margin-bottom: 10px;
}
</style>

<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
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

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    data: {
      type: Object,
      default: () => ({
        labels: [],
        datasets: []
      }),
    }
  },
  computed: {
    chartData() {
      return this.data; // Directly return the data prop to the chart
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
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
              text: 'Date',
            },
            ticks: {
              autoSkip: true,
              maxRotation: 90,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Active Time (hours)',
            },
          },
        },
      };
    }
  }
};
</script>

<style scoped>
/* Ensure the chart fits within its container */
#my-chart-id {
  max-width: 100%;
  max-height: 100%;
}
</style>

<template>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    props: {
      data: {
        type: Array,
        required: true
      },
      barColor: {
        type: String,
        default: 'rgba(84, 121, 247, 0.8)' // Updated background color with less transparency
      },
      borderColor: {
        type: String,
        default: 'rgba(84, 121, 247, 1)' // Default border color for bars
      }
    },
    mounted() {
      this.renderChart();
    },
    watch: {
      data: {
        handler() {
          this.renderChart();
        },
        deep: true
      }
    },
    methods: {
      renderChart() {
        if (this.chart) {
          this.chart.destroy();
        }
  
        const ctx = this.$refs.canvas.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.data.map(item => item.userName || 'N/A'),
            datasets: [{
              label: 'Active Time (minutes)',
              data: this.data.map(item => item.totalActiveTime),
              backgroundColor: this.barColor,
              borderColor: this.borderColor,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    },
    data() {
      return {
        chart: null
      }
    }
  }
  </script>
  
  <style scoped>
  canvas {
    max-width: 100%;
  }
  </style>
  
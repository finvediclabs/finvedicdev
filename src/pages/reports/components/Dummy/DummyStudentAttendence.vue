<template>
  <div class="chart-container">
    <div class="chart-row">
      <div class="chart-item">
        <canvas ref="barChart" class="chart-canvas"></canvas>
      </div>
    </div>
    <div class="chart-row">
      <div class="chart-item">
        <canvas ref="stackedBarChart" class="chart-canvas"></canvas>
      </div>
      <div class="chart-item">
        <canvas ref="lineChart" class="chart-canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      this.renderChart(this.$refs.barChart, 'bar', 'Student Attendance');
      this.renderStackedBarChart(this.$refs.stackedBarChart, 'Stacked Bar Chart');
      this.renderChart(this.$refs.lineChart, 'line', 'Line Chart');
    },
    renderChart(canvasRef, chartType, chartLabel) {
      var ctx = canvasRef.getContext('2d');
      const options = {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        layout: {
          padding: 10
        }
      };
      new Chart(ctx, {
        type: chartType,
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [{
            label: chartLabel,
            data: [30, 35, 28, 32, 37], // Dummy data for attendance
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: options
      });
    },
    renderStackedBarChart(canvasRef, chartLabel) {
      var ctx = canvasRef.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [{
            label: 'Present',
            data: [25, 30, 22, 28, 35],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          }, {
            label: 'Absent',
            data: [5, 5, 6, 4, 2],
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }]
        },
        options: {
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          },
          layout: {
            padding: 10
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adjust gap between rows */
  height: 600px; /* Fixed height for the container */
}

.chart-row {
  display: flex;
  gap: 20px; /* Adjust gap between items in a row */
}

.chart-item {
  flex: 1; /* Each chart item takes up equal space */
}

.chart-canvas {
  height: 100%; /* Each chart takes up 100% of the container's height */
  width: 100%;
}
</style>

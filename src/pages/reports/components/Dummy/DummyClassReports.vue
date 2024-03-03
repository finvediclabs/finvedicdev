<template>
    <div class="chart-container">
      <div class="chart-item">
        <canvas ref="barChart" class="chart-canvas"></canvas>
      </div>
      <div class="chart-item">
        <canvas ref="pieChart" class="chart-canvas"></canvas>
      </div>
      <div class="chart-item">
        <canvas ref="stackedBarChart" class="chart-canvas"></canvas>
      </div>
      <div class="chart-item">
        <canvas ref="lineChart" class="chart-canvas"></canvas>
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
        this.renderChart(this.$refs.barChart, 'bar', 'Class Reports');
        this.renderPieChart(this.$refs.pieChart);
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
              data: [80, 75, 82, 78, 85], // Dummy data for class reports
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
      renderPieChart(canvasRef) {
        var ctx = canvasRef.getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [{
              label: 'Pie Chart',
              data: [80, 75, 82, 78, 85], // Dummy data for class reports
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
              ]
            }]
          },
          options: {
            plugins: {
              legend: {
                labels: {
                  generateLabels: function(chart) {
                    return [];
                  }
                }
              }
            }
          }
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
              data: [70, 75, 72, 68, 80],
              backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }, {
              label: 'Absent',
              data: [10, 5, 10, 10, 5],
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(0, 1fr); /* Ensure all rows take up equal height */
    gap: 20px; /* Adjust gap between items */
    height: 600px; /* Fixed height for the container */
  }
  
  .chart-item {
    width: 100%;
  }
  
  .chart-canvas {
    height: 100%; /* Each chart takes up 50% of the container's height */
    width: 100%;
  }
  </style>
  
<template>
    <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, DoughnutController, ArcElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, DoughnutController, ArcElement, CategoryScale, LinearScale);
  
  import ColorHash from 'color-hash';
  var colorHash = new ColorHash();
  
  export default {
    name: 'DoughnutChart2',
    components: { Doughnut },
    props: {
      data: {
        type: Array,
        default: () => { return []; }
      }
    },
    computed: {
      chartData() {
        const totalMinutes = 200; // Total time is 5 hours in minutes (5 * 60 = 300 minutes)
  
        // If a specific user is selected, use that user's data
        const userActiveTime = this.data[0] ? this.data[0].totalActiveTime : 0;
        const remainingTime = totalMinutes - userActiveTime;
  
        const labels = this.data[0] ? [this.data[0].userName, 'Remaining Time'] : ['No User Selected', 'Remaining Time'];
        const dataValues = [userActiveTime, remainingTime];
  
        return {
          labels,
          datasets: [
            {
              label: 'Time Distribution',
              data: dataValues,
              backgroundColor: [colorHash.hex(labels[0]), '#FFFFFF'],
              borderColor: [colorHash.hex(labels[0]), '#CCCCCC'],
              borderWidth: 1
            }
          ]
        };
      },
    },
    data() {
      return {
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            }
          }
        }
      }
    },
  }
  </script>
  
  <style scoped>
  #my-chart-id {
    max-width: 100%;
    max-height: 100%;
    /* margin-left: 25%; */
  }
  
  </style>
  
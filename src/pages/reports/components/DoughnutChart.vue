<template>
  <doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, DoughnutController, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, DoughnutController, CategoryScale, LinearScale)


import ColorHash from 'color-hash'
var colorHash = new ColorHash();

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  props: {
    labels: {
      type: Array,
      default: () => { return []; }
    },
    data: {
      type: Array,
      default: () => { return []; }
    },
  },
  data() {
    return {

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "left",
          }
        }
      }
    }
  },
  computed: {
    chartData() {
      
      var request = {
        labels: this.labels,
        datasets: this.data.map(item => (
          {
            ...item,
            backgroundColor: this.labels.map(lab => { return colorHash.hex(lab) })
          }
        ))
      }
      return request;
    }
  }

}
</script>

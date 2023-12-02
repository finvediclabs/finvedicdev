<template>
  <pie id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PieController, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PieController, ArcElement, CategoryScale, LinearScale)

import ColorHash from 'color-hash'
var colorHash = new ColorHash();

export default {
  name: 'BarChart',
  components: { Pie },
  props: {
    labels: {
      type: Array,
      default: () => { return []; }
    },
    data: {
      type: Array,
      default: () => { return []; }
    }
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

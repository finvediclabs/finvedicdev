<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


import ColorHash from 'color-hash'
var colorHash = new ColorHash();

export default {
  name: 'BarChart',
  components: { Bar },
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
  computed: {
    chartData() {
      var request = {
        labels: this.labels,
        datasets: this.data.map(item=> ({ ...item, backgroundColor: colorHash.hex(item.label)}))
      }
      return request;
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true
      }
    }
  },
}
</script>

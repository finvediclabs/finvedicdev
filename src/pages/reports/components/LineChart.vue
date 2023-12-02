<template>
  <LineChartGenerator :chartOptions="chartOptions" :chartData="chartDataToPass" :data="chartDataToPass" id="chartId"
    v-if="chartDataToPass.labels.length && chartDataToPass.datasets.length" />
    <span style=" visibility: hidden;" class="float-left">{{ chartDataToPass.datasets.length }}</span>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs';

import ColorHash from 'color-hash'
var colorHash = new ColorHash();

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement, Filler
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement, Filler
);

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    labels: {},
    data: {},
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        options: {
          plugins: {
            filler: {
              propagate: this.filler
            }
          }
        }
      }
    }
  },
  computed: {
    chartDataToPass() {
      return {
        labels: this.labels,
        datasets: this.data.map(item => ({
          ...item,
          borderColor: colorHash.hex(item.label),
          backgroundColor: colorHash.hex(item.label)
        }))
      }

    }
  },
};
</script>

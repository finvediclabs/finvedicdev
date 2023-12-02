<template>
  <fin-portlet>
    <fin-portlet-header class="q-px-sm">
      <fin-portlet-heading>Reports</fin-portlet-heading>
    </fin-portlet-header>

    <!-- <fin-portlet-item>
      <div class="row">
        <div class="col-6 q-pa-sm" v-for="i in 4">
          <fin-portlet class="shadow-3 full-height">
            <fin-portlet-header bordered>
              <fin-portlet-heading>Report {{ i }}</fin-portlet-heading>
              <fin-portlet-item>
                <q-btn-group class="fin-br-8">
                  <q-btn icon="bar_chart" :color="reportChart[i] == 'bar' ? 'blue-8' : 'grey-5'"
                    @click="reportChart[i] = 'bar'" />
                  <q-btn icon="pie_chart" :color="reportChart[i] == 'pie' ? 'blue-8' : 'grey-5'"
                    @click="reportChart[i] = 'pie'" />
                  <q-btn icon="donut_large" :color="reportChart[i] == 'doughnut' ? 'blue-8' : 'grey-5'"
                    @click="reportChart[i] = 'doughnut'" />
                  <q-btn icon="ssid_chart" :color="reportChart[i] == 'line' ? 'blue-8' : 'grey-5'"
                    @click="reportChart[i] = 'line'" />
                </q-btn-group>
              </fin-portlet-item>
            </fin-portlet-header>
            <fin-portlet-item>
              <bar-chart :labels="labels" :data="lineData" v-if="reportChart[i] == 'bar'" />
              <pie-chart :labels="labels" :data="pieData" v-if="reportChart[i] == 'pie'" />
              <doughnut-chart :labels="labels" :data="pieData" v-if="reportChart[i] == 'doughnut'" />
              <line-chart :labels="labels" :data="lineData" v-if="reportChart[i] == 'line'" />
            </fin-portlet-item>
          </fin-portlet>
        </div>
      </div>
    </fin-portlet-item> -->

    <fin-portlet-item>
      <fin-portlet  class="q-pa-none">
        <fin-portlet-header>
          <fin-portlet-heading>
            Single Object Graph
          </fin-portlet-heading>
        </fin-portlet-header>
        <fin-portlet-item>
          <div class="row">
            <div class="col-12 col-md-6 q-pa-sm" v-for="i in 4">
              <fin-portlet class="shadow-3 full-height">
                <fin-portlet-header bordered>
                  <fin-portlet-heading>Report {{ i }}</fin-portlet-heading>
                  <!-- <fin-portlet-item>
                    <q-btn-group class="fin-br-8">
                      <q-btn icon="bar_chart" :color="reportChart[i] == 'bar' ? 'blue-8' : 'grey-5'"
                        @click="reportChart[i] = 'bar'" />
                      <q-btn icon="pie_chart" :color="reportChart[i] == 'pie' ? 'blue-8' : 'grey-5'"
                        @click="reportChart[i] = 'pie'" />
                      <q-btn icon="donut_large" :color="reportChart[i] == 'doughnut' ? 'blue-8' : 'grey-5'"
                        @click="reportChart[i] = 'doughnut'" />
                      <q-btn icon="ssid_chart" :color="reportChart[i] == 'line' ? 'blue-8' : 'grey-5'"
                        @click="reportChart[i] = 'line'" />
                    </q-btn-group>
                  </fin-portlet-item> -->
                </fin-portlet-header>
                <fin-portlet-item>
                  <bar-chart :labels="labels" :data="lineData" v-if="reportChart[i] == 'bar'" />
                  <pie-chart :labels="labels" :data="lineData" v-if="reportChart[i] == 'pie'" />
                  <doughnut-chart :labels="labels" :data="lineData" v-if="reportChart[i] == 'doughnut'" />
                  <line-chart :labels="labels" :data="lineData" v-if="reportChart[i] == 'line'" />
                </fin-portlet-item>
              </fin-portlet>
            </div>
          </div>
        </fin-portlet-item>
      </fin-portlet>

      <fin-portlet class="q-pa-none">
        <fin-portlet-header>
          <fin-portlet-heading>
            Multiple Object Graph
          </fin-portlet-heading>
        </fin-portlet-header>
        <fin-portlet-item>
          <div class="row">
            <div class="col-12 col-md-6 q-pa-sm" v-for="i in 4">
              <fin-portlet class="shadow-3 full-height">
                <fin-portlet-header bordered>
                  <fin-portlet-heading>Report {{ i }}</fin-portlet-heading>
                  <!-- <fin-portlet-item>
                    <q-btn-group class="fin-br-8">
                      <q-btn icon="bar_chart" :color="reportChart[i] == 'bar' ? 'blue-8' : 'grey-5'"
                        @click="reportChart[i] = 'bar'" />
                      <q-btn icon="pie_chart" :color="reportChart[i] == 'pie' ? 'blue-8' : 'grey-5'"
                        @click="reportChart[i] = 'pie'" />
                      <q-btn icon="donut_large" :color="reportChart[i] == 'doughnut' ? 'blue-8' : 'grey-5'"
                        @click="reportChart[i] = 'doughnut'" />
                      <q-btn icon="ssid_chart" :color="reportChart[i] == 'line' ? 'blue-8' : 'grey-5'"
                        @click="reportChart[i] = 'line'" />
                    </q-btn-group>
                  </fin-portlet-item> -->
                </fin-portlet-header>
                <fin-portlet-item>
                  <bar-chart :labels="labels" :data="pieData" v-if="reportChart[i] == 'bar'" />
                  <pie-chart :labels="labels" :data="pieData" v-if="reportChart[i] == 'pie'" />
                  <doughnut-chart :labels="labels" :data="pieData" v-if="reportChart[i] == 'doughnut'" />
                  <line-chart :labels="labels" :data="pieData" v-if="reportChart[i] == 'line'" />
                </fin-portlet-item>
              </fin-portlet>
            </div>
          </div>
        </fin-portlet-item>
      </fin-portlet>
    </fin-portlet-item>

  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import BarChart from "./components/BarChart.vue"
import LineChart from "./components/LineChart.vue"
import PieChart from "./components/PieChart.vue"
import DoughnutChart from "./components/DoughnutChart.vue"

export default {
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
    BarChart,
    LineChart,
    PieChart,
    DoughnutChart,
  },
  data() {
    return {
      reportChart: {
        1: 'bar',
        2: 'line',
        3: 'pie',
        4: 'doughnut'
      },
      pieData: [
        {
          "label": "Books",
          "data": [30, 40, 50, 40, 25, 70],
        },
      ],

      labels: ["Sept 23", "Oct 23", "Nov 23", "Dec 23", "Jan 24", "Feb 24"],
      lineData: [
        {
          "label": "books",
          "data": [30, 40, 50, 40, 10, 70,],
        },
        {
          "label": "videos",
          "data": [40, 10, 70, 10, 20, 10],
        },
        {
          "label": "presentations",
          "data": [70, 10, 20, 10, 50, 40],
        },
        {
          "label": "events",
          "data": [40, 50, 40, 10, 70, 10],
          "backgroundColor": "rgba(230,99,75,0.3)",
          "borderColor": "#E6634B"
        }
      ]
    }
  }
}
</script>

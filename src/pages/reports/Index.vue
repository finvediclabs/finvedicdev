<template>
  <div class="row q-lg" style="margin-top: 2%;">
    <q-btn-group rounded style="width: 80%; margin-left: auto; margin-right: auto;">
  <div v-for="category in categories" :key="category" class="full-width">
    <q-btn
      unelevated
      rounded
      :label="category"
      no-caps
      class="full-width"
      size="lg"
      :class="{ 'bg-finvedic text-white': selectedCategory === category, 'rounded-all': selectedCategory === category }"
      @click="selectCategory(category)"
    />
  </div>
</q-btn-group>


  </div>
  <div class="container">
    <!-- Conditionally render student.vue component -->
    <student v-if="selectedCategory === 'Student'" />
    <Faculty v-if="selectedCategory === 'Faculty'" />
    <Cloud v-if="selectedCategory === 'Cloud'" />
  </div>
</template>

<script>
import Student from './Students.vue';

import Faculty from './Faculty.vue';

import Cloud from './Cloud.vue'; 

export default {
  components: {
    Student,
    Faculty,
    Cloud // Register Student component
  },
  data() {
    return {
      selectedCategory: 'Student',// Assuming you have this in your data
    categories: ['Student', 'Faculty', 'Cloud']
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    }
  }
};
</script>

<style scoped>
.rounded-all {
  border-radius: 40px; /* Adjust this value to change the border radius */
}
.row{
  margin-top: 20px;
}
</style>


<!-- <template>
  <fin-portlet>
    <fin-portlet-header class="q-px-sm">
      <fin-portlet-heading>Reports</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item>
      <div class="row">
        <div class="col-12 col-md-6 q-pa-xs ">
          <fin-portlet class="shadow-3 full-height">
            <fin-portlet-header bordered>
              <fin-portlet-heading>Report 1</fin-portlet-heading>
            </fin-portlet-header>
            <fin-portlet-item>
              <bar-chart :labels="reportsOne.labels" :data="reportsOne.data" />
            </fin-portlet-item>
          </fin-portlet>
        </div>
        <div class="col-12 col-md-6 q-pa-xs">
          <fin-portlet class="shadow-3 full-height">
            <fin-portlet-header bordered>
              <fin-portlet-heading>Report 2</fin-portlet-heading>
            </fin-portlet-header>
            <fin-portlet-item>
              <line-chart :labels="reportsTwo.labels" :data="reportsTwo.data" />
            </fin-portlet-item>
          </fin-portlet>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 q-pa-xs ">
          <fin-portlet class="shadow-3 full-height">
            <fin-portlet-header bordered>
              <fin-portlet-heading>Report 3</fin-portlet-heading>
            </fin-portlet-header>
            <fin-portlet-item>
              <pie-chart :labels="reportsThree.labels" :data="reportsThree.data" />
            </fin-portlet-item>
          </fin-portlet>
        </div>
        <div class="col-12 col-md-6 q-pa-xs">
          <fin-portlet class="shadow-3 full-height">
            <fin-portlet-header bordered>
              <fin-portlet-heading>Report 4</fin-portlet-heading>
            </fin-portlet-header>
            <fin-portlet-item>
              <doughnut-chart :labels="reportsFour.labels" :data="reportsFour.data" />
            </fin-portlet-item>
          </fin-portlet>
        </div>
      </div>
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
import { urls } from "./urls"
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
      loading: false,
      reportsOne: {
        labels: [],
        data: [],
      },
      reportsTwo: {
        labels: [],
        data: [],
      },
      reportsThree: {
        labels: [],
        data: [],
      },
      reportsFour: {
        labels: [],
        data: [],
      }
    }
  },
  mounted() {
    this.getReports1();
    this.getReports2();
    this.getReports3();
    this.getReports4();
  },
  methods: {
    showMsg(message, type) {
      this.$q.notify({
        message: message || "Something Went Wrong!",
        type: type,
        position: 'top-right',
        actions: [
          { icon: 'close', color: 'white', handler: () => { } }
        ]
      });
    },
    getReports1() {
      this.loading = true;
      this.$api.get(urls.getReports).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.reportsOne.labels = response.data.data.labels;
          this.reportsOne.data = response.data.data.data;
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    getReports2() {
      this.loading = true;
      this.$api.get(urls.getReports).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.reportsTwo.labels = response.data.data.labels;
          this.reportsTwo.data = response.data.data.data;
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    getReports3() {
      this.loading = true;
      this.$api.get(urls.getReports).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.reportsThree.labels = response.data.data.labels;
          this.reportsThree.data = response.data.data.data.filter((item, index) => index == 2);
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    getReports4() {
      this.loading = true;
      this.$api.get(urls.getReports).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.reportsFour.labels = response.data.data.labels;
          this.reportsFour.data = response.data.data.data.filter((item, index) => index == 1);
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    }
  }
}
</script> -->

<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Classrooms</fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="{ path: 'class-room/create' }">
          <q-btn label="Add Class" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps />
        </router-link>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="eventsList" select @reCall="getEventsData()" allowDelete :delete-url="deleteUrl"
        @editFun="editDataFun" :loading="loading"  />
    </fin-portlet-item>
  </fin-portlet>
  
  <div class="row">
  <div class="col-7">
    <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading">Courses</fin-portlet-heading>
      <fin-portlet-item>
          <q-btn label="Add Course" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="courseheader" :data="courseList" select @reCall="getCoursesData()" allowDelete :delete-url="courseDeleteUrl"
        @editFun="editCourseDataFun" :loading="loading"   showChapters @showChapters="showTopics"/>
    </fin-portlet-item>
  </fin-portlet>
 </div>
  <div class="col-5">
   
    <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading">Batches</fin-portlet-heading>
      <fin-portlet-item>
          <q-btn label="Add Batch" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="batchheader" :data="batchList" select @reCall="getBatchesData()" allowDelete :delete-url="batchDeleteUrl"
        @editFun="editDataFun" :loading="loading" showChapters @showChapters="showEnrollments"/>
    </fin-portlet-item>
  </fin-portlet>
  </div>
</div>
  
</template>
<script>
import FinTable from "src/components/FinTable.vue"
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { urls } from "../Urls"
import CryptoJS from 'crypto-js'
export default {
  name: 'lists',
  components: {
    FinTable,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      deleteUrl: urls.getEvents,
      courseDeleteUrl:urls.getCourses,
      batchDeleteUrl:urls.getBatches,
      loading: false,
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Course', key: 'course', align: 'start' },
        { label: 'Topic', key: 'topic', align: 'start' },
        { label: 'Date', key: 'date', align: 'start' },
        { label: 'Start Time', key: 'start', align: 'start' },
        { label: 'End Time', key: 'end', align: 'start' },
      ],
      eventsList: [], 
      courseheader: [
      { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Course Id', key: 'courseid', align: 'start' },
        { label: 'Course Description', key: 'abstractt', align: 'start' },
        { label: 'Bibilography', key: 'bibilography', align: 'start' },
      ],
      courseList: [], 
      batchheader: [
      { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Batch Name', key: 'cycleDesc', align: 'start' },
        { label: 'Start Date', key: 'cycleEndDate', align: 'start' },
        { label: 'End Date', key: 'cycleStartDate', align: 'start' },
      ],
      batchList: [],
    }
  },
  mounted() {
    this.getEventsData();
    
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
    getEventsData() {
      if (!this.loading) {
        this.loading = true;
        this.$api.get(urls.getEvents).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.eventsList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
          this.getCourseData();
        }).catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
      }
    },
    editDataFun(val) {
      let params = JSON.stringify(val);
      console.log(val);
      this.$router.push({
        path: 'class-room/create',
        query: {
          params: CryptoJS.AES.encrypt(params, "params").toString()
        },
      })
    },
    getCourseData() {
      if (!this.loading) {
        this.loading = true;
        this.$api.get(urls.getCourses).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.courseList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
          this.getBatchesData();
        }).catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
      }
    },
    editCourseDataFun(val) {
      let params = JSON.stringify(val);
      console.log(val);
      this.$router.push({
        path: 'class-room/create-course',
        query: {
          params: CryptoJS.AES.encrypt(params, "params").toString()
        },
      })
    },
    getBatchesData() {
      if (!this.loading) {
        this.loading = true;
        this.$api.get(urls.getBatches).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.batchList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
        }).catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
      }
    },
    editBatchDataFun(val) {
      let params = JSON.stringify(val);
      console.log(val);
      this.$router.push({
        path: 'class-room/create-batch',
        query: {
          params: CryptoJS.AES.encrypt(params, "params").toString()
        },
      })
    },
    showEnrollments(batch) {
      this.$router.push({ path: `class-room/enrollments/${batch.cycleid}` })
    },
    showTopics(course) {
      this.$router.push({ path: `class-room/topics/${course.courseid}` })
    },

  },
}
</script>

<!--
<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Calender Events</fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="{ path: 'class-room/create' }">
          <q-btn label="Add Class" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps />
        </router-link>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll" style="white-space: nowrap;">
      <fin-table :columns="header" :data="events" @reCall="getEventsData()" allowDelete delete-url="deleteUrl"
        @editFun="editDataFun" :loading="loading" />
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import FinTable from "src/components/FinTable.vue"
// import { inject } from 'vue'
import moment from "moment"
import { urls } from "src/pages/dashboard/Urls";
import CryptoJS from 'crypto-js'
export default {
  name: 'Lists',
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
    FinTable
  },
  data() {
    return {
      deleteUrl: urls.getEvents,
      loading: false,
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Id', key: 'id', align: 'center' },
        { label: 'Title', key: 'title', align: 'start' },
        { label: 'Course', key: 'course', align: 'start' },
        { label: 'Date', key: 'date', align: 'start' },
        { label: 'Start Time', key: 'start', align: 'start' },
        { label: 'End Time', key: 'end', align: 'start' },
      ],
      events: []
    }
  },
  mounted() {
    this.getEventsData();
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
    getEventsData() {
      this.loading = true;
      this.$api.get(urls.getEvents).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.events = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })


      // var events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
      // this.events = events.map((v, i) => ({ ...v, index: i + 1 }));
    },
    editDataFun(val) {
      let params = JSON.stringify(val);
      console.log(val);
      this.$router.push({
        path: 'class-room/create',
        query: {
          params: CryptoJS.AES.encrypt(params, "params").toString()
        },
      })
    }
  }
}
</script>
-->
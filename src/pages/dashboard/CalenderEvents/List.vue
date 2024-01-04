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
          this.events = response.data.data.map((item, index) => ({ ...item, createdAt: moment(item.createdAt).format('YYYY-MM-DD'), index: index + 1 }));
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

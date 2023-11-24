<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Calander Events</fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="{ path: 'class-room/create' }">
          <q-btn label="Add Class" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
          no-caps/>
        </router-link>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll" style="white-space: nowrap;">
      <fin-table :columns="header" :data="events" @reCall="getBooksData()" allowDelete delete-url=""
        @editFun="editDataFun" :loading="loading"/>
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
    getEventsData() {
      var events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
      this.events = events.map((v, i) => ({ ...v, index: i + 1 }));
    },
    editDataFun(val) {
      let editedEvent = JSON.stringify(val);
      let text = CryptoJS.AES.encrypt(editedEvent, "Secret Passphrase").toString();
      this.$router.push({
        path: 'class-room/create',
        query: {id: text},
      })
    }
  }
}
</script>

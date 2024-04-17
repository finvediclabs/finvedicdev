<template>
    <fin-portlet>
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading" backArrow>Enrollments</fin-portlet-heading>
        <fin-portlet-item>
          <q-btn label="Add" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps @click="createFile()" />
        </fin-portlet-item>
      </fin-portlet-header>
      <fin-portlet-item class="table-scroll">
        <fin-table :columns="header" :data="chaptersList" select @reCall="getChaptersData()" @editFun="editDataFun"
          :loading="loading" allowDelete :delete-url="deleteUrl" />
      </fin-portlet-item>
    </fin-portlet>
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
    components: {
      FinTable,
      FinPortlet,
      FinPortletHeader,
      FinPortletHeading,
      FinPortletItem,
    },
    data() {
      return {
        deleteUrl: urls.getEnrollments,
        header: [
          { label: 'S.No', key: 'index', align: 'center' },
          { label: 'Batch Id', key: 'cycleid', align: 'start', width: '50px' },
          { label: 'Student', key: 'username', align: 'start', width: '150px' },
          { label: 'Enrollment Date', key: 'enrollmentDateStr', align: 'start', width: '150px' },
        ],
        chaptersList: [],
        loading: true,
      }
    },
    computed: {
      cycleId() {
        return this.$route.params.cycleid;
      }
    },
    mounted() {
      this.getChaptersData();
    },
    watch: {
      cycleId() {
        this.getChaptersData();
      }
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
      getChaptersData() {
        if (this.$route.params.cycleid) {
          this.loading = true;
          this.$api.get(urls.getEnrollments+"/"+this.$route.params.cycleid, {
            params: {
              cycleid: this.$route.params.cycleid
            }
          }).then(response => {
            this.loading = false;
            if (response.data.success) {
              this.chaptersList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
            } else {
              this.showMsg(response.data?.message, 'negative');
            }
          }).catch((error) => {
            this.loading = false;
          })
        }
      },
      editDataFun(val) {
        let item = {
          title: val.chapterTitle,
          description: val.description,
          id: val.id,
          cover: val.chapterImagePath,
          file: val.chapterFilePath
        };
      //  this.createFile('Update Enrollment', item);
      },
      
    }
  }
  </script>
  
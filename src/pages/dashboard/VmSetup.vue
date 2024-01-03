<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Vm Setup</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="full-width items-center justify-center">
      <div style="max-width: 1100px;">
        <q-form @submit="validateFields">
          <div class="row">
            <div class="col-12 col-md-1 q-pa-sm "></div>
            <div class="col-12 col-md-5 q-pa-sm">
              <q-select v-model="version" :options="['Windows', 'Linux']" borderless label="VM Type"
                class="shadow-3 fin-br-8 q-px-md bg-grey-1" />
              <div class="errorMsgBox">
                <span v-if="!version">{{ errors.version }}</span>
              </div>
            </div>
            <div class="col-12 col-md-1 q-pa-sm "></div>
            <div class="col-12 col-md-5 q-pa-sm ">
              <q-input v-model="nos" type="number" borderless label="No Of VM's" class="shadow-3 fin-br-8 q-px-md bg-grey-1" />
              <div class="errorMsgBox">
                <span  v-if="!nos">{{ errors.nos }}</span>
              </div>
            </div>
          </div>
          <fin-portlet-item class="q-pa-sm text-right q-mt-xl">
            <q-btn color="primary" no-caps class="sub-btn q-ml-sm fin-br-8" style="min-width:150px" label="Create VM" type="submit"
              :disable="loader">
              <q-spinner-ios color="white" class="q-pl-sm" v-if="loader" />
            </q-btn>
          </fin-portlet-item>
        </q-form>
      </div>
    </fin-portlet-item>


  </fin-portlet>
  <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="VMsList" select @reCall="getVMsData()" allowDelete :delete-url="deleteUrl"
        @editFun="editDataFun" :loading="loading" />
    </fin-portlet-item>
</template>
<script>
import FinTable from "src/components/FinTable.vue"
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import axios from "axios";
import { urls } from "./Urls";
export default {
  components: {
    FinTable,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem
  },
  data() {
    return {
      version: "",
      nos: '',
      instance: "Standard_D2s_v3=3",
      region: "East US",
      loader: false,
      errors: {},
      deleteUrl: urls.getAzureVmsUrl,
      loading: false,
      header: [
        { label: 'Size', key: 'size', align: 'center' },
        { label: 'OS Type', key: 'osType', align: 'start'},
        { label: 'Name', key: 'name', align: 'start', width: '150px'}
      ],
      VMsList: []
    }
  },
  mounted() {
    this.getVMsData();
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
    getVMsData() {
      this.loading = true;
      this.$api.get(urls.getAzureVmsUrl).then(response => {
        this.loading = false;
        // if (response.data.success) {
          this.VMsList = response.data.data;
        }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    validateFields() {
      if (this.version && this.nos > 0) {
        this.createVms()
      } else {
        this.errors = {
          version: "Vm Type is required",
          nos: "No Of Vm's is required"
        }
      }
    },
    createVms() {
      if (!this.loader) {
        this.loader = true;
        this.$api.post(urls.createVmsUrl, {
          nos: this.nos,
          version: this.version,
          type: this.version,
          instance: this.instance,
          region: this.region
        }).then(response => {
          this.loader = false;
          // if (response.data.success) {
          this.showMsg(response.data?.message || 'Vms created Successfully', 'positive');
          // } else {
          //   this.showMsg(response.data?.message, 'negative');
          // }
        }).catch(error => {
          this.loader = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        })
      }


    }
  }
}
</script>
./Urls

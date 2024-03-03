<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Vm Setup</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="full-width items-center justify-center">
      <div style=" margin-left: auto;margin-right: auto;">
        <q-form @submit="validateFields">
          <div class="row" >
            
            <div class="col-12 col-md-5 q-pa-sm" style=" margin-left: auto;margin-right: auto;">
              <p style="text-align: center;font-size: 24px;font-weight: 600;">Select The Operating System</p>
              <div class="image-btn-container">
    
    <q-btn
      v-ripple
      v-model="version"
      toggle
      :flat="version !== 'Windows'"
      :color="version === 'Windows' ? 'green' : 'white'"
      class="image-btn"
      @click="selectVersion('Windows')"
    >
      <img src="https://gurukul.finvedic.com/images/microsoft.png" alt="Windows" style="width: 100%; height: 100%;" />
    </q-btn>
    <q-btn
      v-ripple
      v-model="version"
      toggle
      :flat="version !== 'Linux'"
      :color="version === 'Linux' ? 'green' : 'white'"
      class="image-btn"
      @click="selectVersion('Linux')"
    >
      <img src="https://gurukul.finvedic.com/images/LinuxOS.png" alt="Linux" style="width: 100%; height: 100%;" />
    </q-btn>
  </div>
  <div style="text-align: center; padding-top: 20px;">
  <p v-if="version" style="color: green;">You selected: {{ version }} OS</p>
  <p v-else style="color: red;">You didn't select operating system</p>
</div>
              <div class="errorMsgBox">
                <span v-if="!version">{{ errors.version }}</span>
              </div>
              <div class="input-container" style="display: flex; align-items: center;">
                <div>
                  <q-btn class="shadow-3 fin-br-8 q-px-md bg-grey-1" @click="decrementNoOfVMs" icon="remove" style="margin-right: 10px;" />
                </div>
                <q-input v-model="nos" type="number" borderless label="No Of VM's" class="shadow-3 fin-br-8 q-px-md bg-grey-1" style="flex: 1; margin-right: 10px;" />
                
                  <div>
                  <q-btn class="shadow-3 fin-br-8 q-px-md bg-grey-1" @click="incrementNoOfVMs" icon="add" />
                </div>
              </div>
              <div class="errorMsgBox">
                <span  v-if="!nos">{{ errors.nos }}</span>
              </div>
            </div>

          </div>
          <fin-portlet-item class="q-pa-sm text-center q-xl">
            <q-btn color="primary" no-caps class="sub-btn q-ml-sm fin-br-8" style="min-width:150px" label="Create VM" type="submit"
              :disable="loader">
              <q-spinner-ios color="white" class="q-pl-sm" v-if="loader" />
            </q-btn>
          </fin-portlet-item>
        </q-form>
      </div>
    </fin-portlet-item>
  </fin-portlet>
  <div class="container" style="width: 80%;margin-left: auto;margin-right: auto;" >
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="VMsList" select @reCall="getVMsData()" allowDelete :delete-url="deleteUrl"
        @editFun="editDataFun" :loading="loading" />
    </fin-portlet-item>
  </div>
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
      nos: 0,
      instance: "Standard_D2s_v3=3",
      region: "East US",
      loader: false,
      errors: {},
      deleteUrl: urls.getAzureVmsUrl,
      loading: false,
      header: [
        { label: 'Size', key: 'size', align: 'center' },
        { label: 'OS Type', key: 'type', align: 'start'},
        { label: 'Name', key: 'name', align: 'start'},
        {label: 'Active'}
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
          this.showMsg(response.data?.message || 'Vms created Successfully', 'positive');
        }).catch(error => {
          this.loader = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        })
      }
    },
    selectVersion(selectedVersion) {
      this.version = selectedVersion;
      this.errors.version = ''; // Clear error message when a version is selected
    },
    incrementNoOfVMs() {
      this.nos++;
    },
    decrementNoOfVMs() {
      if (this.nos > 0) {
        this.nos--;
      }
    }
  }
}
</script>
<style>
.image-btn-container {
  display: flex;
  justify-content: center;
}

.image-btn {
  width: 180px;
  height: 180px;
  margin: 0 10px; /* Adjust as needed */
}
</style>


./Urls

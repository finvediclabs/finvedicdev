<template>
  <fin-portlet style="background-color: transparent">
    <fin-portlet-header style="margin-bottom: 0px;">
      <fin-portlet-heading :loading="loading" backArrow><span class="User_heading" >VM Setup</span></fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="full-width items-center justify-center">
      <div style=" margin-left: auto;margin-right: auto;">
        <q-form @submit="validateFields">
          <div class="row" >
            
            <div class="col-12 col-md-5 q-pa-sm" style=" margin-left: auto;margin-right: auto;">
              <p style="text-align: center;font-size: 24px;font-weight: 600;color: #5479F7;">Select The Operating System</p>
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
      <q-img :src="windows" alt="Windows" style="width: 100%; height: 100%;" />
    </q-btn>
    <div class="outer">
  <div class="inner"></div>
</div>
    <q-btn
      v-ripple
      v-model="version"
      toggle
      :flat="version !== 'Linux'"
      :color="version === 'Linux' ? 'green' : 'white'"
      class="image-btn"
      @click="selectVersion('Linux')"
    >
      <q-img :src="linuxOs" alt="Linux" style="width: 100%; height: 100%;" />
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
                  <q-btn class="shadow-3 fin-br-8 q-px-md bg-grey-1 custom-btn" @click="decrementNoOfVMs" icon="remove" style="margin-right: 10px;" />
                </div>
                <q-input v-model="nos" type="number" borderless label="No Of VM's" class="shadow-3 fin-br-8 q-px-md bg-grey-1 custom-input" style="flex: 1; margin-right: 10px;"  />
               
                  <div>
                  <q-btn class="shadow-3 fin-br-8 q-px-md bg-grey-1 custom-btn" @click="incrementNoOfVMs" icon="add" />
                </div>
              </div>
              <q-radio v-model="hideUsernameSelect" val="false" label="Admin VMs" class="custom-radio"  @input="logProfile" />
             
              <div class="input-container" style="display: flex; align-items: center;padding-top: 4%;">
                
                <q-select v-model="username"  v-if="!hideUsernameSelect" class="shadow-3 fin-br-8 q-px-md bg-grey-1 custom-input" borderless
  :options="usernameOptions" label="Select Username" option-label="label" option-value="value"
  style="width: 100%" @input="selectUserNames" />
                 
              </div>

              <div class="errorMsgBox">
                <span  v-if="!nos">{{ errors.nos }}</span>
              </div>
            </div>

          </div>
          <fin-portlet-item class="q-pa-sm text-center q-xl">
            <q-btn color="primary" no-caps class="sub-btn q-ml-sm fin-br-8" style="min-width:150px" label="Spin VM" type="submit"
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
import { useProfileStore } from "src/stores/profile";
import FinTable from "src/components/FinTable.vue"
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import windows from "../../assets/windows.png";
import linuxOs from "../../assets/LinuxOs.png";
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
      windows:windows,
      linuxOs:linuxOs,
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
        {label: 'Active' ,key: 'provisioningState', align: 'start'}
      ],
      VMsList: [],
      usernameOptions: [] ,
      username: "" ,
      hideUsernameSelect: false
    }
  },
  mounted() {
    this.fetchUsernames();
    this.getVMsData();
    this.  logProfile();
    console.log(useProfileStore);
  },
  methods: {
    logProfile(){
      const profileStore = useProfileStore();
      const userNameAdmin = profileStore.user.username; 
      const userRoleAdmin = profileStore.user.roles.length >= 0 ? profileStore.user.roles[0].name : "";
      console.log(userNameAdmin, userRoleAdmin);
    },
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
    // Filter out VMs with the provisioningState as "deleted"
    this.VMsList = response.data.data.filter(vm => vm.provisioningState !== 'Deleted');
  }).catch(error => {
    this.loading = false;
    this.showMsg(error.response?.data.message || error.message, 'negative');
  });
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
    let userNameValue = '';
    let userRoleValue = '';
    
    if (this.hideUsernameSelect) {
      const profileStore = useProfileStore();
      userNameValue = profileStore.user.username;
      userRoleValue = profileStore.user.roles.length > 0 ? profileStore.user.roles[0].name : '';
    } else {
      userNameValue = this.username.value;
      userRoleValue = this.username.role;
    }

    // Function to handle the creation of single VM
    const createSingleVm = () => {
      return this.$api.post(urls.createVmsUrl, {
        nos: 1,  // Always create one VM per request
        version: this.version,
        type: this.version,
        instance: this.instance,
        region: this.region,
        userName: userNameValue,
        userRole: userRoleValue,
      });
    };

    // Array to store promises for multiple VM creations
    const createVmPromises = [];

    // Loop to create multiple VMs
    for (let i = 0; i < this.nos; i++) {
      createVmPromises.push(createSingleVm());
    }

    // Execute all promises and handle responses
    Promise.all(createVmPromises)
      .then(responses => {
        this.loader = false;
        responses.forEach(response => {
          this.showMsg(response.data?.message || 'Start Spinning VM Successfully', 'positive');
        });
      })
      .catch(error => {
        this.loader = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
  }
},
    fetchUsernames() {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const requestVMsUrl = baseUrl + 'api/request-vms';
      
      axios.get(requestVMsUrl)
        .then(response => {
          if (Array.isArray(response.data.data)) {
            // Filter usernames where status is "requested"
            this.usernameOptions = response.data.data
              .filter(user => user.status === 'Requested')
              .map(user => ({
                label: `${user.username} (${user.userRole})`,
                value: user.username,
            role: user.userRole
              }));
          } else {
            console.error('Error: Response data.data is not an array');
            // Handle the case where response data.data is not an array, e.g., show an error message
            this.usernameOptions = []; // Reset options or handle as per your application's requirements
          }
        })
        .catch(error => {
          console.error('Error fetching usernames:', error);
          // Handle fetch error, e.g., show an error message to the user
          this.usernameOptions = []; // Reset options or handle as per your application's requirements
        });
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
.custom-btn,
.custom-input {
  height: 50px; /* Adjust as needed */
  color: #5479F7;
  font-weight: 600;
}
.q-field__label {
  color: #5479F7 !important;
}
.image-btn-container {
  display: flex;
  justify-content: center;
}

.image-btn {
  width: 180px;
  height: 180px;
  margin: 0 10px; /* Adjust as needed */
}
.outer {
  width: 1px;
  height: 180px;
  margin: auto;
  position: relative;
  overflow: hidden;
}
.inner {
  position: absolute;
  width:100%;
  height: 40%;
  background: #5479F7;
  top: 30%;
  box-shadow: 0px 0px 30px 20px #5479F7;
}
.User_heading{
  color:#5479F7;
  margin-left:4%;
}
.bg-green {
    background: #b2ccfc !important;
    border-radius: 20px;
}

</style>


./Urls

<template>
  <q-page>
    <fin-portlet style="background-color: transparent;">
      <fin-portlet-header>
        <div class="row col-12">
          <fin-portlet-heading><span class="User_heading" >Labs</span></fin-portlet-heading>
         
      </div>
      </fin-portlet-header>
      <fin-portlet-item>


<div class="row col-12" style="width: 100%">
  <div class="col-1"></div>
  <div class="col-3">
    <div class="image-btn-container1">
      <a href="https://gurukul.finvedic.com/dojo/" target="_blank">
  <q-btn class="image-btn">
    <q-img :src="Dojo" alt="Windows" style="width: 100%; height: 100%;" />
  </q-btn>
</a>

          
    </div>
   
    <div class="col-3" style="padding-top: 6px;">
      <br><br><br><br>
          <a href="https://gurukul.finvedic.com/dojo/" target="_blank" class="styled-link">FinVedic Dojo</a>
          </div>
  </div>
  <div class="col-1">
  <div class="outer1">
            <div class="inner1"></div>
            </div>
          </div>
        <div class="col-6">
        <q-form @submit="onSubmit" ref="form" class="q-pa-md">
    <div class="row">
      <div class="col-12 col-md-12 q-pa-sm" style="margin-left: auto; margin-right: auto;">
        <p style="text-align: center; font-size: 24px; font-weight: 600; color: #5479F7;">
          Select The Operating System
        </p>
        <div class="image-btn-container">
          <q-btn
            v-ripple
            v-model="selectedOS"
            toggle
            :flat="selectedOS !== 'Windows'"
            :color="selectedOS === 'Windows' ? 'green' : 'white'"
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
            v-model="selectedOS"
            toggle
            :flat="selectedOS !== 'Linux'"
            :color="selectedOS === 'Linux' ? 'green' : 'white'"
            class="image-btn"
            @click="selectVersion('Linux')"
          >
            <q-img :src="linuxOs" alt="Linux" style="width: 100%; height: 100%;" />
          </q-btn>
        </div>
      </div>
    </div>
    <div style="text-align: center; padding-top: 20px;">
  <p v-if="selectedOS" style="color: green;">You selected: {{ selectedOS }} OS</p>
  <p v-else style="color: red;">You didn't select operating system</p>
</div>
    <div class="row justify-center q-pa-md">
      <q-btn
      color="primary" no-caps class="sub-btn q-ml-sm fin-br-8" style="min-width:150px" label="Requeste For VM" type="submit"
        :disabled="!formIsValid" />
    </div>
  </q-form>
</div>
<div class="col-1"></div>
</div>
      </fin-portlet-item>

      <fin-portlet-item >
        <div class="scroll_on">
          <div class="row" style="width: 100%;margin-left: auto;margin-right: auto;">
          <div class="col-12 col-sm-6 col-md-6 col-lg-6 q-pa-lg" v-for="(lab, index) in filteredLabs" :key="lab.id" style="padding-top: 0;">
        <q-card class="shadow-8" :style="{ border: getBorderColor(lab.provisioningState, lab.locked), height: '100%' }" style="background-color: #5479F7">
          <q-card-section horizontal>
            <q-card-section class="q-pa-md lab-img flex items-center">
              <q-img :src="labImg" class="full-width" />
            </q-card-section>
            <q-card-section class="" style="width: 70%;font-size: 13px;">
              <div class="column full-width">
                <div class="col flex items-center">
                  <span style="font-weight: bold;color: white;">{{ lab.name }}</span>
                  <q-space />
                  <q-img v-if="lab.provisioningState === 'Creating'" :src="loader" style="width: 30px; height: 30px;" />
                </div>
                <div class="flex" style="color: white;">
                  <p><strong>Instance :</strong> {{ lab.size }}</p>
                </div>
                <div class="col flex">
                  <div class="q-px-md shadow-4 rounded-borders q-pa-xs text-center"
                    style="width:90px;font-size: 8px;background-color: white;"
                    @click="lab.provisioningState !== 'Deleting' && lab.provisioningState !== 'Deleted' && lab.provisioningState !== 'Failed' ? download(lab.name) : null"
                    :class="{ 'pointer-events-none': lab.locked }">
                    {{ lab.provisioningState === 'Deleting' ||lab.provisioningState === 'Failed' || lab.provisioningState === 'Deleted' ? lab.provisioningState : "Download" }}
                  </div>
                  <q-space />
                  <q-btn :label="lab.locked ? 'Locked' : 'Shutdown'" size="8px" dense class="q-px-md text-weight-bold"
      rounded :style="{ background: (lab.locked || lab.provisioningState === 'Deleting' || lab.provisioningState === 'Deleted' || lab.provisioningState === 'Failed' ) ? '#D49F8A' : '#7BFF90' }"
      :disable="!canShutdown(lab)"
      @click="shutdown(lab)">
      <q-icon name="lock" size="14px" class="q-pl-sm"></q-icon>
    </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      
</div>
        </div>
      </fin-portlet-item>
    </fin-portlet>
  </q-page>
</template>

<script>
import { useProfileStore } from "src/stores/profile";
import { useSessionStore } from "src/stores/session";
import { setToken } from "src/boot/axios";
import loader from "../../assets/loader.gif";
import windows from "../../assets/Windows.png";
import linuxOs from "../../assets/LinuxOS.png";
import axios from 'axios';
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import labImg from "src/assets/lab.png";
import Dojo from "src/assets/Dojo.png";
import { urls } from "./Urls";
import { TouchSwipe } from "quasar";

export default {
  name: 'index',
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      selectedOS: '',
      windows:windows,
      linuxOs:linuxOs,
      loader:loader,
      labsData: [],
      labImg: windows,
      Dojo: Dojo,
    }
  },
  mounted() {
    // console.log(useProfileStore);
    this.getAzureVmsData();
    this.loadLockedStates(); // Load locked states from local storage
  },
  computed: {
    canShutdown() {
    return (lab) => {
      const profileStore = useProfileStore();
      const profileUsername = profileStore.user.username;
      const isAdmin = profileStore.user.roles.some(role => role.name === 'Admin');
      return (isAdmin || lab.userName === profileUsername) &&
             lab.provisioningState !== 'Deleting' && 
             lab.provisioningState !== 'Deleted'  && 
             lab.provisioningState !== 'Failed';
             
    };
  },
    getBorderColor() {
      return function(provisioningState, locked) {
        return locked ? '0px solid #FF7F50' : (provisioningState === 'Succeeded' ? '0px solid #FF7F50' : '0px solid #FF7F50');
      };
    },
    filteredLabs() {
  const profileStore = useProfileStore();
  const profileUsername = profileStore.user.username;
  const isAdmin = profileStore.user.roles.some(role => role.name === 'Admin');

  if (isAdmin) {
    return this.labsData;
  } else {
    return this.labsData.filter(lab => lab.userName === profileUsername || lab.userRole === 'Admin');
  }
},
  isUserExistsInLabs() {
    const profileStore = useProfileStore();
    const profileUsername = profileStore.user.username;

    return this.labsData.some(lab => lab.userName === profileUsername && lab.provisioningState === 'Succeeded' ||lab.userName === profileUsername && lab.provisioningState === 'Creating');
  }
  },
  methods: {
    download(vmname) {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      window.location.href = baseUrl + "download/" + vmname;
    },
    async shutdown(lab) {
  const profileStore = useProfileStore();
  const profileUsername = profileStore.user.username;
  const isAdmin = profileStore.user.roles.some(role => role.name === 'Admin');

  // Check if the user is an Admin or if the lab belongs to the user
  if (!isAdmin && lab.userName !== profileUsername) {
    this.showMsg('You do not have permission to perform this action.', 'negative');
    return;
  }

  if (lab.provisioningState === 'Deleted' || lab.provisioningState === 'Deleting' || lab.provisioningState === 'Failed' ) {
    this.showMsg('Cannot perform shutdown action as the lab is already deleted or deleting or failed.', 'negative');
    return;
  }

  try {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const getDeleteVMUrl = baseUrl + 'deletevm/';
    const response = await fetch(getDeleteVMUrl + lab.name);
    // console.log('success');
    lab.locked = true;
    this.saveLockedStates(); // Save locked states to local storage
  } catch (error) {
    console.error(error);
  }
},
    loadLockedStates() {
      const lockedStates = JSON.parse(localStorage.getItem('lockedStates')) || {};
      this.labsData.forEach((lab) => {
        if (lockedStates.hasOwnProperty(lab.name)) {
          lab.locked = lockedStates[lab.name];
        }
      });
    },
    saveLockedStates() {
      const lockedStates = {};
      this.labsData.forEach((lab) => {
        lockedStates[lab.name] = lab.locked;
      });
      localStorage.setItem('lockedStates', JSON.stringify(lockedStates));
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
    getAzureVmsData() {
  this.loading = true;
  this.$api.get(urls.getAzureVmsUrl).then(response => {
    this.loading = false;
    this.labsData = response.data.data.map(vm => {
      // console.log(vm.userName); // Log the username here
      return {
        ...vm,
        userName: vm.userName 
      };
    });
  }).catch(error => {
    this.loading = false;
    this.showMsg(error.response?.data.message || error.message, 'negative');
  });
},
selectVersion(os) {
      this.selectedOS = os;
      this.validateForm(); // Validate form whenever selection changes
    },
    validateForm() {
      // Simple validation logic: Check if `selectedOS` is set
      this.formIsValid = !!this.selectedOS;
    },
    async onSubmit() {
      if (!this.formIsValid) {
        this.showMsg('Please select an operating system.', 'negative');
        return;
      }
      const profileStore = useProfileStore();
  const user = profileStore.user;
  // console.log(user.roles[0].name);
  // Ensure createdAt is set, if available
  const createdAt = user.createdAt ? user.createdAt : new Date().toISOString();

  const userRole = user.roles.length >= 0 ? user.roles[0].name : "";
  // console.log(userRole);
      const requestData = {
        userId: user.id,
        accountId: user.accountId,
        name: user.name,
        username: user.username,
        email: user.email,
        userRole: userRole, // Set userRole here
        createdAt: createdAt, // Include createdAt
        timestamp: new Date().toISOString(), // Current timestamp
        status: 'Requested',
        operatingSystem: this.selectedOS // Include selected OS
      };
// console.log(requestData)
      try {
        // Send POST request
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const requestVMsUrl = baseUrl + 'api/request-vms';
        const response = await axios.post(requestVMsUrl, requestData);

        // Handle success response
        const successMessage = response.data.message;
        this.showMsg(successMessage, 'positive');
      } catch (error) {
        console.error('Error sending request:', error);

        // Handle error response
        const errorMessage = error.response?.data?.message || 'Something went wrong!';
        this.showMsg(errorMessage, 'negative');
      }
    }
  }
};
</script>

<style>

.lab-img {
  width: 30%;
  box-shadow: 0px 0px 10px 0px #bbbbbb inset !important;
  background-color: #81D265;
}

.q-btn:before {
  box-shadow: none !important;
}
.scroll_on{
  height: 62vh;
  /* border: 2px solid red; */
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;
  width: 60vw;
}

.image-btn-container {
  display: flex;
  justify-content: center;
}
.image-btn-container1 {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid red; */
  margin-top: 28%;
}

.image-btn {
  width: 180px;
  height: 180px;
  margin: 0 10px; /* Adjust as needed */
}
.image-btn1 {
  width: 220px;
  height: 220px;
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

.outer1 {
  width: 1px;
  height: 340px;
  margin: auto;
  position: relative;
  overflow: hidden;
}
.inner1 {
  position: absolute;
  width:100%;
  height: 40%;
  background: #5479F7;
  top: 30%;
  box-shadow: 0px 0px 30px 20px #5479F7;
}
.bg-green {
    background: #b2ccfc !important;
    border-radius: 20px;
}

.scroll_on::-webkit-scrollbar {
        width: 10px;
         /* Width of the scrollbar */
    }

    .scroll_on::-webkit-scrollbar-track {
        background-color: white;
        /* margin-top: 18px;  */
        border-radius: 5px;
        /* Color of the track */
    }

    .scroll_on::-webkit-scrollbar-thumb {
        background-color: #5479F7; /* Color of the thumb */
        border-radius: 5px;
        height: 3%;/* Rounded corners for the thumb */
    }
    .User_heading{
  color:#5479F7;
  margin-left:4%;
  }
.styled-link {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
            margin-right: auto;
            width: 60% !important;
            
            padding: 8px 14px;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            background-color: #5479F7;
            color: white;
            border-radius: 10px;
            transition: background-color 0.3s ease, transform 0.3s ease;
            box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
        }
/* .styled-link:hover {
            transform: translateY(3px);
            box-shadow: 0 8px 20px rgba(0, 86, 179, 0.5);
}
.styled-link:active {
            transform: translateY(1px);
            box-shadow: 0 4px 4px rgba(0, 61, 128, 0.3);
} */
</style>

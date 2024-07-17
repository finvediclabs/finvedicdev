<template>
  <q-page>
    <fin-portlet style="background-color: transparent;">
      <fin-portlet-header>
        <fin-portlet-heading><span class="User_heading" >Labs</span></fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item>
        <div class="row justify-center q-pa-md">
          <q-btn
  v-if="!isUserExistsInLabs"
  color="green"
  class="text-white"
  @click="requestForVM"
>
  Request for VM
</q-btn>
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
              <q-img v-if="lab.provisioningState === 'Creating'" src="https://gurukul.finvedic.com/images/loader.gif" style="width: 30px; height: 30px;" />
            </div>
            <div class="flex" style="color: white;">
              <p><strong>Instance :</strong> {{ lab.size }}</p>
            </div>
            <div class="col flex">
              <div class="q-px-md shadow-4 rounded-borders q-pa-xs text-center"
                style="width:90px;font-size: 8px;background-color: white;"
                @click="lab.provisioningState !== 'Deleting' && lab.provisioningState !== 'Deleted' ? download(lab.name) : null"
                :class="{ 'pointer-events-none': lab.locked }">
                {{ lab.provisioningState === 'Deleting' || lab.provisioningState === 'Deleted' ? lab.provisioningState : lab.type }}
              </div>
              <q-space />
              <q-btn :label="lab.locked ? 'Locked' : 'Shutdown'" size="8px" dense class="q-px-md text-weight-bold"
                rounded :style="{ background: (lab.locked || lab.provisioningState === 'Deleting' || lab.provisioningState === 'Deleted') ? '#D49F8A' : '#7BFF90' }"
                :disable="(lab.provisioningState === 'Deleting' || lab.provisioningState === 'Deleted')"
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
import axios from 'axios';
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import labImg from "src/assets/lab.png";
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
      labsData: [],
      labImg: "https://gurukul.finvedic.com/images/Windows.png",
    }
  },
  mounted() {
    console.log(useProfileStore);
    this.getAzureVmsData();
    this.loadLockedStates(); // Load locked states from local storage
  },
  computed: {
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

    return this.labsData.some(lab => lab.userName === profileUsername && lab.provisioningState === 'Succeeded');
  }
  },
  methods: {
    download(vmname) {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      window.location.href = baseUrl + "/download/" + vmname;
    },
    async shutdown(lab) {
      if (lab.provisioningState === 'Deleted' || lab.provisioningState === 'Deleting') {
        this.showMsg('Cannot perform shutdown action as the lab is already deleted or deleting.', 'negative');
        return;
      }

      try {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const getDeleteVMUrl = baseUrl + 'deletevm/';
        const response = await fetch(getDeleteVMUrl + lab.name);
        console.log('success');
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
      console.log(vm.userName); // Log the username here
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
async requestForVM() {
  const profileStore = useProfileStore();
  const user = profileStore.user;
  console.log(user.roles[0].name);
  // Ensure createdAt is set, if available
  const createdAt = user.createdAt ? user.createdAt : new Date().toISOString();

  const userRole = user.roles.length >= 0 ? user.roles[0].name : "";
  console.log(userRole);

// Prepare data to send
const requestData = {
  userId: user.id,
  accountId: user.accountId,
  name: user.name,
  username: user.username,
  email: user.email,
  userRole: userRole, // Set userRole here
  createdAt: createdAt, // Include createdAt
  timestamp: new Date().toISOString(), // Current timestamp
  status: "Requested",
};

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
}
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
</style>

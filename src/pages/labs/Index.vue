<template>
  <q-page>
    <fin-portlet>
      <fin-portlet-header>
        <fin-portlet-heading>Labs</fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item>
        <div class="row">
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 q-pa-md" v-for="(lab, index) in labsData" :key="lab.id">
            <q-card class="shadow-8" :style="{ border: getBorderColor(lab.provisioningState, lab.locked), height: '100%' }">
              <q-card-section horizontal>
                <q-card-section class="q-pa-md lab-img flex items-center" >
                  <q-img :src="labImg" class="full-width" />
                </q-card-section>
                <q-card-section class="" style="width: 70%;font-size: 13px;">
                  <div class="column full-width">
                    <div class="col flex items-center">
                      <span style="font-weight: bold;" >{{ lab.name }}</span>
                      <q-space />
                      <q-img v-if="lab.provisioningState === 'Creating'" src="https://gurukul.finvedic.com/images/loader.gif" style="width: 30px; height: 30px;" />
                    </div>
                    <div class="flex">
                      <p>
                        <strong>Instance : </strong>
                        {{ lab.size }}
                      </p>
                    </div>
                    <div class="col flex ">
                      <div class="q-px-md shadow-4 rounded-borders q-pa-xs text-center"
  style="width:90px;font-size: 8px;"
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
      </fin-portlet-item>
    </fin-portlet>
  </q-page>
</template>

<script>
import labsImg from "src/assets/labs.png";
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
      labImg: labImg
    }
  },
  mounted() {
    this.getAzureVmsData();
    this.loadLockedStates(); // Load locked states from local storage
  },
  computed: {
    getBorderColor() {
      return function(provisioningState, locked) {
        return locked ? '2px solid #FF7F50' : (provisioningState === 'Succeeded' ? '2px solid #00C520' : '2px solid #FF7F50');
      };
    }
  },
  methods: {
    download(vmname) {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      window.location.href = baseUrl + "/download/" + vmname;
    },
    async shutdown(lab) {
  if (lab.provisioningState === 'Deleted' || lab.provisioningState === 'Deleting') {
    // Show message or handle the action accordingly
    this.showMsg('Cannot perform shutdown action as the lab is already deleted or deleting.', 'negative');
    return; // Exit the method early
  }

  try {
    const response = await fetch('https://fnbackend.finvedic.com/deletevm/' + lab.name);
    console.log('success');
    // Update lab state to locked
    lab.locked = true;
    this.saveLockedStates(); // Save locked states to local storage
  } catch (error) {
    console.error(error);
  }
},
    loadLockedStates() {
      // Load locked states from local storage
      const lockedStates = JSON.parse(localStorage.getItem('lockedStates')) || {};
      this.labsData.forEach((lab) => {
        if (lockedStates.hasOwnProperty(lab.name)) {
          lab.locked = lockedStates[lab.name];
        }
      });
    },
    saveLockedStates() {
      // Save locked states to local storage
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
        // if (response.data.success) {
        this.labsData = response.data.data;
        // } else {
        //   this.showMsg(response.data?.message, 'negative');
        // }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    }
  }
}
</script>

<style>
.lab-img {
  width: 30%;
  box-shadow: 0px 0px 10px 0px #bbbbbb inset !important;
}

.q-btn:before {
  box-shadow: none !important;
}
</style>

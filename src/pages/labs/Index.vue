<template>
  <q-page>
    <fin-portlet>
      <fin-portlet-header>
        <fin-portlet-heading>Labs</fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item>
        <div class="row">
          <div class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-md" v-for="(lab, index) in labsData" :key="lab.id">
            <q-card class="full-width shadow-8" style="border-radius: 10px!important;">
              <q-card-section horizontal :style="{ border: lab.locked ? '2px solid #FF7F50' : '2px solid #00C520' }" @click="download(lab.name)">
                <q-card-section class="q-pa-md lab-img flex items-center">
                  <q-img :src="labImg" class="full-width"/>
                </q-card-section>
                <q-card-section class="" style="width: 70%;font-size: 13px;">
                  <div class="column full-width">
                    <div class="col flex items-center">
                      <fin-portlet-heading small>{{ lab.name }}</fin-portlet-heading>
                      <q-space />
                      <q-icon name="more_vert" size="20px" class="cursor-pointer"></q-icon>
                    </div>
                    <div class="flex">
                      <p>
                        <strong>Instance : </strong>
                        {{ lab.size }}
                      </p>
                    </div>
                    <div class="col flex items-center">
                      <div class="q-px-md shadow-4 rounded-borders q-pa-xs text-center" style="width:80px">{{ lab.osType }}</div>
                      <q-space />
                      <q-btn :label="lab.locked ? 'Locked' : 'Lock'" size="12px" dense class="q-px-md text-weight-bold"
                        rounded :style="{ background: lab.locked ? '#D49F8A' : '#7BFF90' }">
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
  },
  methods: {
    download (vmname) {
                window.location.href = urls.downloadVmUr+"/"+vmname;
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

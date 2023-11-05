<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>
        Vm Setup
      </fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="full-width  text-center items-center justify-center">
      <div style="max-width: 1100px;min-width: 425px;">
        <q-form @submit="createVms">
          <div class="row">
            <div class="col-12 col-md-1 q-pa-sm "></div>
            <div class="col-12 col-md-5 q-pa-sm">
              <q-select v-model="version" :options="['Windows', 'Linux']" outlined label="VM Type" lazy-rules
                :rules="[val => val && val.length > 0 || 'Choose An Option']" />
            </div>
            <div class="col-12 col-md-1 q-pa-sm "></div>
            <div class="col-12 col-md-5 q-pa-sm ">
              <q-input v-model="nos" outlined label="No Of VM's" lazy-rules
                :rules="[val => val && val.length > 0 || `No Of Vm's Is Required`]" />
            </div>
          </div>
          <fin-portlet-item class="q-pa-sm text-right q-mt-xl">
            <q-btn color="primary" no-caps class="sub-btn q-ml-sm" style="min-width:150px" label="Create VM"
              type="submit" :disable="loader">
              <q-spinner-facebook color="white" class="q-pl-sm" v-if="loader" />
            </q-btn>
          </fin-portlet-item>
        </q-form>
      </div>
    </fin-portlet-item>


  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { urls } from "./urls";
export default {
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem
  },
  data() {
    return {
      version: "",
      nos: "",
      instance: "Standard_D2s_v3=3",
      region: "East-US",
      loader: false,
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
            this.showMsg(response.data?.message, 'positive');
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

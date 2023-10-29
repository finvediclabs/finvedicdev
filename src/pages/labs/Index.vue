<template>
  <q-page>
    <fin-portlet>
      <fin-portlet-header>
        <fin-portlet-heading>Labs</fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item>
        <div class="row">
          <div class="col-12 colmd-6 col-lg-4 q-pa-md" v-for="(lab, index) in labsData" :key="lab.id">
            <q-card class="full-width shadow-8" style="border-radius: 10px!important;">
              <q-card-section horizontal>
                <q-card-section class="q-pa-lg lab-img" :style="{ background: lab.locked ? '#D49F8A' : '#7BFF90' }">
                  <q-img :src="lab.image" class="fit"></q-img>
                </q-card-section>
                <q-card-section class="" style="width: 70%;font-size: 13px;">
                  <div class="column full-width">
                    <div class="col flex items-center text-uppercase">
                      <fin-portlet-heading small>{{ lab.title + ' '+ (index + 1) }}</fin-portlet-heading>
                      <q-space />
                      <q-icon name="more_vert" size="20px" class="cursor-pointer"></q-icon>
                    </div>
                    <div class="col q-py-sm">
                      <div>
                        <strong>Instance : </strong>{{ lab.instance }}
                      </div>
                    </div>
                    <div class="col flex">
                      <q-select v-model="lab.os" :options="['windows', 'linux']" dense borderless
                        class="select-box shadow-3 q-pl-sm" />
                      <!-- <q-btn outlined :label="lab.os" size="12px" no-caps class="q-px-md text-weight-bold" dense /> -->
                      <q-space />
                      <q-btn :label="lab.locked ? 'Locked' : 'Lock'" size="12px" dense
                        class="q-px-md shadow-none text-weight-bold" rounded
                        :style="{ background: lab.locked ? '#D49F8A' : '#7BFF90' }">
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
      labsData: [
        { id: 1, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: false, os: 'Windows', image: labImg },
        { id: 2, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: false, os: 'Linux', image: labImg },
        { id: 3, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: false, os: 'Windows', image: labImg },
        { id: 4, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: false, os: 'Linux', image: labImg },
        { id: 5, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: false, os: 'Windows', image: labImg },
        { id: 6, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: false, os: 'Windows', image: labImg },
        { id: 7, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: true, os: 'Linux', image: labImg },
        { id: 8, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: true, os: 'Windows', image: labImg },
        { id: 9, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: true, os: 'Windows', image: labImg },
        { id: 10, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: true, os: 'Linux', image: labImg },
        { id: 11, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: true, os: 'Windows', image: labImg },
        { id: 12, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: true, os: 'Linux', image: labImg },
        { id: 13, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: true, os: 'Linux', image: labImg },
        { id: 13, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: true, os: 'Linux', image: labImg },
        { id: 13, title: "lab " + (Math.random() + 1).toString(36).substring(10), instance: 'Lorem Ipsum has been', locked: true, os: 'Linux', image: labImg },
      ]
    }
  },
}
</script>
<style>
.select-box.q-field--auto-height.q-field--dense .q-field__control,
.select-box.q-field--auto-height.q-field--dense .q-field__native,
.select-box.q-field--dense .q-field__marginal {
  height: 28px !important;
  min-height: 28px;
  max-height: 28px;
  /* padding-right: 0px; */
}

.lab-img {
  width: 30%;
  border-radius: 10px !important;
  box-shadow: 0px 0px 10px 0px #bbbbbb inset !important;
}
</style>

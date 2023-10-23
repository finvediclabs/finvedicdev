<template>
  <q-page>
    <fin-portlet>
      <fin-portlet-header>
        <fin-portlet-heading>Labs</fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item v-for="(item, index) in labsData">
        <fin-portlet-header style="margin-bottom:0px!important" class="q-mt-lg">
          <fin-portlet-heading small>{{ item.title }}</fin-portlet-heading>
        </fin-portlet-header>
        <div class="scroll-box">
          <div class="lab-box" v-for="(lab, index) in item.labs" :key="lab.id">
            <q-card class="shadow-4 q-pa-md lab-box">
              <q-card-section :style="{ background: lab.color }" class="fin-br-8 q-py-none">
                <q-img :src="lab.image" class="fit"></q-img>
              </q-card-section>
              <q-card-section class="q-pa-none q-py-xs justify-between">
                <fin-portlet-item class="flex items-center">
                  <span class="text-h6 text-weight-bolder">{{ lab.name + index }}</span>
                  <q-space></q-space>
                  <label>Os&nbsp;</label>
                  <q-select v-model="lab.os" :options="['windows', 'linux']" dense outlined class="select-box" />
                </fin-portlet-item>
              </q-card-section>
              <q-card-section class="q-px-none">
                {{ lab.discription }}
              </q-card-section>
              <q-card-actions>
                <q-btn no-caps rounded dense class="q-pl-md"  :style="{ background: lab.lock ? lab.color : '' }">
                  <div class="q-px-sm">Lock</div>
                  <q-icon left size="1.2em" name="lock" />
                </q-btn>
                <q-btn no-caps rounded dense class="q-pl-md"  :style="{ background: lab.release ? lab.color : '' }">
                  <div class="q-px-sm">Release</div>
                  <q-icon left size="1.2em" name="east" class="rotate-315" />
                </q-btn>
              </q-card-actions>
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
        {
          title: 'Locked Labs',
          labs: [
            { id: 1, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 2, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 3, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 4, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 5, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 6, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 1, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 2, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 3, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 4, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 5, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' },
            { id: 6, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: true, release: false, color: '#7BFF90' }
          ]
        },
        {
          title: 'Your Labs',
          labs: [
            { id: 1, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 2, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 3, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 4, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 5, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 6, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 1, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 2, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 3, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 4, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 5, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' },
            { id: 6, image: labsImg, name: 'Lab ', os: 'windows', discription: 'Instance', lock: false, release: true, color: '#F38C75' }
          ]
        }
      ],
    }
  },
}
</script>
<style>
.scroll-box {
  overflow-x: auto;
  display: flex;
  width: 100%;
}

.scroll-box::-webkit-scrollbar {
  height: 0px;
  width: 2px;
  border-radius: 10%;
}

.scroll-box::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scroll-box::-webkit-scrollbar-thumb {
  background: #888;
}

.scroll-box::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 10px;
}

.lab-box {
  width: 260px;
  margin: 10px;
}

.select-box.q-field--auto-height.q-field--dense .q-field__control,
.select-box.q-field--auto-height.q-field--dense .q-field__native,
.select-box.q-field--dense .q-field__marginal {
  height: 28px !important;
  min-height: 28px;
  max-height: 28px;
  padding-right: 0px;
}
</style>

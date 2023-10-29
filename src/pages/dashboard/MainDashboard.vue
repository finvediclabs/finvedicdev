<template>
  <q-page class=" flex justify-center">
    <fin-portlet>
      <fin-portlet-item>
        <div class="row" style="max-width: 1200px">
          <div class="col-12 col-md-6 q-py-lg q-my-sm bg-white q-px-md" v-for="tab in tabsList">
            <q-card class="my-card fin-card shadow-5" :style="{ background: tab.background }">
              <q-card-section horizontal class="full-height">
                <img class="card-img" :src="tab.image" />
                <q-card-section class="text-end full-width full-height text-grey-9">
                  <div class="column justify-between full-height text-right">
                    <div class="col">
                      <div class="col text-h6 q-pb-sm text-weight-bolder">{{ tab.title }}</div>
                      <div class="col">{{ tab.discription }}</div>
                    </div>
                    <div class="col no-padding" style="flex: none">
                      <router-link class="btn" :to="`admin/${tab.path}`">
                        <q-btn label="Create" no-caps flat dense class="q-px-md rounded-borders shadow-5 bg-white text-dark" />
                      </router-link>
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
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";

import usersPng from "src/assets/users.png";
import rolesPng from "src/assets/roles.png";
import organizationPng from "src/assets/Saly-15.png";
import vmSetupPng from "src/assets/vmSetup.png";
import booksPng from "src/assets/Saly-16.png";
import videosPng from "src/assets/Saly-24.png";
import prasentationPng from "src/assets/Rectangle.png";
import eventPng from "src/assets/Rectangle (1).png";



export default {
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      tabsList: [
        {
          image: usersPng,
          title: 'Users',
          discription: 'Lorem Ipsum has been the industrys standard dummy text ever since',
          path: 'users',
          background: '#FFCE70',
        },
        {
          image: rolesPng,
          title: 'Roles',
          discription: 'Lorem Ipsum has been the industrys standard dummy text ever since',
          path: 'roles',
          background: '#CCB4FF',
        },
        {
          image: organizationPng,
          title: 'Organizations',
          discription: 'Lorem Ipsum has been the industrys standard dummy text ever since',
          path: 'organizations',
          background: '#1E90FF90',
        },
        {
          image: vmSetupPng,
          title: 'VM Setup',
          discription: 'Lorem Ipsum has been the industrys standard dummy text ever since',
          path: 'vm-setup',
          background: '#FF83DF',
        },
        {
          image: booksPng,
          title: 'Books',
          discription: 'Lorem Ipsum has been the industrys standard dummy text ever since',
          path: 'books',
          background: 'rgba(55, 66, 250, 0.50)',
        },
        {
          image: videosPng,
          title: 'Videos',
          discription: 'Lorem Ipsum has been the industrys standard dummy text ever since',
          path: 'videos',
          background: 'rgba(30, 144, 255, 0.50)',
        },
        {
          image: prasentationPng,
          title: 'Presentations',
          discription: 'Lorem Ipsum has been the industrys standard dummy text ever since',
          path: 'videos',
          background: '#FFBD80',
        },
        {
          image: eventPng,
          title: 'Calander Events',
          discription: 'Lorem Ipsum has been the industrys standard dummy text ever since',
          path: 'videos',
          background: '#FF9C78',
        }
      ]
    }
  },
};
</script>
<style>
.fin-card {
  height: 173px
}

.card-img {
  margin-top: -40px;
  margin-left: -10px;
  /* height: 213px; */
  max-width: 40%!important;
}

@media SCREEN and (max-width: 576px) {
  .card-img {
    max-width: 150px
  }
}
</style>


<template>
  <q-page class=" flex justify-center"  >
    <fin-portlet>
      <fin-portlet-item  >
        <div class="row" style="max-width: 1100px;" >
          <div class="col-12 col-md-6 q-py-lg q-my-sm bg-white card-space" v-for="tab in tabsList">
            <router-link class="btn" :to="`admin/${tab.path}`" style="text-decoration: none;" :class="{ disable: !tab.enable }">
              <q-card class="my-card card-link fin-card shadow-5" :style="{ background: tab.background }">
                <q-card-section horizontal class="full-height">
                  <img class="card-img" :src="tab.image" />
                  <q-card-section class="text-end full-width full-height text-grey-9">
                    <div class="column justify-between full-height text-right">
                      <div class="col">
                        <div class="col text-h6 q-pb-sm text-weight-bolder">{{ tab.title }}</div>
                        <div class="col">{{ tab.description }}</div>
                      </div>
                      
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </router-link>
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
import presentationPng from "src/assets/Rectangle.png";
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
          description: 'Perfect for learning how the framework works.',
          path: 'users',
          background: '#FFCE70',
        
          enable: true
        },
        {
          image: rolesPng,
          title: 'Roles',
          description: 'Perfect for learning how the framework works.',
          path: 'roles',
          background: '#CCB4FF',
          enable: true
          
        },
        {
          image: organizationPng,
          title: 'AI Training',
          description: 'Perfect for learning how the framework works.',
          path: 'uploadpdfbot',
          background: '#1E90FF90',
          enable: true
        },
        // {
        //   image: organizationPng,
        //   title: 'Organizations',
        //   description: 'Perfect for learning how the framework works.',
        //   path: 'organizations',
        //   background: '#1E90FF90',
        //   enable: true
        // },
        
        {
          image: vmSetupPng,
          title: 'VM Setup',
          description: 'Perfect for learning how the framework works.',
          path: 'vm-setup',
          background: '#FF83DF',
          enable: true
        },
        {
          image: booksPng,
          title: 'Books',
          description: 'Perfect for learning how the framework works.',
          path: 'books',
          background: 'rgba(55, 66, 250, 0.50)',
          enable: true
        },
        {
          image: videosPng,
          title: 'Videos',
          description: 'Perfect for learning how the framework works.',
          path: 'videos',
          background: 'rgba(30, 144, 255, 0.50)',
          enable: true
        },
        {
          image: presentationPng,
          title: 'Presentations',
          description: 'Perfect for learning how the framework works.',
          path: 'presentations',
          background: '#FFBD80',
          enable: true
        },
        {
          image: eventPng,
          title: 'Calender Events',
          description: 'Perfect for learning how the framework works.',
          path: 'class-room',
          background: '#FF9C78',
          enable: true
        },
        {

          image: vmSetupPng,
          title: 'Assignments',
          description: 'Perfect for learning how the framework works.',
          path: 'assignments',
          background: '#FFCE70',
          enable: true
        },
        
        {
          image: organizationPng,
          title: 'Website Forms Data',
          description: 'Perfect for learning how the framework works.',
          path: 'forms',
          background: '#1E90FF90',
          enable: true
        },
        {
          image: usersPng,
          title: 'Student Register Form',
          description: 'Perfect for learning how the framework works.',
          path: 'studentRegister',
          background: '#b9e59b',
          enable: true
        },
        {
          image: usersPng,
          title: 'Channels',
          description: 'Perfect for learning how the framework works.',
          path: 'BatchRegister',
          background: '#FFBD80',
          enable: true
        },
      ]
    }
  }
};
</script>
<style>
.fin-card {
  height: 173px
}
.TopBG{
  background-color:rgba(255, 255, 255, 0);
  margin-top: 2%;
  /* background-color: red; */
}

.card-img {
  margin-top: -40px;
  margin-left: -10px;
  /* height: 213px; */
  width: 40% !important;
}
/* .backgroundStyle{
  background: #D0DFFA;
  background-repeat: no-repeat;
  background-size: 100vw 65vh; 
} */
.card-space {
  padding-left: 1.725rem;
  padding-right: 1.725rem;
}

.card-link:hover {
  transform: scale(1.02);
  transition: 500ms;
}

@media SCREEN and (max-width: 576px) {
  .card-img {
    width: 130px
  }

  .card-space {
    padding-left: 0;
    padding-right: 0;
  }
}

.disable {
  pointer-events:none;
}
</style>

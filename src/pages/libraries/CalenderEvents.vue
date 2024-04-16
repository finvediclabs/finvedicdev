<template>
  <fin-portlet>
    <fin-portlet-header>
      <div class="row full-width">
        <div class="col-1"></div>
        <div class="col-12 col-md-6 " :class="{ 'q-mt-xl': !isMobile }">
        <!-- v-for="(event, index) in events" :key="event.id" -->
        
          <q-card class="my-card full-width text-white full-height" style="background: #2FCB89;">
            <q-card-section class="row justify-between" >
              <div>
                <div>Schedule</div>
                <br>
                <div class="text-h4 text-weight-bolder">Title</div>
              </div>
              <q-img :src="classRoom" class="classRoomImg" v-if="!isMobile" />
            </q-card-section>
            <q-card-section class="row justify-between">
              <div class="items-center">
                <q-btn label="Banking" no-caps outline rounded color="white" />
                <span class="q-pl-sm text-body1">12:30 - 01:30</span>
              </div>
              <q-btn label="Connect" class="text-black bg-white q-px-lg fin-br-8" no-caps />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4 q-my-auto q-mx-auto">
          <template v-for="category in categories">

            <q-btn :label="category.categoryName" no-caps v-if="!subCategories[category.id]" size="lg"
              class="full-width q-my-sm fin-br-8 categoryClass"
              :class="{ 'active-categoryClass': selectedCategory?.id == category.id }"
              @click="selectCategory(category)" />

            <q-btn-dropdown :label="category.categoryName" no-caps v-if="subCategories[category.id]" size="lg"
              class="full-width q-my-sm fin-br-8 categoryClass"
              :class="{ 'active-categoryClass': selectedCategory?.id === category.id }">
              <q-list>
                <q-item v-for="subCategory in subCategories[category.id]" clickable v-close-popup
                  @click="selectSubCategory(category, subCategory)" :active="selectedSubCategory?.id == subCategory.id"
                  active-class="active-categoryClass">
                  <q-item-section>
                    <q-item-label><b>{{ subCategory.subCategoryName }}</b></q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

          </template>
        </div>
      </div>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-calender isReadOnly :events="events" :template="template" :view="isMobile ? 'day' : 'week'" />
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinPortlet from 'src/components/Portlets/FinPortlet.vue';
import FinPortletHeader from 'src/components/Portlets/FinPortletHeader.vue';
import FinPortletHeading from 'src/components/Portlets/FinPortletHeading.vue';
import FinPortletItem from 'src/components/Portlets/FinPortletItem.vue';
import FinCalender from "src/components/FinCalender.vue";
import classRoom from "src/assets/classRoom.png"
import classCardImg from "src/assets/classCard.png";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "src/stores/Categories";
import ColorHash from 'color-hash'
var colorHash = new ColorHash();
import { urls } from "./Urls"
export default {
  setup() {
    const categoryStore = useCategoryStore();
    const { categories, subCategories, selectedCategory, selectedSubCategory } = storeToRefs(categoryStore);
    const { selectCategory, selectSubCategory } = categoryStore;
    return { categories, subCategories, selectedCategory, selectedSubCategory, selectCategory, selectSubCategory }
  },
  components: {
    FinCalender,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      isMobile: window.innerWidth < 600 ? true : false,
      classRoom: classRoom,
      classCardImg: classCardImg,
      calendar: '',
      template: {
        time(event) {
        const { start, end, title } = event;
        return `<span style="color: white;">${title} ${start}~${(end)} </span>`;
        },
        allday: (event) => {
          return `<span style="color: gray;">${event}</span>`;
        },
        // allday(event) {
        //   return `<span style="color: gray;">${event}</span>`;
        // },
      },
      events: [],
    }
  },
  watch: {
    selectedCategory() {
      if (this.selectedCategory) {
        this.getEventsData();
      }
    },
    selectedSubCategory() {
      if (this.selectedCategory) {
        this.getEventsData();
      }
    }
  },
  mounted() {
    if (this.selectedCategory) {
      this.getEventsData();
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
    getEventsData() {
      var request = {
        categoryId: this.selectedCategory?.id,
        subCategoryId: this.selectedSubCategory?.id
      };
      this.loading = true;
      this.$api.get(urls.getEvents, {
        params: request
      }).then(response => {
        this.loading = false;
        if (response.data.success) {
          let events = response.data.data;
          this.events = events.map(event => (
            {
              ...event,
              start: `${event.date} ${event.start}`,
              end: `${event.date} ${event.end}`,
              color: 'white',
              backgroundColor: colorHash.hex(event.title)
            }
          ));
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    }
  }
}
</script>
<style>
.classRoomImg {
  width: 35%;
  margin-top: -50px;
}

.categoryClass {
  background-color: #D6D6D6;
}

.active-categoryClass {
  background: linear-gradient(to right, rgba(47, 203, 137) 2%, rgba(47, 203, 137, 0.53) 1px);
  color: black;
}
/* <<<<<<< Updated upstream
======= */
/* New hover effect */
.event-container:hover {
  background-color:  rgba(47, 203, 137);
  cursor:pointer;
  /* Adjust other styles as needed */
}
/* .hiddendiv{
display:block;
min-height:200px !important;
width :360px !important;
background-color:gray;
border:2px solid red;
position: absolute;
overflow: visible !important;
z-index: 99999 !important;
} */

/* .event-container:hover .hiddendiv{
  display:none
} */

/* .toastui-calendar-event-time-content:hover .hiddendiv{
  display: none;
  overflow: visible !important;
} */
.toastui-calendar-popup-container {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}
.toastui-calendar-template-popupDetailDate::before{
  content: "Date & Time: \A "!important;
  white-space: pre !important;
}
/* .toastui-calendar-template-popupDetailTitle::before{
  content: "Title & Topic: \A ";
  white-space: pre;
} */
.toastui-calendar-template-popupDetailTitle{
  font-size: 16px !important;
  font-weight: 600 !important;
}
.toastui-calendar-template-popupDetailTitle::after{
  content: "\A"!important;
  white-space:  pre !important;
}
.toastui-calendar-template-popupDetailDate{
  
  font-size: 16px !important;
  font-weight: 600 !important;
  
}

.toastui-calendar-event-time-content:hover {
  background-color:  rgba(47, 203, 137) !important;
  /* Adjust other styles as needed */
}
.toastui-calendar-popup-container{
  background-color: white !important;
  color: #5479F7 !important;

}
.toastui-calendar-popup-arrow-border{
  display: none !important;
}
.toastui-calendar-detail-container{
  background-color: white !important;
  min-height: 25vh !important;

}
.toastui-calendar-section-button { display: none!important; }
.toastui-calendar-section-detail {display: none !important;}
/* >>>>>>> Stashed changes */
</style>

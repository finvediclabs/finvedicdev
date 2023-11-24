<template>
  <fin-portlet>
    <fin-portlet-header>
      <div class="row full-width">
        <div class="col-1"></div>
        <div class="col-12 col-md-6 " :class="{'q-mt-xl': !isMobile} ">
          <q-card class="my-card full-width text-white full-height" style="background: #2FCB89;">
            <q-card-section class="row justify-between">
              <div>
                <div>Schedule</div>
                <br>
                <div class="text-h4 text-weight-bolder">Upcomming Class</div>
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
              :class="{'active-categoryClass' : selectedCategory?.id == category.id}" @click="selectCategory(category)" />

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
      <fin-calender isReadOnly :events="events" :template="template" :view="isMobile ? 'day' : 'week'"/>
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
import { useCategorieStore } from "src/stores/Categories";
import ColorHash from 'color-hash'
var colorHash = new ColorHash();
export default {
  setup() {
    const categorieStore = useCategorieStore();
    const { categories, subCategories, selectedCategory, selectedSubCategory } = storeToRefs(categorieStore);
    const { selectCategory, selectSubCategory } = categorieStore;
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
        // time(event) {
        //   const { start, end, title } = event;
        //   return `<span style="color: white;">${title} ${start}~${(end)} </span>`;
        // },
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
      console.log(this.selectedCategory);
    },
    selectedSubCategory() {
      console.log(this.selectedSubCategory);
    }
  },
  mounted() {
    this.getEventsData();
  },
  methods: {
    getEventsData() {
      let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
      this.events = events.map(event => ({ ...event, start: `${event.date} ${event.start}`, end: `${event.date} ${event.end}`, color: 'white', backgroundColor: colorHash.hex(event.title) }));
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
  background:linear-gradient(to right, rgba(47, 203, 137) 2%, rgba(47, 203, 137, 0.53) 1px);
  color: black;
}
</style>

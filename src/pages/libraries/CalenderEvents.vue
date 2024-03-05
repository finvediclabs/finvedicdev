<template>
  <fin-portlet>
    <fin-portlet-header>
      <div class="row full-width">
        <div class="col-1"></div>
        <div class="col-12 col-md-6 " :class="{ 'q-mt-xl': !isMobile }">
          <!-- v-for="(event, index) in events" :key="event.id" -->
          <q-card v-if="upcomingEvents.length > 0" class="my-card full-width text-white full-height" style="background: #2FCB89;">
          

            <q-card-section class="row justify-between">
              <div>
                <div>{{ extractTitle(nextEventTitle) }}</div>
                <br>
                <div class="text-h5 text-weight-bolder">Start :{{ nextEventStart }}<br>End :{{ nextEventEnd }}</div>
              </div>
              <q-img :src="classRoom" class="classRoomImg" v-if="!isMobile" />
            </q-card-section>
            <q-card-section class="row justify-between">
              <div class="items-center">
                <q-btn :label="extractTitle(nextEventTitle)" :href="extractLink(nextEventTitle)" no-caps outline rounded color="white" />
                
              </div>
              <q-btn label="Connect" class="text-black bg-white q-px-lg fin-br-8" no-caps :href="extractLink(nextEventTitle)" @click="redirectToNextEventLink" />
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
    //  if (this.selectedCategory) {
        this.getEventsData();
    //  }
    },
    selectedSubCategory() {
    //  if (this.selectedCategory) {
        this.getEventsData();
      //}
    }
  },
  computed: {
    // Filter upcoming events
    upcomingEvents() {
      const now = new Date();
      return this.events.filter(event => new Date(event.start) > now);
    },
    // Compute next upcoming event
    nextEvent() {
      const upcomingEvents = this.upcomingEvents;
      if (upcomingEvents.length > 0) {
        return upcomingEvents.reduce((next, current) => {
          if (!next || new Date(current.start) < new Date(next.start)) {
            return current;
          }
          return next;
        });
      }
      return null;
    },
    // Compute next event title
    nextEventTitle() {
      
    return this.nextEvent ? this.nextEvent.title : '';
    
    
    },
    // Compute next event start time
    nextEventStart() {
    return this.nextEvent ? this.formatDateTime(this.nextEvent.start) : '';
  },
  // Compute next event end time
  nextEventEnd() {
    return this.nextEvent ? this.formatDateTime(this.nextEvent.end) : '';
  },
  // Compute next event time
  nextEventTime() {
    return this.nextEvent ? `${this.nextEventStart} - ${this.nextEventEnd}` : '';
  }
  
},
  mounted() {
   // if (this.selectedCategory) {
      this.getEventsData();
    //}
  },
  methods: {
    extractTitle(title) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = title;
    const anchorElement = tempDiv.querySelector('a');
    return anchorElement ? anchorElement.textContent : '';
  },
  extractLink(title) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = title;
    const anchorElement = tempDiv.querySelector('a');
    return anchorElement ? anchorElement.getAttribute('href') : '';
  },
    formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return `${formattedDate} ${formattedTime}`;
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
              title: `<a href="${event.link}"  target="_blank">${event.title}</a>`,
              start: `${event.date} ${event.start}`,
              end: `${event.date} ${event.end}`,
              link: `${event.link}`,
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
</style>

<template>
  <fin-portlet>
    <fin-portlet-header>
      <div class="row full-width">
        <div class="col-1"></div>
        <div class="col-12 col-md-6 " :class="{ 'q-mt-xl': !isMobile }">
          <!-- v-for="(event, index) in events" :key="event.id" -->
          <q-card v-if="upcomingEvents.length > 0 || events.length > 0" class="my-card full-width text-white full-height" style="background: #5479F7;">
  <q-card-section class="row justify-between">
    <div v-if="nextEvent">
      <div>Next Class : {{ extractTitle(nextEventTitle) }}</div>
      <br>
      <div class="text-h5 text-weight-bolder">
        Date: {{ nextEventDate }}<br>
        Start: {{ nextEventStartTime }}<br>
        End: {{ nextEventEndTime }}
      </div>
    </div>
    <div v-else-if="lastEvent">
      <div>Last Class : {{ extractTitle(lastEventTitle) }}</div>
      <br>
      <div class="text-h5 text-weight-bolder">
        Date: {{ lastEventDate }}<br>
        Start: {{ lastEventStartTime }}<br>
        End: {{ lastEventEndTime }}
      </div>
    </div>
    <q-img :src="classRoom" class="classRoomImg" v-if="!isMobile" />
  </q-card-section>
  <q-card-section class="row justify-between">
    <div class="items-center">
      <q-btn :href="nextEvent ? extractLink(nextEventTitle) : lastEvent ? extractLink(lastEventTitle) : ''" target="_blank" no-caps outline rounded color="white">
        Topic: {{ nextEvent ? nextEventTopic : lastEvent ? lastEventTopic : '' }}
      </q-btn>
    </div>
    <q-btn label="Connect" class="text-blue bg-white q-px-lg fin-br-8" no-caps :href="nextEvent ? extractLink(nextEventTitle) : lastEvent ? extractLink(lastEventTitle) : ''" target="_blank" />
  </q-card-section>
</q-card>

        </div>
        <div class="col-12 col-md-4  q-mx-auto q-mt-xl"  style="display: flex; flex-direction: column;" >
          <template v-for="category in categories"  >

            <q-btn :label="category.categoryName" no-caps v-if="!subCategories[category.id]" size="md"
              class="full-width fin-br-8 q-pa-md  categoryClass"
              :class="{ 'active-categoryClass': selectedCategory?.id == category.id }"
              @click="selectCategory(category)" 
              style="margin-top: auto;margin-bottom: auto;"
              />

            <q-btn-dropdown :label="category.categoryName" no-caps v-if="subCategories[category.id]" size="md"
              class="full-width fin-br-8 q-pa-md categoryClass"
              :class="{ 'active-categoryClass': selectedCategory?.id === category.id }"
              style="margin-top: auto;margin-bottom: auto;"
              >
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
    
    <fin-portlet-item >
      <fin-calender  isReadOnly :events="events" :template="template" :view="isMobile ? 'day' : 'week'"  />
      <!-- <div  v-if="showDiv" class="hiddendiv">SANDEEP</div> -->

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
      showDiv: false,
      template: {
        time(event) {
          const { title, topic } = event;
          return `<div class="event-container "><span style="color: white;">${title}</span></div>
         
          `;
        },
        allday: (event) => {
          return `<span style="color: ;">${event}</span>`;
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
    pastEvents() {
    const now = new Date();
    return this.events.filter(event => new Date(event.end) < now);
  },
  lastEvent() {
    if (this.pastEvents.length > 0) {
      return this.pastEvents.reduce((prev, current) => {
        if (!prev || new Date(current.end) > new Date(prev.end)) {
          return current;
        }
        return prev;
      });
    }
    return null;
  },
  lastEventTitle() {
    return this.lastEvent ? this.lastEvent.title : '';
  },
  // Compute last event start time
  lastEventStart() {
    return this.lastEvent ? this.formatDateTime(this.lastEvent.start) : '';
  },
  // Compute last event end time
  lastEventEnd() {
    return this.lastEvent ? this.formatDateTime(this.lastEvent.end) : '';
  },
  // Compute last event time
  lastEventTime() {
    return this.lastEvent ? `${this.lastEventStart} - ${this.lastEventEnd}` : '';
  },
  lastEventDate() {
    return this.lastEvent ? this.formatDate(this.lastEvent.start) : '';
  },
  // Compute last event start time
  lastEventStartTime() {
    return this.lastEvent ? this.formatTime(this.lastEvent.start) : '';
  },
  // Compute last event end time
  lastEventEndTime() {
    return this.lastEvent ? this.formatTime(this.lastEvent.end) : '';
  },
    // Filter upcoming events
    upcomingEvents() {
      const now = new Date();
      return this.events.filter(event => new Date(event.start) > now);
    },
    nextEventTopic() {
      return this.nextEvent ? this.nextEvent.topic : '';
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
  },
  nextEventDate() {
  return this.nextEvent ? this.formatDate(this.nextEvent.start) : '';
},
// Compute next event start time
nextEventStartTime() {
  return this.nextEvent ? this.formatTime(this.nextEvent.start) : '';
},
// Compute next event end time
nextEventEndTime() {
  return this.nextEvent ? this.formatTime(this.nextEvent.end) : '';
},
upcomingEvents() {
    const now = new Date();
    return this.events.filter(event => new Date(event.start) > now);
  },
  lastEventTopic() {
    return this.lastEvent ? this.lastEvent.topic : '';
  },
  lastEventTitle() {
    return this.lastEvent ? this.lastEvent.title : '';
  },
  lastEventDate() {
    return this.lastEvent ? this.formatDate(this.lastEvent.start) : '';
  },
  lastEventStartTime() {
    return this.lastEvent ? this.formatTime(this.lastEvent.start) : '';
  },
  lastEventEndTime() {
    return this.lastEvent ? this.formatTime(this.lastEvent.end) : '';
  },
  // Compute last event
  lastEvent() {
    const events = this.events;
    if (events.length > 0) {
      return events.reduce((last, current) => {
        if (!last || new Date(current.start) > new Date(last.start)) {
          return current;
        }
        return last;
      });
    }
    return null;
  },
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
  formatDate(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  },
  // Format time
  formatTime(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
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
    //  showHiddenDiv() {
    //   this.showDiv = !this.showDiv; // Toggle the showDiv property
    // },
    
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
          title: `Title: <a href="${event.link}"  target="_blank">${event.title}</a><br>Topic: ${event.topic}`,
          start: `${event.date} ${event.start}`,
          end: `${event.date} ${event.end}`,
          link: `${event.link}`,
          topic: `${event.topic}`,
          color: 'white',
          backgroundColor: colorHash.hex(event.title),
          width: '100%', // Set width to '100%'
          height: '50px'
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
  width: 38%;
  margin-top: -50px;
}
.text-body1{
  color:#5479F7 !important;
}
.categoryClass {
  background-color: #FFFFFF;
  color: #93BAFF;
  /* border: 2px solid black */
}

.active-categoryClass {
  background: linear-gradient(to right, rgba(84, 121, 247, 0.8) 4%, rgba(147, 186, 255, 0.8) 1px);
  color: #FFFFFF;
}
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
</style>

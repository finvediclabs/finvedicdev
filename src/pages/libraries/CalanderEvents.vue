<template>
  <fin-portlet style="min-width: 600px;overflow-x: auto;">
    <fin-portlet-header>
      <div class="row full-width">
        <div class="col-1"></div>
        <div class="col-12 col-md-6 q-mt-xl">
          <q-card class="my-card full-width text-white full-height" style="background: #2FCB89;">
            <q-card-section class="row justify-between">
              <div>
                <div>Schedule</div>
                <br>
                <div class="text-h4 text-weight-bolder">Upcomming Class</div>
              </div>
              <q-img :src="classRoom" class="classRoomImg " />
            </q-card-section>
            <q-card-section class="row justify-between">
              <div class="items-center">
                <q-btn label="Banking" no-caps outline rounded color="white" />
                <span class="q-pl-sm text-body1">12:30 - 01:30</span>
              </div>
              <q-btn label="Connect" class="text-black bg-white q-px-lg" no-caps />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4 q-px-lg q-mt-xl">
          <q-card class="my-card justify-center text-center full-height" style="background: #FFD18B;">
            <q-card-section class="justify-center text-center">
              <q-img :src="classCardImg" style="width: 35%;margin-top: -50px" />
              <q-card-section style="width: 70%" class=" q-mx-auto">
                <q-btn no-caps label="Disruptive Technologies" outline class="fin-br-8 full-width" />
                <q-btn no-caps label="Introduction to Banking" outline class="fin-br-8 full-width q-my-sm" />
                <q-btn no-caps label="Specialzations" outline class="fin-br-8 full-width" />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-calender isReadOnly :events="events" :template="template" />
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
import ColorHash from 'color-hash'
var colorHash = new ColorHash();
export default {
  components: {
    FinCalender,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      classRoom: classRoom,
      classCardImg: classCardImg,
      calendar: '',
      template: {
        // time(event) {
        //   const { start, end, title } = event;
        //   return `<span style="color: white;">${title} ${start}~${(end)} </span>`;
        // },
        allday: (event) => {
          console.log(event);
        },
        // allday(event) {
        //   console.log(event,'event');
        //   return `<span style="color: gray;">${event.title}</span>`;
        // },
      },
      events: [],
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
</style>

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
      <fin-calender isReadOnly :events="events" :template="template"/>
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
      this.events = [
        {
          id: '1',
          title: 'Payments',
          dueDateClass: '',
          color: 'white',
          // backgroundColor: 'rgba(48, 203, 137, 0.7 0)',
          start: '2023-11-01 10:30:00',
          end: '2023-11-01 12:30:00',
        },
        {
          id: '1',
          title: 'events',
          dueDateClass: '',
          color: 'white',
          backgroundColor: 'rgba(48, 203, 137, 0.70)',
          start: '2023-11-01 12:30:00',
          end: '2023-11-01 14:30:00',
        },
        {
          id: '2',
          title: 'Banking',
          dueDateClass: '',
          color: 'white',
          backgroundColor: '#17DE8A',
          start: '2023-11-02 12:30:00',
          end: '2023-11-02 14:30:00',
        },
        {
          id: '3',
          title: 'Insurence',
          dueDateClass: '',
          color: 'white',
          backgroundColor: '#5479F7',
          start: '2023-11-03 13:30:00',
          end: '2023-11-03 19:30:00',
        },
        {
          id: '4',
          title: 'Fixed Tranding',
          dueDateClass: '',
          color: 'white',
          backgroundColor: '#17DE8A',
          start: '2023-11-04 11:30:00',
          end: '2023-11-04 13:30:00',
        },
        {
          id: '5',
          title: 'my event',
          dueDateClass: '',
          color: 'white',
          // backgroundColor: 'rgba(48, 203, 137, 0.7 0)',
          start: '2023-11-05 12:30:00',
          end: '2023-11-05 14:30:00',
        },
        {
          id: '6',
          title: 'my event',
          dueDateClass: '',
          color: 'white',
          backgroundColor: '#FFB21D',
          start: '2023-11-05 14:30:00',
          end: '2023-11-05 17:30:00',
        },
        {
          id: '7',
          title: 'my event',
          dueDateClass: '',
          color: 'white',
          backgroundColor: '#5479F7',
          start: '2023-11-06 10:30:00',
          end: '2023-11-06 12:30:00',
        },

        {
          id: '8',
          title: 'my event',
          dueDateClass: '',
          color: 'white',
          backgroundColor: '#17DE8A',
          start: '2023-11-07 12:30:00',
          end: '2023-11-07 14:30:00',
        },
        {
          id: '9',
          title: 'my event',
          dueDateClass: '',
          color: 'white',
          // backgroundColor: 'rgba(48, 203, 137, 0.7 0)',
          start: '2023-11-08 09:30:00',
          end: '2023-11-08 10:30:00',
        },
        {
          id: '10',
          title: 'my event',
          dueDateClass: '',
          color: 'white',
          backgroundColor: '#5479F7',
          start: '2023-11-09 07:30:00',
          end: '2023-11-09 09:30:00',
        },
        {
          id: '11',
          title: 'my event',
          dueDateClass: '',
          color: 'white',
          backgroundColor: '#17DE8A',
          start: '2023-11-10 10:30:00',
          end: '2023-11-10 13:30:00',
        },
      ]
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

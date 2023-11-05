<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Create Event</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item style="max-width: 1000px">
      <div class="row">
        <div class="col-12 col-md-5 q-px-sm">
          <label class="form-label">Date</label>
          <date-picker v-model="date" auto-apply :enable-time-picker="false" :format="format" placeholder="Select Date"
            class="full-width rounded-borders shadow-2 datePicker" :clearable="false" :inline="{ input: true }" />
          <div class="errorMsgBox">
            <span v-if="errors.date && !date">{{ errors.date }}</span>
          </div>
        </div>
        <div class="col-12 col-lg-7">
          <div class="row">
            <div class="col-12 col-sm-6 q-px-sm">
              <label class="form-label">Start Time</label>
              <date-picker v-model="startTime" auto-apply time-picker placeholder="Select Start Time"
                class="shadow-5 q-py-sm rounded-borders time" :clearable="false" :is-24="false" closeOnAutoApply>
                <template #input-icon>
                  <q-icon name="schedule" size="sm" class="q-ml-xs" />
                </template>
              </date-picker>
              <div class="errorMsgBox">
                <span v-if="errors.startTime && !startTime">{{ errors.startTime }}</span>
              </div>
            </div>
            <div class="col-12 col-sm-6 q-px-sm">
              <label class="form-label">End Time</label>
              <date-picker v-model="endTime" auto-apply time-picker placeholder="Select End Time"
                class="shadow-5 q-py-sm rounded-borders time" :clearable="false" :is-24="false">
                <template #input-icon>
                  <q-icon name="schedule" size="sm" class="q-ml-xs" />
                </template>
              </date-picker>
              <div class="errorMsgBox">
                <span v-if="errors.endTime && !endTime">{{ errors.endTime }}</span>
              </div>
            </div>
            <div class="col-12 q-px-sm">
              <label class="form-label">Course</label>
              <q-select v-model="course" class="shadow-5 q-px-md rounded-borders" borderless
                :options="['title-1', 'title-2']" />
              <div class="errorMsgBox">
                <span v-if="errors.course && !course">{{ errors.course }}</span>
              </div>
            </div>
            <div class="col-12 q-px-sm">
              <label class="form-label">Title</label>
              <q-input v-model="title" class="shadow-5 q-px-md rounded-borders" borderless />
              <div class="errorMsgBox">
                <span v-if="errors.title && !title">{{ errors.title }}</span>
              </div>
            </div>
            <div class="col-12 q-px-sm">
              <label class="form-label">Link</label>
              <q-input v-model="link" class="shadow-5 q-px-md rounded-borders" borderless />
              <div class="errorMsgBox">
                <span v-if="errors.link && !link">{{ errors.link }}</span>
              </div>
            </div>
            <div class="col-12 q-px-sm q-pt-xl justify-end row">
              <q-space />
              <q-btn class="shadow-5 q-px-md rounded-borders sub-btn q-px-xl text-white" label="Update" no-caps
                @click="validateForm" />
            </div>
          </div>
        </div>
      </div>
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from "moment";
export default {
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
    DatePicker
  },
  data() {
    return {
      date: '',
      startTime: '',
      endTime: '',
      course: '',
      title: '',
      link: '',
      errors: {},
      index: '',
    }
  },
  mounted() {
    var editedEvent = this.$route.query.id;
    if (editedEvent) {
      editedEvent = JSON.parse(editedEvent);
      let startTime = editedEvent.start.split(":");
      let endTime = editedEvent.end.split(":");
      this.date = editedEvent.date;
      this.startTime = { hours: startTime[0], minutes: startTime[1] };
      this.endTime = { hours: endTime[0], minutes: endTime[1] };
      this.course = editedEvent.course;
      this.title = editedEvent.title;
      this.link = editedEvent.link;
      this.index = editedEvent.index;
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
    format(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day} / ${month} /${year}`;
    },
    validateForm() {
      if (this.date && this.startTime && this.endTime && this.course && this.title && this.link) {
        this.createEvent();
      } else {
        this.errors = {
          date: "Date is required",
          startTime: "Start Time is required",
          endTime: "End Time is required",
          course: "Course is requried",
          title: "Title is required",
          link: "Link is required"
        }
      }
    },
    createEvent() {
      let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
      let event = {
        date: moment(this.date).format('YYYY-MM-DD'),
        start: `${this.gettwoDigits(this.startTime.hours)}:${this.gettwoDigits(this.startTime.minutes)}`,
        end: `${this.gettwoDigits(this.endTime.hours)}:${this.gettwoDigits(this.endTime.minutes)}`,
        course: this.course,
        title: this.title,
        link: this.link,
      };
      if (this.index) {
        events[this.index-1] = event;
      } else {
        events.push(event);
      }
      localStorage.setItem('events', JSON.stringify(events));
      this.showMsg("Event Added Successfully", 'positive');
      this.clearData();
    },
    gettwoDigits(myNumber) {
      return myNumber.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    },
    clearData() {
      this.date = "";
      this.startTime = "";
      this.endTime = "";
      this.course = "";
      this.title = "";
      this.link = "";
    }
  }
}
</script>
<style>
.form-label {
  font-weight: bold;
  margin-left: 10px;
}

.time .dp__input {
  border: none;
  padding-top: 5px !important;
  padding-bottom: 5px;
  border-radius: 8px;
}

.errorMsgBox {
  height: 20px;
  font-weight: bold;
  margin-left: 10px;

  & span {
    font-size: 12px;
    color: red;
  }
}

.datePicker div {
  width: 100%;
}
</style>

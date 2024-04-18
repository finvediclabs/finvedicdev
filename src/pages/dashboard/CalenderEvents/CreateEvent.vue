<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Create Event</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="justify-center row">
      <div class="row" style="max-width: 1000px">
        <div class="col-12 col-md-5 q-px-sm">
          <label class="form-label">Date</label>
          <date-picker v-model="date" auto-apply :enable-time-picker="false" :format="format" placeholder="Select Date"
            class="full-width rounded-borders datePicker eventClass" :clearable="false" :inline="{ input: true }">
            <template #input-icon>
              <q-icon name="calendar_month" class="q-my-auto q-pb-lg q-px-sm" size="sm" />
            </template>
          </date-picker>
          <div class="errorMsgBox">
            <span v-if="errors.date && !date">{{ errors.date }}</span>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-12 col-lg-6">
          <div class="row">
            <div class="col-12 col-sm-6 q-px-sm">
              <label class="form-label">Start Time</label>
              <date-picker v-model="startTime" auto-apply time-picker placeholder="Select Start Time"
                class="rounded-borders time inputBackground" :clearable="false" :is-24="false" closeOnAutoApply>
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
                class="rounded-borders time inputBackground" :clearable="false" :is-24="false">
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
              <q-select v-model="course" class="q-px-md rounded-borders inputBackground" borderless
                :options="courseOptions" option-label="courseName" option-value="courseid"  @select="selectCourse(course)"/>
              <div class="errorMsgBox">
                <span v-if="errors.course && !course">{{ errors.course }}</span>
              </div>
            </div>
            <div class="col-12 q-px-sm">
              <label class="form-label">Topic</label>
              <q-select v-model="topic" class="q-px-md rounded-borders inputBackground" borderless
                :options="topicOptions" option-label="topicName" option-value="topicId" />
              <div class="errorMsgBox">
                <span v-if="errors.topic && !topic">{{ errors.topic }}</span>
              </div>
            </div> 
            <div class="col-12 q-px-sm">
              <label class="form-label">Batch</label>
              <q-select v-model="batch" class="q-px-md rounded-borders inputBackground" borderless
                :options="batchOptions" option-label="cycleDesc" option-value="cycleid" />
              <div class="errorMsgBox">
                <span v-if="errors.batch && !topic">{{ errors.batch }}</span>
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
import CryptoJS from 'crypto-js'
import { urls } from "src/pages/dashboard/Urls";

import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";
//import { useCategoryStore } from "src/stores/Categories";
import { useCouseStore} from "src/stores/courses";
export default {
  setup() {
    const profileStore = useProfileStore();
    const { profile, user } = storeToRefs(profileStore);
   // const categoryStore = useCategoryStore();
    const couseStore = useCouseStore();
    const { selectCourse } = couseStore;
    const {courses, topics, batches} = storeToRefs(couseStore);
    couseStore.fetchCourses();
   // const { categories, subCategories } = storeToRefs(categoryStore);
    return {
      user,
      profile,
      courses,
      topics,
      batches,
      selectCourse,
    //  categories,
    //  subCategories
    }
  },
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
    DatePicker
  },
  data() {
    return {
      deleteUrl: urls.getEvents,
      date: '',
      startTime: '',
      endTime: '',
      course: '',
      batch: '',
      topic: '',
      title: '',
      link: '',
      errors: {},
      editedEvent: {}
    }
  },
  computed: {
    courseOptions() {
      var courses = [];
      this.courses.forEach(item => {
          courses.push({"courseName":item.courseDesc,"courseId":item.courseId})
        
      });
      return courses;
    },
    topicOptions() {
      var topics = [];
      this.topics.forEach(item => {
        topics.push(item.topicName)
      });
      return topics;
    },
    batchOptions() {
      var batches = [];
      this.batches.forEach(item => {
        batches.push(item.cycleDesc)
      });
      return batches;
    }
  },
  mounted() {
    let Event = this.$route.query.params;
    if (Event) {
      Event = CryptoJS.AES.decrypt(Event, "params").toString(CryptoJS.enc.Utf8);
      let editedEvent = JSON.parse(Event);
      let startTime = editedEvent.start.split(":");
      let endTime = editedEvent.end.split(":");
      this.date = editedEvent.date;
      this.startTime = { hours: startTime[0], minutes: startTime[1] };
      this.endTime = { hours: endTime[0], minutes: endTime[1] };
      this.course = editedEvent.course;
      this.topic = editedEvent.topic;
      this.title = editedEvent.title;
      this.batch = editedEvent.batch;
      this.link = editedEvent.link;
      this.editedEvent = editedEvent;
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
      const month = new Date(date).toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    },
    validateForm() {
      if (this.date && this.startTime && this.endTime && this.course) {
        this.editedEvent?.id ? this.updateEvent() : this.createEvent();
      } else {
        this.errors = {
          date: "Date is required",
          startTime: "Start Time is required",
          endTime: "End Time is required",
          course: "Course is required",
       
        }
      }
    },
    createEvent() {
      var request = {
        accountId: null,
        course: this.course.courseName,
        topic:this.topic,
        batch:this.batch,
        title: this.course.courseName,
        createdBy: this.user.name,
        lastUpdatedBy: this.user.name,
        date: moment(this.date).format('YYYY-MM-DD'),
        start: `${this.getTwoDigits(this.startTime.hours)}:${this.getTwoDigits(this.startTime.minutes)}`,
        end: `${this.getTwoDigits(this.endTime.hours)}:${this.getTwoDigits(this.endTime.minutes)}`,
        link: 'https://meet.google.com/hvz-zusp-jrv',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      this.$api.post(urls.getEvents, request).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.showMsg(response.data?.message || 'Event Created Successfully', 'positive');
          this.clearData();
          this.$router.go(-1);
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        var message = error.response?.data.message || error.response?.data.message || 'Something went wrong!';
        this.showMsg(message || error.message, 'negative');
      });
    },

    updateEvent() {
      var request = {
        id: this.editedEvent.id,
        accountId: null,
        course: this.course,
        title: this.title,
        createdBy: this.editedEvent.createdBy,
        lastUpdatedBy: this.user.name,
        date: moment(this.date).format('YYYY-MM-DD'),
        start: `${this.getTwoDigits(this.startTime.hours)}:${this.getTwoDigits(this.startTime.minutes)}`,
        end: `${this.getTwoDigits(this.endTime.hours)}:${this.getTwoDigits(this.endTime.minutes)}`,
        link: this.link,
        createdAt: this.editedEvent.createdAt,
        deletedAt: null,
        updatedAt: new Date(),
      }

      this.$api.put(`${urls.getEvents}/${this.editedEvent.id}`, request).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.showMsg(response.data?.message || 'Event Updated Successfully', 'positive');
          this.clearData();
          this.$router.go(-1);
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        var message = error.response?.data.message || error.response?.data.message || 'Something went wrong!';
        this.showMsg(message || error.message, 'negative');
      });
    },

    getTwoDigits(myNumber) {
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
.eventClass .dp__input_focus {
  padding-top: 15px;
  padding-bottom: 15px;
  border: none;
  background: #FCF7F7 !important;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgb(202, 202, 202);
}

.form-label {
  font-weight: bold;
  margin-left: 10px;
}

.time .dp__input {
  border: none;
  padding-top: 15px !important;
  padding-bottom: 15px;
  border-radius: 8px;

  background: #FCF7F7 !important;
}

.datePicker div {
  width: 100%;
}

.eventClass .dp__outer_menu_wrap .dp__menu {
  border-radius: 10px;
}

.inputBackground,
.eventClass .dp__outer_menu_wrap .dp__instance_calendar {
  background: #FCF7F7;
  box-shadow: 0px 0px 5px 0px rgb(202, 202, 202);
  border-radius: 10px;
  border: none;
}
</style>

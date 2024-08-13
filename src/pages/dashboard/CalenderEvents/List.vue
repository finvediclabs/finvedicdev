<template>
  <fin-portlet style="background-color: transparent">
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow><span class="User_heading" >Classrooms</span></fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="{ path: 'class-room/create' }">
          <q-btn label="Add Class" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps />
        </router-link>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="eventsList" select @reCall="getEventsData()" allowDelete :delete-url="deleteUrl"
        @editFun="editDataFun" :loading="loading"  />
    </fin-portlet-item>
  </fin-portlet>
  
  <div class="row">
  <div class="col-6">
    <fin-portlet style="background-color: transparent">
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading"><span class="User_heading" >Courses</span></fin-portlet-heading>
      <fin-portlet-item>
        <!-- <router-link :to="{ path: 'class-room/topics/:courseid' }"> -->
          <q-btn label="Add Course" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
          no-caps @click="openAddCourseDialog" />
          <!-- </router-link> -->
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll" >
      <fin-table :columns="courseheader" :data="courseList" select @reCall="getCoursesData()" allowCourseDelete :delete-url="courseDeleteUrl"
        @editFun="editCourseDataFun" :loading="loading"   showChapters @showChapters="showTopics"/>
    </fin-portlet-item>
  </fin-portlet>
 </div>
  <div class="col-6">
   
    <fin-portlet style="background-color: transparent">
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading"><span class="User_heading" >Batches</span></fin-portlet-heading>
      <fin-portlet-item>
        <!-- <router-link :to="{ path: 'class-room/enrollments/::cycleid' }"> -->
          <q-btn label="Add Batch" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
      no-caps @click="openAddBatchDialog" />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="batchheader" :data="batchList" select @reCall="getBatchesData()" allowDelete :delete-url="batchDeleteUrl"
        @editFun="editDataFun" :loading="loading" showChapters @showChapters="showEnrollments"/>
    </fin-portlet-item>
  </fin-portlet>
  </div>
</div>
<q-dialog v-model="addCourseDialog">
  <fin-portlet style="min-width: 400px; max-width: 600px;">
    <fin-portlet-header bordered>
      <fin-portlet-heading small>Add Course</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="w-100 addCourseDialog">
      <!-- Form fields for adding a new course -->
      <q-form @submit="submitCourseForm" class="formContent" ref="courseForm">
        <!-- Add your form fields here -->
        <q-input
          outlined
          v-model="courseData.courseId"
          label="Course ID"
          :rules="[val => !!val || 'Course ID is required']"
        />
        <q-input
          outlined
          v-model="courseData.abstractt"
          label="Course Description"
          :rules="[val => !!val || 'Course Description is required']"
        />
        <q-input
          outlined
          v-model="courseData.bibilography"
          label="Bibliography"
          :rules="[val => !!val || 'Bibliography is required']"
        />
        <q-input
          outlined
          v-model="courseData.courseDesc"
          label="Description"
          :rules="[val => !!val || 'Description is required']"
        />
        <q-select
          outlined
          v-model="courseData.teachers"
          label="Teacher"
          :options="userOptions"
          option-value="id"
          option-label="displayname"
          :rules="[val => !!val || 'Teacher is required']"
          @input="logSelectedOption"
        />
        <q-select
          outlined
          v-model="courseData.batches"
          label="Batches"
          :options="batchOptions"
          option-value="cycleid"
          option-label="cycleDesc"
          :rules="[val => !!val || 'Batches are required']"
          @input="logSelectedOption"
        />

        <div class="row justify-center">
          <div class="col-12 q-px-sm q-py-xs text-right q-pt-lg">
            <q-btn label="Close" v-close-popup type="reset" color="primary" flat class="q-mr-sm" no-caps />
            <q-btn label="Submit" type="submit" color="primary" :disable="submitLoading" no-caps>
              <q-spinner-ios size="xs" class="q-ml-sm" v-if="submitLoading" />
            </q-btn>
          </div>
        </div>
      </q-form>
    </fin-portlet-item>
  </fin-portlet>
</q-dialog>

  
<q-dialog v-model="addBatchDialog">
  <fin-portlet style="min-width: 400px; max-width: 600px;">
    <fin-portlet-header bordered>
      <fin-portlet-heading small>Add Batch</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="w-100 addBatchDialog">
  <q-form @submit="submitBatchForm" class="formContent" ref="batchForm">
    <q-input
      outlined
      v-model="batchData.batchId"
      label="Batch ID"
      :rules="[val => !!val || 'Batch ID is required']"
    />
    <q-input
      outlined
      v-model="batchData.batchName"
      label="Batch Name"
      :rules="[val => !!val || 'Batch Name is required']"
    />
    <q-input
      outlined
      v-model="batchData.startDate"
      label="Start Date"
      type="date"
      :rules="[val => !!val || 'Start Date is required']"
    />
    <q-input
      outlined
      v-model="batchData.endDate"
      label="End Date"
      type="date"
      :rules="[val => !!val || 'End Date is required']"
    />

    <div class="row justify-center">
      <div class="col-12 q-px-sm q-py-xs text-right q-pt-lg">
        <q-btn label="Close" v-close-popup type="reset" color="primary" flat class="q-mr-sm" no-caps />
        <q-btn label="Submit" type="submit" color="primary" :disable="submitBatchLoading" no-caps>
          <q-spinner-ios size="xs" class="q-ml-sm" v-if="submitBatchLoading" />
        </q-btn>
      </div>
    </div>
  </q-form>
</fin-portlet-item>
  </fin-portlet>
</q-dialog>
</template>
<script>
import FinTable from "src/components/FinTable.vue"
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import axios from 'axios';
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { urls } from "../Urls"
import CryptoJS from 'crypto-js'
export default {
  name: 'lists',
  components: {
    FinTable,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      userOptions: [], 
      batchOptions: [],
      deleteUrl: urls.getEvents,
      courseDeleteUrl:urls.getCourses,
      batchDeleteUrl:urls.getBatches,
      loading:false,
      addCourseDialog: false,
      submitLoading: false,
      courseData: {
        courseId: '',
        abstractt: '',
        bibliography: '',
        courseDesc: '',
        teachers: [],
        batches: [],
        // Add more fields as needed
      },
      addBatchDialog: false,
    submitBatchLoading: false,
    batchData: {
      batchId: '',
      batchName: '',
      startDate: '',
      endDate: '',
      cycleid: '',
      cycleDesc: '',
      cycleStartDate: '',
      cycleEndDate: '',
      cycleStartDateStr: '',
      cycleEndDateStr: '',
      // Add more fields as needed
    },
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Course', key: 'course', align: 'start' },
        { label: 'Topic', key: 'topic', align: 'start' },
        { label: 'Date', key: 'date', align: 'start' },
        { label: 'Start Time', key: 'start', align: 'start' },
        { label: 'End Time', key: 'end', align: 'start' },
      ],
      eventsList: [], 
      courseheader: [
      { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Course Id', key: 'courseId', align: 'start' },
        { label: 'Course Description', key: 'abstractt', align: 'start' },
        { label: 'Bibilography', key: 'bibilography', align: 'start' },
      ],
      courseList: [], 
      batchheader: [
      { label: 'S.No', key: 'index', align: 'center' },
      { label: 'Batch Id', key: 'cycleid', align: 'center' },
        { label: 'Batch Name', key: 'cycleDesc', align: 'start' },
        { label: 'Start Date', key: 'cycleEndDateStr', align: 'start' },
        { label: 'End Date', key: 'cycleStartDateStr', align: 'start' },
      ],
      batchList: [],
    }
  },
  mounted() {
    this.getEventsData();
    
  },
  watch: {
    userOptions: {
      handler(newOptions) {
        // Log the ID and name of each option in userOptions
        newOptions.forEach(option => {
          console.log('Option ID:', option.id);
          console.log('Option Name:', option.name);
        });
      },
      deep: true // Enable deep watch to watch for changes in nested properties
    }
  
  },
  methods: {
    formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  }, 
   logSelectedOption(selectedOptionId) {
      // Find the selected option by ID in userOptions and log its ID and name
      const selectedOption = this.userOptions.find(option => option.id === selectedOptionId);
      if (selectedOption) {
        console.log('Selected Option ID:', selectedOption.id);
        console.log('Selected Option Name:', selectedOption.name);
      }
      else{
        console.log('Selected Option ID:', 'undefined');
      }
    },
  async fetchUserOptions() {
      try {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
          const getUsersUrl = baseUrl + 'api/users/role/3';
        const response = await axios.get(getUsersUrl );
        console.log('Response from user options request:', response);
        if (response.status === 200) {
      this.userOptions = response.data.data.map(user => {
        console.log('User ID:', user.id);
        return {
          id: user.id,
          displayname: user.name + '-' + user.email,
          name: user.name,
          email:user.email,
        };
      });
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Optionally handle the error or show a message to the user
      }
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
    openAddCourseDialog() {
      this.addCourseDialog = true;
      this.fetchUserOptions();
    },
    openAddBatchDialog() {
    
    this.addBatchDialog = true;
  },
  submitBatchForm() {
    console.log('Batch Data Input:', this.batchData);
  this.submitBatchLoading = true;
  

  const startDateArr = this.batchData.startDate.split('-').map(Number);
  const endDateArr = this.batchData.endDate.split('-').map(Number);
  // Prepare the batch data with user-filled fields
  const batchData = {
    cycleid: this.batchData.batchId,
    cycleDesc: this.batchData.batchName,
    startDate: this.batchData.startDate,
    endDate: this.batchData.endDate,
    cycleStartDate: startDateArr,
    cycleEndDate: endDateArr,
    cycleStartDateStr: this.formatDate(this.batchData.startDate),
    cycleEndDateStr: this.formatDate(this.batchData.endDate),
    lastUpdatedBy: "admin",
    // Add more fields as needed
  };
  const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
          const getCyclesUrl = baseUrl + 'api/cycles';
  // Example Axios POST request to add batch
  axios.post(getCyclesUrl, batchData)
    .then(response => {
      this.submitBatchLoading = false;
      if (response.status === 201) {
        // Batch added successfully
        this.showMsg("Batch added successfully.", 'positive');
        this.getBatchesData(); // Refresh batch data list
        this.addBatchDialog = false; // Close the dialog
        // Reset form data if needed
        // this.$refs.batchForm.reset();
      } else {
        // Handle other status codes if needed
        this.showMsg("Failed to add batch.", 'negative');
      }
    })
    .catch(error => {
      this.submitBatchLoading = false;
      // Handle Axios errors
      this.showMsg(error.response?.data.message || error.message, 'negative');
    });
},

    getEventsData() {
      if (!this.loading) {
        this.loading = true;
        this.$api.get(urls.getEvents).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.eventsList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
          this.getCoursesData();
        }).catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
      }
    },
    submitCourseForm() {
      this.submitLoading = true;

      // Prepare the course data with user-filled fields
      const courseData = {
        courseId: this.courseData.courseId,
        abstractt: this.courseData.abstractt,
        bibilography: this.courseData.bibilography,
        courseDesc:this.courseData.courseDesc,
        teachers:[this.courseData.teachers],
        batches: [this.courseData.batches],
        // Add more fields as needed
      };
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
          const getCourseUrl = baseUrl + 'api/courss';
      // Example Axios POST request to add course
      axios.post(getCourseUrl, courseData)
  .then(response => {
    this.submitLoading = false;
    if (response.status === 201) {
      // Course added successfully
      this.showMsg("Course added successfully.", 'positive');
      this.getCoursesData();
      this.addCourseDialog = false; // Close the dialog
      // Reset form data if needed
      // this.$refs.courseForm.reset();
    } else {
      // Handle other status codes if needed
      this.showMsg("Failed to add course.", 'negative');
    }
  })
  .catch(error => {
    this.submitLoading = false;
    // Handle Axios errors
    this.showMsg(error.response?.data.message || error.message, 'negative');
  });
    },
    editDataFun(val) {
      let params = JSON.stringify(val);
      console.log(val);
      this.$router.push({
        path: 'class-room/create',
        query: {
          params: CryptoJS.AES.encrypt(params, "params").toString()
        },
      })
    },
    getCoursesData() {
      if (!this.loading) {
        this.loading = true;
        this.$api.get(urls.getCourses).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.courseList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
          this.getBatchesData();
        }).catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
      }
    },
    editCourseDataFun(val) {
      let params = JSON.stringify(val);
      console.log(val);
      this.$router.push({
        path: 'class-room/create-course',
        query: {
          params: CryptoJS.AES.encrypt(params, "params").toString()
        },
      })
    },
    getBatchesData() {
      if (!this.loading) {
        this.loading = true;
        this.$api.get(urls.getBatches).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.batchList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
            this.batchOptions = this.userOptions = response.data.data.map(item => {
                 // console.log('User ID:', user.id);
                  return {
                    cycleid: item.cycleid,
                    cycleDesc: item.cycleDesc
                  };
                });
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
        }).catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
      }
    },
    editBatchDataFun(val) {
      let params = JSON.stringify(val);
      console.log(val);
      this.$router.push({
        path: 'class-room/create-batch',
        query: {
          params: CryptoJS.AES.encrypt(params, "params").toString()
        },
      })
    },
    showEnrollments(batch) {
      this.$router.push({ path: `class-room/enrollments/${batch.cycleid}` })
    },
    showTopics(course) {
      this.$router.push({ path: `class-room/topics/${course.courseId}` })
    },

  },
}
</script>
<style>
.User_heading{
  color:#5479F7;
  margin-left:4%;
}
</style>
<!--
<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Calender Events</fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="{ path: 'class-room/create' }">
          <q-btn label="Add Class" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps />
        </router-link>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll" style="white-space: nowrap;">
      <fin-table :columns="header" :data="events" @reCall="getEventsData()" allowDelete delete-url="deleteUrl"
        @editFun="editDataFun" :loading="loading" />
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import FinTable from "src/components/FinTable.vue"
// import { inject } from 'vue'
import moment from "moment"
import { urls } from "src/pages/dashboard/Urls";
import CryptoJS from 'crypto-js'
export default {
  name: 'Lists',
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
    FinTable
  },
  data() {
    return {
      deleteUrl: urls.getEvents,
      loading: false,
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Id', key: 'id', align: 'center' },
        { label: 'Title', key: 'title', align: 'start' },
        { label: 'Course', key: 'course', align: 'start' },
        { label: 'Date', key: 'date', align: 'start' },
        { label: 'Start Time', key: 'start', align: 'start' },
        { label: 'End Time', key: 'end', align: 'start' },
      ],
      events: []
    }
  },
  mounted() {
    this.getEventsData();
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
      this.loading = true;
      this.$api.get(urls.getEvents).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.events = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })


      // var events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
      // this.events = events.map((v, i) => ({ ...v, index: i + 1 }));
    },
    editDataFun(val) {
      let params = JSON.stringify(val);
      console.log(val);
      this.$router.push({
        path: 'class-room/create',
        query: {
          params: CryptoJS.AES.encrypt(params, "params").toString()
        },
      })
    }
  }
}
</script>
-->
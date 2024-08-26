<template>
    <fin-portlet>
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading" backArrow>Topic List : {{ courseDesc }}</fin-portlet-heading>
        <fin-portlet-item>
          <q-btn label="Add Topic" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps @click="createTopic()" />
        </fin-portlet-item>
      </fin-portlet-header>
      <fin-portlet-item class="table-scroll">
        <fin-table :columns="header" :data="chaptersList" select @reCall="getChaptersData()" @editFun="editDataFun"
          :loading="loading" allowTopicDelete :delete-url="deleteUrl" />
      </fin-portlet-item>
    </fin-portlet>
    <q-dialog v-model="addTopicDialog">
      <fin-portlet style="min-width: 400px; max-width: 600px;">
  <fin-portlet-header bordered>
    <fin-portlet-heading small>Add Topic</fin-portlet-heading>
  </fin-portlet-header>
  <fin-portlet-item class="w-100 addTopicDialog">
    <!-- Form fields for adding new topic -->
    <q-form @submit="submitTopicForm" class="formContent" ref="topicForm">
      <q-input
        outlined
        v-model="topicData.topicId"
        label="Topic ID"
        :rules="[val => !!val || 'Topic ID is required']"
      />
      <q-input
        outlined
        v-model="topicData.topicName"
        label="Topic Name"
        :rules="[val => !!val || 'Topic Name is required']"
      />
      <!-- Add more form fields as needed -->

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

  <q-dialog v-model="editTopicDialog">
      <fin-portlet style="min-width: 400px; max-width: 600px;">
  <fin-portlet-header bordered>
    <fin-portlet-heading small>Add Topic</fin-portlet-heading>
  </fin-portlet-header>
  <fin-portlet-item class="w-100 addTopicDialog">
    <!-- Form fields for adding new topic -->
    <q-form @submit="submitEditTopicForm" class="formContent" ref="topicForm">
      <q-input
        outlined
        v-model="topicData.topicId"
        label="Topic ID"
        :rules="[topicval => !!topicval || 'Topic ID is required']"
        readonly
      />
      <q-input
        outlined
        v-model="topicData.topicName"
        label="Topic Name"
        :rules="[topicval => !!topicval || 'Topic Name is required']"
      />
      <!-- Add more form fields as needed -->

      <div class="row justify-center">
        <div class="col-12 q-px-sm q-py-xs text-right q-pt-lg">
          <q-btn label="Close" v-close-popup type="reset" color="primary" flat class="q-mr-sm" no-caps />
          <q-btn label="Submit" type="submit" color="primary" :disable="submitEditLoading" no-caps>
            <q-spinner-ios size="xs" class="q-ml-sm" v-if="submitEditLoading" />
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
  import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
  import axios from 'axios';
  import { urls } from "../Urls"
  import CryptoJS from 'crypto-js'
  export default {
    components: {
      FinTable,
      FinPortlet,
      FinPortletHeader,
      FinPortletHeading,
      FinPortletItem,
    },
    data() {
      return {
        deleteUrl: urls.getTopics,
        addTopicDialog: false,
        editTopicDialog: false,
      submitLoading: false,
      submitEditLoading: false,
      courseDesc: '',
      topicData: {
        topicId: '',
        topicName: '',
      },
        header: [
          { label: 'S.No', key: 'index', align: 'center' },
         
          { label: 'Course Id', key: 'courseId', align: 'start', width: '50px' },
          // { label: 'Topic Id', key: 'topicId', align: 'start', width: '50px' },
          { label: 'Topic', key: 'topicName', align: 'start', width: '150px' },
        ],
        chaptersList: [],
        loading: true,
      }
    },
    computed: {
      courseid() {
        return this.$route.params.courseid;
      }
    },
    mounted() {
      this.getChaptersData();
      this.getCoursesData()
    },
    watch: {
      coursed() {
        this.getChaptersData();
        
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
      createTopic() {
      this.addTopicDialog = true;
    },
    async getCoursesData() {
  const courseid = this.$route.params.courseid;
  if (courseid) {
    this.loading = true;
    const url = `${urls.getCourses}/${courseid}`; // Update the URL to include courseid
    try {
      const response = await this.$api.get(url);
      this.loading = false;
      console.log('Response:', response);
      if (response.data.success) {
        // Assuming response.data.data is the course information
        const course = response.data.data;
        this.courseDesc = course.courseDesc; // Set the course description
        this.getChaptersData(); // Call getChaptersData to load chapters for the course
      } else {
        this.showMsg(response.data?.message, 'negative');
      }
    } catch (error) {
      this.loading = false;
      this.showMsg(error.response?.data.message || error.message, 'negative');
    }
  }
},
 async submitEditTopicForm() {
  this.submitEditLoading = true;

  const updatedTopicData = {
    topicId: this.topicData.topicId, // Include topicId if required
    topicName: this.topicData.topicName,
    courseDesc: this.topicData.courseDesc || null,
    createdAt: this.topicData.createdAt || null,
    createdBy: this.topicData.createdBy || null,
    lastUpdatedBy: this.topicData.lastUpdatedBy || null,
    updatedAt: this.topicData.updatedAt || null
  };
  console.log('Updating topic with data:', updatedTopicData);

  try {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const updateTopicUrl = `${baseUrl}api/topics/${this.courseid}/topic/${this.topicData.topicId}`;
    console.log('Update Topic URL:', updateTopicUrl);
    const response = await axios.put(updateTopicUrl, updatedTopicData);


    if (response.status === 200) {
      this.showMsg("Topic updated successfully.", 'positive');
      this.getChaptersData(); // Refresh data after updating topic
      this.editTopicDialog = false; // Close the dialog
    } else {
      this.showMsg("Failed to update topic.", 'negative');
    }
  } catch (error) {
    this.showMsg(error.response?.data.message || error.message, 'negative');
  } finally {
    this.submitEditLoading = false;
  }
},

    async submitTopicForm() {
      this.submitLoading = true;

      // Prepare the topic data with user-filled fields
      const topicData = {
        courseId: this.courseid,
        topicId: this.topicData.topicId,
        topicName: this.topicData.topicName, // Allow user input for topic name
        // Add more fields as needed
      };
      // console.log('Topic Data:', topicData);
      try {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
          const getTopicsUrl = baseUrl + 'api/topics';
        // Example Axios POST request to add topic
        const response = await axios.post(getTopicsUrl, topicData);

        if (response.status === 200) {
          // Topic created successfully
          this.showMsg("Topic added successfully.", 'positive');
          this.getChaptersData(); // Refresh data after adding topic
          this.addTopicDialog = false; // Close the dialog
          // Reset form data if needed
          // this.$refs.topicForm.reset();
        } else {
          // Handle other status codes if needed
          this.showMsg("Failed to add topic.", 'negative');
        }
      } catch (error) {
        // Handle Axios errors
        this.showMsg(error.response?.data.message || error.message, 'negative');
      } finally {
        this.submitLoading = false;
      }
    },
      getChaptersData() {
  const courseId = this.$route.params.courseid;
  if (courseId) {
    this.loading = true;
    const url = `${urls.getTopics}/${courseId}`;
    this.$api.get(url)
      .then(response => {
        this.loading = false;
        if (response.data.success) {
          this.chaptersList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      })
      .catch(error => {
        this.loading = false;
      });
  }
},

      editDataFun(topicval) {
  // Populate topicData with the values of the selected topic
  this.topicData = {
    topicId: topicval.topicId,
    topicName: topicval.topicName,
  };
  
  // Open the edit dialog
  this.editTopicDialog = true;
},
      
    }
  }
  </script>
  
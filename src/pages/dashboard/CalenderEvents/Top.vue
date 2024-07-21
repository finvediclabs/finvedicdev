<template>
    <fin-portlet>
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading" backArrow>Topic List : {{ courseid }}</fin-portlet-heading>
        <fin-portlet-item>
          <q-btn label="Add Topic" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps @click="createTopic()" />
        </fin-portlet-item>
      </fin-portlet-header>
      <fin-portlet-item class="table-scroll">
        <fin-table :columns="header" :data="chaptersList" select @reCall="getChaptersData()" @editFun="editDataFun"
          :loading="loading" allowDelete :delete-url="deleteUrl" />
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
          <q-input outlined v-model="topicData.topicId" label="Topic ID" />
          <q-input outlined v-model="topicData.topicName" label="Topic Name" />
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
        deleteUrl: urls.getEnrollments,
        addTopicDialog: false,
      submitLoading: false,
      topicData: {
        topicId: '',
        topicName: '',
      },
        header: [
          { label: 'S.No', key: 'index', align: 'center' },
         
          { label: 'Course Id', key: 'courseId', align: 'start', width: '50px' },
          { label: 'Topic Id', key: 'topicId', align: 'start', width: '50px' },
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
    async submitTopicForm() {
      this.submitLoading = true;

      // Prepare the topic data with user-filled fields
      const topicData = {
        courseId: this.courseid,
        topicId: this.topicData.topicId,
        topicName: this.topicData.topicName, // Allow user input for topic name
        // Add more fields as needed
      };
      console.log('Topic Data:', topicData);
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

      editDataFun(val) {
        let item = {
          title: val.chapterTitle,
          description: val.description,
          id: val.id,
          cover: val.chapterImagePath,
          file: val.chapterFilePath
        };
      //  this.createFile('Update Enrollment', item);
      },
      
    }
  }
  </script>
  
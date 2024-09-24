<template>
  <div class="row">
    <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;width: 100vw;">
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading" backArrow><span class="User_heading" >Student Assignments</span></fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item class="table-scroll">
        <fin-table :columns="headerStudent" :data="studentAssignmentsList" select @reCall="getStudentAssignmentsData()" allowDelete :delete-url="deleteStudentUrl" :loading="loading" />
      </fin-portlet-item>
    </fin-portlet>
  </div>
<div class="row" >
  <div class="col-6">
    <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading"><span class="User_heading" >Assignments</span></fin-portlet-heading>
        <fin-portlet-item>
  <q-btn @click="createUser()" label="Create Assignment"  dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps/>
        </fin-portlet-item>
      </fin-portlet-header>
      <fin-portlet-item class="table-scroll">
        <fin-table :columns="header" :data="assignments" select @reCall="fetchAssignments()" allowDelete :delete-url="deleteUrl"
          @editFun="editDataFun" :loading="loading" />
      </fin-portlet-item>
    </fin-portlet>
  </div>
  <div class="col-6">

    <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading">
          <span class="User_heading">Batch Assignments</span>
        </fin-portlet-heading>
        <fin-portlet-item>
          <q-btn @click="createBatchAssignment()" label="Create Batch Assignment" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder" no-caps />
        </fin-portlet-item>
      </fin-portlet-header>
      <fin-portlet-item class="table-scroll">
        <fin-table :columns="batchHeader" :data="batchAssignmentsList" select @reCall="fetchBatches()" allowDelete :delete-url="deleteBatchAssignmentUrl"
          @editFun="editDataBatchFun" :loading="loading" />
      </fin-portlet-item>
    </fin-portlet>

  </div>
</div>
    <q-dialog v-model="createBatchDialog">
  <fin-portlet style="min-width: 400px; max-width: 600px;">
    <fin-portlet-header bordered>
      <fin-portlet-heading small>Create Batch Assignment</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="w-100 createBatchDialog">
      <q-form @submit="onBatchSubmit" class="formContent" ref="batchForm">
        <div class="row justify-center">
          <!-- Cycle ID Select -->
          <div class="col-12 q-px-sm q-py-xs">
            <q-select
              filled
              v-model="selectedBatchId"
              :options="batches"
              label="Select Batch *"
              lazy-rules
              :rules="[val => val  || 'Batch is required']"
            />
          </div>

          <!-- Assignment ID Select -->
          <div class="col-12 q-px-sm q-py-xs">
            <q-select
              filled
              v-model="selectedAssignmentId"
              :options="assignments"
              label="Select Assignment *"
              lazy-rules
              :rules="[val => val || 'Assignment is required']"
            />
          </div>

          <!-- Due Date Input -->
          <div class="col-12 q-px-sm q-py-xs">
            <q-input
              filled
              v-model="selectedDueDate"
              type="date"
              label="Select Due Date *"
              lazy-rules
             
            />
          </div>

          <!-- Buttons -->
          <div class="col-12 col-md-6 q-px-sm q-py-xs text-center q-pt-lg"></div>
          <div class="col-12 col-md-6 q-px-sm q-py-xs text-right q-pt-lg">
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
<q-dialog v-model="createUserDialog">
  <fin-portlet style="min-width: 400px; max-width: 600px;">
    <fin-portlet-header bordered>
      <fin-portlet-heading small>Create Assignment</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="w-100 createUserDialog">
      <q-form @submit="onSubmit" class="formContent" ref="form">
        <div class="row justify-center">
          <!-- Title Input -->
          <div class="col-12 q-px-sm q-py-xs">
            <q-input outlined v-model="assignment.title" label="Title *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Title is required']" />
          </div>
          
          <!-- Description Input -->
          <div class="col-12 q-px-sm q-py-xs">
            <q-input outlined v-model="assignment.description" label="Description *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Description is required']" />
          </div>
          
          <!-- Due Date Input -->
          <div class="col-12 q-px-sm q-py-xs">
            <q-input outlined v-model="assignment.dueDate" type="date" label="Due Date *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Due Date is required']" />
          </div>
          
          <!-- Max Marks Input -->
          <div class="col-12 q-px-sm q-py-xs">
            <q-input outlined v-model="assignment.maxMarks" type="number" label="Max Marks *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Max Marks are required']" />
          </div>
          
          <!-- Files Input -->
          <div class="col-12 q-px-sm q-py-xs">
            <q-uploader
              ref="educationCertificateUploader"
              label="Upload Question"
              accept=".jpg,.png"
              style="width: 100%;"
              @uploaded="onFileUploaded"
            />
          </div>
          
          <!-- Course Input -->
          <div class="col-12 q-px-sm q-py-xs">
            <q-select
              outlined
              v-model="assignment.course"
              :options="courseOptions"
              label="Course *"
              lazy-rules
              :rules="[val => val || 'Course is required']"
            />
          </div>
          
          <!-- Buttons -->
          <div class="col-12 col-md-6 q-px-sm q-py-xs text-center q-pt-lg"></div>
          <div class="col-12 col-md-6 q-px-sm q-py-xs text-right q-pt-lg">
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
  import { urls } from "src/pages/dashboard/Urls";
  import { useSessionStore } from "src/stores/session";
  import axios from 'axios';
  import moment from "moment"
  import { useProfileStore } from "src/stores/profile";
  import { storeToRefs } from "pinia";
  
  
  export default {
    components: {
      FinTable,
      FinPortlet,
      FinPortletHeader,
      FinPortletHeading,
      FinPortletItem
    },
    data() {
      return {
        deleteStudentUrl: urls.studentAssignmentsUrl,
        deleteUrl: urls.assignmentsUrl,
        deleteBatchAssignmentUrl: urls.batchAssignmentUrl,
        loading: true,
        createUserDialog: false,
        isPwd: true,
        assignments: [], // For storing assignment options
    batches: [], // For storing batch options
    selectedAssignmentId: null, // For selected assignment
    selectedBatchId: null, // For selected batch
        header: [
  { label: 'S.No', key: 'index', align: 'center' },
  { label: 'Title', key: 'label', align: 'start' },
  { label: 'Description', key: 'desc', align: 'start' },
  { label: 'Max Marks', key: 'maxMarks', align: 'center' },
  { label: 'Course', key: 'course', align: 'start' },
],
headerStudent: [
  { label: 'S.No', key: 'index', align: 'center' },
  { label: 'Assignment Title', key: 'assignmentTitle', align: 'start' },
  { label: 'Batch Title', key: 'batchTitle', align: 'start' },
  { label: 'Student Name', key: 'studentName', align: 'start' },
  // { label: 'Submitted File', key: 'submittedFile', align: 'start' },
  { label: 'Created Date', key: 'createdDate', align: 'center' },
  { label: 'Verified', key: 'isVerified', align: 'center' },
],
batchHeader: [
  { label: 'S.No', key: 'index', align: 'center' },
  { label: 'Batch Name', key: 'batchName', align: 'start' },
  { label: 'Assignment Title', key: 'assignmentTitle', align: 'start' },
  { label: 'Max Marks', key: 'maxMarks', align: 'center' },
  // { label: 'File', key: 'file', align: 'center' },
],
    batchAssignmentsList: [],
        assignmentsList: [],
        studentAssignmentsList:[],
        createBatchDialog: false,
      submitLoading: false,
      submitBatchLoading: false,
        assignment: {
            title: '',
            description: '',
            dueDate: null,
            maxMarks: 0,
            fileUri: '' ,
            course: '',
        },
        batchAssignment: {
        cycleId: '',
        assignmentId: '',
        dueDate:'',
        courseOptions: [],
      },
      }
    },
    mounted() {
      this.getBatchAssignmentsData();
      this.getStudentAssignmentsData();
      this.fetchBatches(); 
      this.fetchCourseOptions();
      this.fetchAssignments();
      const labels = document.querySelectorAll('.q-field__label');
  
      labels.forEach(label => {
        if (label.textContent.trim() === 'Programs') {
          label.style.color = 'white';
        }
      });
    },
    methods: {
      async uploadFile(file) {
  this.loading = true;
  try {
    // Check if the file type is PDF
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PDF files are allowed.');
    }

    // Proceed with uploading the file if validation passes
    const formData = new FormData();
    formData.append('file', file);

    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const getFileUrl = baseUrl + 'fs/upload-file';

    const response = await fetch(getFileUrl, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'File upload failed');
    }

    const filePath = data.uri;
    console.log('File uploaded:', filePath);
    return filePath; // Return the file path
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  } finally {
    this.loading = false; // Ensure loading is set to false after completion
  }
},
      createUser() {
        this.user = {};
        this.createUserDialog = true;
      },
      async fetchCourseOptions() {
  try {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const getCourss = baseUrl + 'api/courss';
    const response = await axios.get(getCourss);
    const courses = response.data.data; // Access the 'data' property of the response

    console.log('API Response Data:', courses); // Log the raw data received from the API

    // Create a map of courseId to courseDesc
    this.courseMap = courses.reduce((map, course) => {
      map[course.courseId] = course.courseDesc;
      return map;
    }, {});

    // Format options for q-select
    this.courseOptions = courses.map(course => ({
      label: course.courseDesc,
      value: course.courseId // Use courseId for the value
    }));

    console.log('Formatted Course Options:', this.courseOptions); // Log the formatted options
  } catch (error) {
    console.error('Error fetching course options:', error);
  }
},
async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const uploadFile = baseUrl + 'fs/assignments/upload-file';
      const response = await this.$api.post(uploadFile, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.uri; // Assuming the URI is returned in `data.uri`
    } catch (error) {
      this.showMsg(error.response?.data.message || error.message, 'negative');
      throw error; // Rethrow the error to handle it in the main method
    }
  },

  async createNewUser() {
    this.submitLoading = true;

    try {
      // Upload file and get URI
      let fileUri = '';
      if (this.$refs.educationCertificateUploader.files.length > 0) {
        const file = this.$refs.educationCertificateUploader.files[0];
        fileUri = await this.uploadFile(file);
      }

      // Get courseDesc from the courseId using courseMap
      const courseDesc = this.courseMap[this.assignment.course] || this.assignment.course;

      // Prepare request data
      const request = {
        title: this.assignment.title,
        description: this.assignment.description,
        dueDate: new Date(this.assignment.dueDate).getTime(), // Ensure the dueDate is in milliseconds
        maxMarks: this.assignment.maxMarks,
        files: fileUri, // Use the file URI
        course: courseDesc.label, // Use courseDesc
      };

      console.log("request", request);

      // Send assignment data
      const response = await this.$api.post(urls.assignmentsUrl, request);
      this.submitLoading = false;
      
      if (response.data.success) {
        this.showMsg(response.data?.message || 'New Assignment created', 'positive');
        this.fetchAssignments();
        this.closeCreateUserDialog();
      } else {
        this.showMsg(response.data?.message, 'negative');
      }
    } catch (error) {
      this.submitLoading = false;
      // Handle errors during file upload or request
      this.showMsg(error.response?.data.message || error.message, 'negative');
    }
  },

      createBatchAssignment() {
      this.batchAssignment = {};
      this.createBatchDialog = true;
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
      fetchBatches() {
  this.loading = true;
  const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
  const getcycles = baseUrl + 'api/cycles';
  this.$api.get(getcycles)
    .then(response => {
      this.loading = false;
      console.log('API Response:', response);

      if (response.data && response.data.data) {
        this.batches = response.data.data.map(cycle => ({
          label: cycle.cycleDesc, // Display name in the select dropdown
          value: cycle.cycleid // Value to be used in the select
        }));
      } else {
        this.showMsg('No data received from the server', 'negative');
      }
    })
    .catch(error => {
      this.loading = false;
      console.error('API Error:', error);
      this.showMsg(error.response?.data.message || error.message, 'negative');
    });
},

  fetchAssignments() {
    this.loading = true;
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const getAssignmentsUrl = baseUrl + 'api/assignments';
    this.$api.get(getAssignmentsUrl) // Adjust URL if needed
      .then(response => {
        this.loading = false;
        console.log('API Response:', response);
        if (response.data && Array.isArray(response.data.data)) {
          this.assignments = response.data.data.map((assignment,index) => ({
            index:index+1,
            label: assignment.title, // Display name in the select dropdown
            id: assignment.id,
            desc:assignment.description, 
            maxMarks: assignment.maxMarks,
            files:assignment.files,
            course:assignment.course
          }));
        } else {
          this.showMsg('No data received from the server', 'negative');
        }
      })
      .catch(error => {
        this.loading = false;
        console.error('API Error:', error);
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
  },
  getStudentAssignmentsData() {
  this.loading = true;
  const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
  const getStudentAssignmentsUrl = baseUrl + 'api/student-assignments';

  this.$api.get(getStudentAssignmentsUrl).then(response => {
    this.loading = false;

    console.log('API Response:', response);  // Log the entire response

    if (response.data && Array.isArray(response.data.data)) {
      console.log('Assignment Data:', response.data.data);

      this.studentAssignmentsList = response.data.data.map((item, index) => ({
        index: index + 1,
        id: item.id,
        assignmentId: item.assignmentId,
        assignmentTitle: item.assignmentTitle,
        batchId: item.batchId,
        batchTitle: item.batchTitle,
        studentId: item.studentId,
        studentName: item.studentName,
        submittedFile: item.submittedFile || 'No File',
        createdDate: moment(item.createdDate).format('YYYY-MM-DD'),
        isVerified: item.isVerified
      }));

      console.log('Processed Assignments List:', this.studentAssignmentsList);
    } else {
      this.showMsg('No valid data received from the server', 'negative');
    }
  }).catch(error => {
    this.loading = false;
    this.showMsg(error.response?.data.message || error.message, 'negative');
  });
},



getBatchAssignmentsData() {
  this.loading = true;
  const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
  const getBatchAssignmentsUrl = baseUrl + 'api/batch-assignments';
  this.$api.get(getBatchAssignmentsUrl).then(response => {
    this.loading = false;
    if (response.data && Array.isArray(response.data.data)) {
      this.batchAssignmentsList = response.data.data.map((item, index) => ({
        index: index + 1,
        id: item.id,
        batchId: item.batchId || 'N/A',
        batchName: item.batchName || 'N/A',
        assignmentId: item.assignmentId || 'N/A',
        assignmentTitle: item.assignmentTitle || 'N/A',
        dueDate: moment(item.dueDate).format('YYYY-MM-DD') || 'N/A',
        maxMarks: item.maxMarks || 'N/A',
        file: item.file || 'No File',
      }));
    } else {
      this.showMsg('No valid data received from the server', 'negative');
    }
  }).catch(error => {
    this.loading = false;
    this.showMsg(error.response?.data.message || error.message, 'negative');
  });
},
      onSubmit() {
        if (!this.submitLoading) {
          if (this.assignment.id) {
            this.updateUser();
          } else {
            this.createNewUser();
          }
        }
      },
      onBatchSubmit() {
        console.log('Selected Batch ID:', this.selectedBatchId);
      console.log('Selected Assignment ID:', this.selectedAssignmentId);
      console.log('Selected Due Date:', this.selectedDueDate);
        if (!this.submitLoading) {
          if (this.batchAssignment.id) {
            this.updateBatchAssignment();
          } else {
            this.createNewBatchAssignment();
          }
        }
    },
   
      updateUser() {
        this.submitLoading = true;
    let request = {
        title: this.assignment.title,
        description: this.assignment.description,
        dueDate: new Date(this.assignment.dueDate).getTime(), // Ensure the dueDate is in milliseconds
        maxMarks: this.assignment.maxMarks,
        files: this.assignment.files,
        course: this.assignment.course,
    };
    this.$api.put(`${urls.assignmentsUrl}/${this.assignment.id}`, request).then(response => {
        this.submitLoading = false;
        if (response.data.success) {
            this.showMsg(response.data?.message, 'positive');
            this.fetchAssignments();
            this.closeCreateUserDialog();
        } else {
            this.showMsg(response.data?.message, 'negative');
        }
    }).catch(error => {
        this.submitLoading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
    });
      },
      closeCreateUserDialog() {
        this.createUserDialog = false;
        this.$refs.form.reset();
      },
      createNewBatchAssignment() {
  console.log('Selected Assignment:', this.selectedAssignmentId);
  console.log('Selected Batch:', this.selectedBatchId);
  console.log('Due Date:', this.selectedDueDate);

  if (!this.selectedAssignmentId || !this.selectedBatchId || !this.selectedDueDate) {
    this.showMsg('Please fill in all required fields.', 'negative');
    return;
  }

  const selectedAssignmentDetails = this.assignments.find(assignment => assignment.id === this.selectedAssignmentId.id);
  const selectedBatchDetails = this.batches.find(batch => batch.value === this.selectedBatchId.value);

  const newBatchAssignment = {
    batchId: selectedBatchDetails.value,
    batchName: selectedBatchDetails.label,
    assignmentId: this.selectedAssignmentId.id,
    assignmentTitle: selectedAssignmentDetails.label,
    assignmentDesc: selectedAssignmentDetails.desc,
    dueDate: this.selectedDueDate,
    maxMarks: selectedAssignmentDetails.maxMarks,
    file:selectedAssignmentDetails.files
  };

  console.log('New Batch Assignment:', newBatchAssignment);

  // Perform your API call or other actions to save the new batch assignment
  this.$api.post('/api/batch-assignments', newBatchAssignment)
    .then(response => {
      console.log('API Response:', response);
      this.showMsg('Batch assignment created successfully', 'positive');
      this.getBatchAssignmentsData();
            this.closeCreateBatchDialog();
    })
    .catch(error => {
      console.error('API Error:', error);
      this.showMsg(error.response?.data.message || error.message, 'negative');
    });
},


  // Update method
  updateBatchAssignment() {
  this.submitBatchLoading = true;
  
  let request = {
    cycleId: this.batchAssignment.cycleId,
    assignmentId: this.batchAssignment.assignmentId
  };
  const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
  const batchEventsUrl = `${baseUrl}api/batch-assignments/${this.batchAssignment.id}`;

  // Use the constructed URL for the PUT request
  this.$api.put(batchEventsUrl, request)
    .then(response => {
      this.submitBatchLoading = false;
      if (response.data.success) {
        this.showMsg(response.data?.message || 'Batch Assignment updated successfully', 'positive');
        this.getBatchAssignmentsData();
        this.closeCreateBatchDialog();
      } else {
        this.showMsg(response.data?.message, 'negative');
      }
    })
    .catch(error => {
      this.submitBatchLoading = false;
      this.showMsg(error.response?.data.message || error.message, 'negative');
    });
},

  // Helper method to close the dialog
  closeCreateBatchDialog() {
    this.createBatchDialog = false;
    this.$refs.batchForm.reset();
  },
      editDataFun(val) {
        this.assignment = {
          title: val.title,
          description: val.description,
          dueDate: val.dueDate,
          Number: val.phoneNumber,
          maxMarks: val.maxMarks,
          files: val.files,
          course: val.course,
          id: val.id,
        };
        this.createUserDialog = true;
      },
      editDataBatchFun(vals) {
        this.batchAssignment = {
          id: vals.id,
          cycleId: vals.cycleId,
          assignmentId: vals.assignmentId
          
        };
        this.createBatchDialog = true;
      }
    }
  }
  </script>
  <style>
  .createUserDialog {
    background-image: url("../../../assets/users.png");
    background-repeat: no-repeat;
    /* background-origin: content-box; */
    background-position: center;
    background-size: 100% 100%;
  }
  .User_heading{
    color:#5479F7;
    margin-left:4%;
  }
  .formContent {
    background: #ffffff;
    opacity: 0.9;
  }
  .role_search{
    background-color:#ffff;
    border-radius:4px;
  }
  .program_search{
    background-color:#5479F7;
    /* color:white !important; */
    border-radius:4px;
  }
  .q-btn:before{
    box-shadow: none !important;
  }
  </style>
  src/pages/dashboard/Urls
  
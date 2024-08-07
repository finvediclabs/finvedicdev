<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Enrollments {{ cycleId }}</fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Add" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
          no-caps @click="createEnrollment()" />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="chaptersList" select @reCall="getChaptersData()" @editFun="editDataFun"
        :loading="loading" allowDelete :delete-url="deleteUrl" />
    </fin-portlet-item>
  </fin-portlet>

  <!-- Add Enrollment Dialog -->
  <q-dialog v-model="addEnrollmentDialog">
  <fin-portlet style="min-width: 400px; max-width: 600px;">
    <fin-portlet-header bordered>
      <fin-portlet-heading small>Add Enrollment</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="w-100 addEnrollmentDialog">
      <!-- Form fields for adding new enrollment -->
      <q-form @submit="submitEnrollmentForm" class="formContent" ref="enrollmentForm">

        <q-select
          outlined
          v-model="enrollmentData.studentId"
          label="Student"
          :options="userOptions"
          option-value="id" 
          option-label="displayname"
          @input="logSelectedOption"
        />
        <q-input outlined v-model="enrollmentData.enrollmentDateStr" label="Enrollment Date (MM/DD/YYYY)" />
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
import FinTable from "src/components/FinTable.vue";
import axios from 'axios';
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { urls } from "../Urls";
import CryptoJS from 'crypto-js';

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
      userOptions: [], 
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Batch Id', key: 'cycleid', align: 'start', width: '50px' },
        { label: 'Student Name', key: 'username', align: 'start', width: '50px' },
        { label: 'Student', key: 'studentId', align: 'start', width: '150px' },
        { label: 'Enrollment Date', key: 'enrollmentDateStr', align: 'start', width: '150px' },
      ],
      chaptersList: [],
      loading: true,
      addEnrollmentDialog: false,
      submitLoading: false,
      enrollmentData: {
      courseId: '', // Allow user input for courseId
      cycleid: '', // Allow user input for cycleid
      studentId: null, // Allow user input for studentId
      username: '', // Allow user input for username
      enrollmentDateStr: '', // Allow user input for enrollmentDateStr
      // You can remove createdAt, lastUpdatedBy, and updatedAt from here since they are not user inputs
    },
    }
  },
  computed: {
    cycleId() {
      return this.$route.params.cycleid;
    }
  },
  mounted() {
    this.getChaptersData();
  },
  watch: {
    userOptions: {
      handler(newOptions) {
        // Log the ID and name of each option in userOptions
        newOptions.forEach(option => {
          // console.log('Option ID:', option.id);
          // console.log('Option Name:', option.name);
        });
      },
      deep: true // Enable deep watch to watch for changes in nested properties
    },
    cycleId() {
      this.getChaptersData();
    }
  },
  methods: {
    logSelectedOption(selectedOptionId) {
      // Find the selected option by ID in userOptions and log its ID and name
      const selectedOption = this.userOptions.find(option => option.id === selectedOptionId);
      if (selectedOption) {
        // console.log('Selected Option ID:', selectedOption.id);
        // console.log('Selected Option Name:', selectedOption.name);
      }
      else{
        // console.log('Selected Option ID:', 'undefined');
      }
    },
    async fetchUserOptions() {
      try {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
          const getUsersUrl = baseUrl + 'api/users';
        const response = await axios.get(getUsersUrl );
        // console.log('Response from user options request:', response);
        if (response.status === 200) {
      this.userOptions = response.data.data.map(user => {
        // console.log('User ID:', user.id);
        return {
          id: user.id,
          displayname: user.name + '-' + user.email,
          name: user.name
        };
      });
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        // console.error('Error fetching user data:', error);
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
    getChaptersData() {
      const cycleid = this.$route.params.cycleid;
      if(cycleid){
        this.loading = true;
        const url =  `${urls. getEnrollments}/${cycleid}`
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
//   }
      }
    },
    createEnrollment() {
      this.addEnrollmentDialog = true;
      this.fetchUserOptions();
    },
    async submitEnrollmentForm() {
  this.submitLoading = true;

  // Parse enrollment date string
  let enrollmentDate;
  try {
    // Split the date string into parts (MM/DD/YYYY)
    const [month, day, year] = this.enrollmentData.enrollmentDateStr.split('/');
    // Create a new Date object from the parsed parts
    enrollmentDate = new Date(`${year}-${month}-${day}`);
    // Check if the parsed date is valid
    if (isNaN(enrollmentDate.getTime())) {
      throw new Error('Invalid enrollment date');
    }
  } catch (error) {
    this.showMsg('Invalid enrollment date format. Please enter date in MM/DD/YYYY format.', 'negative');
    this.submitLoading = false;
    return;
  }

  // Check if a valid student option is selected
  if (!this.enrollmentData.studentId || !this.enrollmentData.studentId.id) {
    this.showMsg('Invalid student selected.', 'negative');
    this.submitLoading = false;
    return;
  }

  // Prepare the enrollment data with user-filled fields
  const enrollmentData = {
    courseId: this.cycleId,
    cycleid: this.cycleId,
    studentId: this.enrollmentData.studentId.id, // Use the selected option's ID as studentId
    username: this.enrollmentData.studentId.name, // Use the selected option's name as username
    enrollmentDate: [enrollmentDate.getFullYear(), enrollmentDate.getMonth() + 1, enrollmentDate.getDate()],
    enrollmentDateStr: this.enrollmentData.enrollmentDateStr, // Include enrollmentDateStr here
    lastUpdatedBy: 'admin', // Assuming this value is fixed or calculated
    createdAt: [enrollmentDate.getFullYear(), enrollmentDate.getMonth() + 1, enrollmentDate.getDate()],
    createdBy: 'admin', // Assuming this value is fixed or calculated
    updatedAt: [enrollmentDate.getFullYear(), enrollmentDate.getMonth() + 1, enrollmentDate.getDate()],
  };

  try {
    // Example Axios POST request to add enrollment
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
          const getEnrollmentsUrl = baseUrl + 'api/enrollments';
    const response = await axios.post(getEnrollmentsUrl, enrollmentData);

    if (response.status === 201) {
      // Enrollment created successfully
      this.showMsg('Enrollment added successfully.', 'positive');
      this.getChaptersData(); // Refresh data after adding enrollment
      this.addEnrollmentDialog = false; // Close the dialog
      // Reset form data if needed
      // this.$refs.enrollmentForm.reset();
    } else {
      // Handle other status codes if needed
      this.showMsg('Failed to add enrollment.', 'negative');
    }
  } catch (error) {
    // Handle Axios errors
    this.showMsg(error.response?.data.message || error.message, 'negative');
  } finally {
    this.submitLoading = false;
  }
},


    editDataFun(val) {
      // Prepare data for editing
      this.enrollmentData = {
        cycleid: val.cycleid,
        username: val.username,
        enrollmentDateStr: val.enrollmentDateStr,
      };
      // Open the dialog for editing
      this.addEnrollmentDialog = true;
    },
    updateEnrollment() {
      // Handle form submission for updating enrollment
      this.submitLoading = true;
      // Example API call to update enrollment
      this.$api.put(urls.getEnrollments + `/${this.enrollmentData.cycleid}`, this.enrollmentData)
        .then(response => {
          this.submitLoading = false;
          if (response.data.success) {
            this.showMsg(response.data?.message || 'Enrollment updated successfully.', 'positive');
            this.getChaptersData();
            this.addEnrollmentDialog = false;
            // Reset form data
            this.$refs.enrollmentForm.reset();
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
        })
        .catch(error => {
          this.submitLoading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
    },
  }
}
</script>

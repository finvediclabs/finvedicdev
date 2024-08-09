<template>
    <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading" backArrow>
          <span class="User_heading">Registered Students</span>
        </fin-portlet-heading>
        <fin-portlet-item>
          <q-btn @click="openDialog">
            <q-img :src="usersIcon" alt="User Icon" style="width: 32px; height: 32px;" />
          </q-btn>
        </fin-portlet-item>
      </fin-portlet-header>
      <div class="container">
        <!-- Table for displaying students -->
        <q-table
          :rows="students"
          :columns="columns"
          row-key="id"
          class="q-mb-md"
          @row-click="showStudentDetails"
          :pagination.sync="pagination"
        />
  
        <!-- Dialog for student enrollment -->
        <q-dialog v-model="dialog">
          <q-card style="width:90%">
            <q-card-section>
                <fin-portlet-heading>
                <p class="User_heading">Student Details</p>
              </fin-portlet-heading>
              <q-form @submit.prevent="enrollStudent" class="q-gutter-md">
                <div class="row">
                    <div class="col-4">
                <q-input
                  v-model="newStudent.fullName"
                  label="Full Name"
                  required
                />
                    </div>
                    <div class="col-4">
                <q-input
                  v-model="newStudent.email"
                  label="Email"
                  type="email"
                  required
                />
                    </div>
                    <div class="col-4">
                <q-input
                  v-model="newStudent.contactNumber"
                  label="Contact Number"
                  required
                />
            </div>
                </div>
                <div class="row">
                    <div class="col-4"> 
                <q-input
                  v-model="newStudent.cgpa"
                  label="CGPA"
                  type="number"
                  required
                />
            </div>
            <div class="col-4">
                <q-input
                  v-model="newStudent.education"
                  label="Education"
                  required
                />
                </div>
                <div class="col-4">
                <q-input
                  v-model="newStudent.codingPlatform"
                  label="Coding Platform"
                  required
                />
                </div>
            </div>
            <fin-portlet-heading>
                <p class="User_heading">Documents</p>
              </fin-portlet-heading>
            <div class="row">
                <div class="col-4"> 
                <q-input
                  v-model="newStudent.resume"
                  label="Resume"
                  required
                />
                </div>
                <div class="col-4"> 
                <q-input
                  v-model="newStudent.identityDocument"
                  label="Identity Document"
                  required
                />
                </div>
                <div class="col-4"> 
                <q-input
                  v-model="newStudent.scholarship"
                  label="Scholarship"
                  required
                />
                </div>
                </div>
                <fin-portlet-heading>
                <p class="User_heading">Batch Details</p>
              </fin-portlet-heading>
                <div class="row">
                    <div class="col-4"> 
                <q-input
                  v-model="newStudent.batchId"
                  label="Batch Id"
                  required
                />
                    </div>
                    <div class="col-4"> 
                <q-input
                  v-model="newStudent.batchName"
                  label="Batch Name"
                  required
                />
                    </div>
                    <div class="col-4"> 
                <q-input
                  v-model="newStudent.startDate"
                  label="Start Date"
                  type="date"
                  required
                />
                </div>
            </div>
                <q-btn type="submit" color="primary" label="Submit" />
                <q-btn @click="dialog = false" color="secondary" label="Cancel" flat />
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
  
        <!-- Dialog for showing student details -->
        <q-dialog v-model="detailsDialog">
          <q-card style="width:90%">
            <q-card-section>
              <fin-portlet-heading>
                <p class="User_heading">Student Details</p>
              </fin-portlet-heading>
              <q-form class="q-gutter-md">
                <div class="row">
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.fullName"
                      label="Full Name"
                      readonly
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.email"
                      label="Email"
                      readonly
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.contactNumber"
                      label="Contact Number"
                      readonly
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.cgpa"
                      label="CGPA"
                      readonly
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.education"
                      label="Education"
                      readonly
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.codingPlatform"
                      label="Coding Platform"
                      readonly
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.resume"
                      label="Resume"
                      readonly
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.identityDocument"
                      label="Identity Document"
                      readonly
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.scholarship"
                      label="Scholarship"
                      readonly
                    />
                  </div>
                </div>
                <fin-portlet-heading>
                <p class="User_heading">Batch Details</p>
              </fin-portlet-heading>
                <div class="row">
                    
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.batchId"
                      label="Batch Id"
                      readonly
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.batchName"
                      label="Batch Name"
                      readonly
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      v-model="selectedStudent.startDate"
                      label="Start Date"
                      readonly
                    />
                  </div>
                </div>
                <q-btn @click="detailsDialog = false" color="secondary" label="Close" flat />
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </fin-portlet>
  </template>
  
  <script>
  import axios from 'axios';
  import FinPortlet from "src/components/Portlets/FinPortlet.vue";
  import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
  import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
  import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
  import usersIcon from "../../../../src/assets/user.png";
  
  export default {
    data() {
      return {
        dialog: false,
        detailsDialog: false,
        newStudent: {
          fullName: '',
          email: '',
          contactNumber: '',
          cgpa: '',
          education: '',
          codingPlatform: '',
          resume: '',
          identityDocument: '',
          scholarship: '',
          batchId: '',
          batchName: '',
          startDate: '',
        },
        usersIcon: usersIcon,
        students: [],
        selectedStudent: {},
        columns: [
          { name: 'id', label: 'Student Id', align: 'left', field: row => row.id },
          { name: 'fullName', label: 'Name', align: 'left', field: row => row.fullName },
          { name: 'email', label: 'Email', align: 'left', field: row => row.email },
          { name: 'education', label: 'Course', align: 'left', field: row => row.education },
        ],
        pagination: {
          rowsPerPage: 5,
          page: 1,
        },
      };
    },
    components: {
      FinPortlet,
      FinPortletHeader,
      FinPortletHeading,
      FinPortletItem
    },
    created() {
      this.fetchStudents();
    },
    methods: {
      async fetchStudents() {
        try {
          const response = await axios.get('http://localhost:8087/api/registered-students');
          if (response.data.success) {
            this.students = response.data.data;
          }
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      },
      openDialog() {
        this.dialog = true;
      },
      async showStudentDetails(event, row) {
        console.log('Selected Row:', row); // Log the entire row object
        console.log('Selected Student ID:', row.id); // Check if id is present
  
        if (row.id !== undefined) {
          try {
            const response = await axios.get(`http://localhost:8087/api/registered-students/${row.id}`);
            if (response.data.success) {
              this.selectedStudent = response.data.data;
              this.detailsDialog = true;
            }
          } catch (error) {
            console.error('Error fetching student details:', error);
          }
        } else {
          console.error('Student ID is undefined');
        }
      },
      async enrollStudent() {
  // Check if all required fields are filled
  const isValid = this.newStudent.fullName &&
    this.newStudent.email &&
    this.newStudent.contactNumber &&
    this.newStudent.cgpa &&
    this.newStudent.education &&
    this.newStudent.codingPlatform &&
    this.newStudent.resume &&
    this.newStudent.identityDocument &&
    this.newStudent.scholarship &&
    this.newStudent.batchId &&
    this.newStudent.batchName &&
    this.newStudent.startDate;

  if (isValid) {
    try {
      // Convert date to string format
      const startDateStr = new Date(this.newStudent.startDate).toISOString().split('T')[0]; // Format YYYY-MM-DD

      // POST request to create a new student
      const response = await axios.post('http://localhost:8087/api/registered-students', {
        fullName: this.newStudent.fullName,
        contactNumber: this.newStudent.contactNumber,
        email: this.newStudent.email,
        cgpa: parseFloat(this.newStudent.cgpa), // Ensure CGPA is a number
        education: this.newStudent.education,
        codingPlatform: this.newStudent.codingPlatform,
        resume: this.newStudent.resume,
        identityDocument: this.newStudent.identityDocument,
        scholarship: this.newStudent.scholarship,
        batchId: parseInt(this.newStudent.batchId), // Ensure batchId is an integer
        batchName: this.newStudent.batchName,
        startDate: startDateStr, // Use the formatted date string
      });

      // Check if the request was successful
      if (response.data.success) {
        // Assuming the API response contains the newly created student data
        const newStudent = response.data.data;

        // Add the new student to the students array
        this.students.push(newStudent);
        
        // Clear the form
        this.newStudent = {
          fullName: '',
          email: '',
          contactNumber: '',
          cgpa: '',
          education: '',
          codingPlatform: '',
          resume: '',
          identityDocument: '',
          scholarship: '',
          batchId: '',
          batchName: '',
          startDate: '',
        };
        
        // Close the enrollment dialog
        this.dialog = false;
      } else {
        // Handle any errors returned by the server
        console.error('Error enrolling student:', response.data.message);
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error enrolling student:', error);
    }
  } else {
    // Handle validation errors
    console.error('Please fill in all required fields');
  }
}

}
  };
  </script>
  
  <style scoped>
  .container {
    /* max-width: 800px; */
    margin: 0 auto;
    padding: 20px;
  }
  
  .User_heading {
    color: #5479F7;
    margin-left: 4%;
  }
  </style>
  
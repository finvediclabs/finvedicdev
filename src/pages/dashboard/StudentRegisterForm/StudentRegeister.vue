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
          <div class="col-6">
            <q-uploader
              ref="resumeUploader"
              label="Upload Resume"
              accept=".pdf"
              style="width: 100%;"
            />
          </div>
          <div class="col-6">
            <q-uploader
              ref="identityUploader"
              label="Upload Identity Document"
              accept=".pdf"
              style="width: 100%;"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <q-uploader
              ref="scholarshipUploader"
              label="Upload Scholarship"
              accept=".pdf"
              style="width: 100%;"
            />
          </div>
          <div class="col-6">
            <q-uploader
              ref="educationCertificateUploader"
              label="Upload Education Certificate"
              accept=".pdf"
              style="width: 100%;"
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
        <fin-portlet-heading>
          <p class="User_heading">Payments</p>
        </fin-portlet-heading>
        <div class="row">
          <div class="col-6">
            <q-input
              v-model="newStudent.paymentAmount"
              label="Payment Amount"
              type="number"
              required
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="newStudent.paymentDate"
              label="Payment Date"
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
          <div class="col-12">
              <fin-portlet-heading>
                <p class="User_heading">Payments</p>
              </fin-portlet-heading>
              <ul>
                <li v-for="payment in selectedStudent.payments" :key="payment.paymentDate">
                  Amount: {{ payment.amount }} | Date: {{ payment.paymentDate }}
                </li>
              </ul>
            </div>
          <fin-portlet-heading>
            <p class="User_heading">Documents</p>
          </fin-portlet-heading>
          <div class="row">
            <div class="col-6">
              <q-btn @click="downloadPdf(selectedStudent.resume, `${selectedStudent.fullName} Resume.pdf`)" color="primary" label="Download Resume" />
            </div>
            <div class="col-6">
              <q-btn @click="downloadPdf(selectedStudent.identityDocument, `${selectedStudent.fullName} Identity Document.pdf`)" color="primary" label="Download Identity Document" />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
              <q-btn @click="downloadPdf(selectedStudent.scholarship, `${selectedStudent.fullName} Scholarship.pdf`)" color="primary" label="Download Scholarship" />
            </div>

            <div class="col-6">
              <q-btn @click="downloadPdf(selectedStudent.education_Certificate, `${selectedStudent.fullName} Education.pdf`)" color="primary" label="Education Certificate" />
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
          paymentAmount: '',  
          paymentDate: '', 
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
  const isValid = this.newStudent.fullName &&
    this.newStudent.email &&
    this.newStudent.contactNumber &&
    this.newStudent.cgpa &&
    this.newStudent.education &&
    this.newStudent.codingPlatform &&
    this.newStudent.batchId &&
    this.newStudent.batchName &&
    this.newStudent.startDate &&
    this.newStudent.payments.length > 0;  // Ensure payments are added

  if (isValid) {
    try {
      const startDateStr = new Date(this.newStudent.startDate).toISOString().split('T')[0];

      let resumeFilePath = this.newStudent.resume;
      let identityFilePath = this.newStudent.identityDocument;
      let scholarshipFilePath = this.newStudent.scholarship;
      let educationCertificateFilePath = this.newStudent.education_Certificate;

      if (this.$refs.resumeUploader.files.length > 0) {
        const resumeFile = this.$refs.resumeUploader.files[0];
        resumeFilePath = await this.uploadFile(resumeFile);
      }

      if (this.$refs.identityUploader.files.length > 0) {
        const identityFile = this.$refs.identityUploader.files[0];
        identityFilePath = await this.uploadFile(identityFile);
      }

      if (this.$refs.scholarshipUploader.files.length > 0) {
        const scholarshipFile = this.$refs.scholarshipUploader.files[0];
        scholarshipFilePath = await this.uploadFile(scholarshipFile);
      }

      if (this.$refs.educationCertificateUploader.files.length > 0) {
        const educationCertificateFile = this.$refs.educationCertificateUploader.files[0];
        educationCertificateFilePath = await this.uploadFile(educationCertificateFile);
      }

      // Log the data being sent
      const studentData = {
        fullName: this.newStudent.fullName,
        contactNumber: this.newStudent.contactNumber,
        email: this.newStudent.email,
        cgpa: parseFloat(this.newStudent.cgpa),
        education: this.newStudent.education,
        codingPlatform: this.newStudent.codingPlatform,
        resume: resumeFilePath,
        identityDocument: identityFilePath,
        scholarship: scholarshipFilePath,
        Education_Certificate: educationCertificateFilePath,
        batchId: this.newStudent.batchId,
        batchName: this.newStudent.batchName,
        startDate: startDateStr,
        payments: this.newStudent.payments.map(payment => ({
          amount: parseFloat(payment.amount),
          paymentDate: payment.paymentDate
        }))
      };

      console.log('Enrolling student with data:', studentData);

      const response = await axios.post('http://localhost:8087/api/registered-students', studentData);

      // Log the response data
      console.log('Enroll response:', response.data);

      if (response.data.success) {
        const newStudent = response.data.data;
        this.students.push(newStudent);
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
          education_Certificate: '',
          batchId: '',
          batchName: '',
          startDate: '',
          payments: []  // Clear payments
        };
        this.dialog = false;
      } else {
        console.error('Error enrolling student:', response.data.message);
      }
    } catch (error) {
      console.error('Error enrolling student:', error);
    }
  } else {
    console.error('Please fill in all required fields');
  }
},
    downloadPdf(pdfUrl, filename) {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const getImagesUrl = baseUrl + 'fs/download';
      const removeImagePath = baseUrl + 'fs/download/';
      const imagePathWithoutPrefix = pdfUrl.replace(removeImagePath, '');
      const formData = new FormData();
      formData.append('filename', imagePathWithoutPrefix);

      axios.post(getImagesUrl, formData, { responseType: 'blob' })
        .then(downloadResponse => {
          const blob = new Blob([downloadResponse.data]);
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
        })
        .catch(error => {
          console.error('Error in download:', error);
        });
    },

    async enrollStudent() {
  const isValid = this.newStudent.fullName &&
    this.newStudent.email &&
    this.newStudent.contactNumber &&
    this.newStudent.cgpa &&
    this.newStudent.education &&
    this.newStudent.codingPlatform &&
    this.newStudent.batchId &&
    this.newStudent.batchName &&
    this.newStudent.startDate 
    // this.newStudent.payments; // Add payments validation

  console.log('Enrolling student with data:', isValid);

  if (isValid) {
    try {
      const startDateStr = new Date(this.newStudent.startDate).toISOString().split('T')[0];

      let resumeFilePath = this.newStudent.resume;
      let identityFilePath = this.newStudent.identityDocument;
      let scholarshipFilePath = this.newStudent.scholarship;
      let educationCertificateFilePath = this.newStudent.education_Certificate;

      if (this.$refs.resumeUploader.files.length > 0) {
        const resumeFile = this.$refs.resumeUploader.files[0];
        resumeFilePath = await this.uploadFile(resumeFile);
      }

      if (this.$refs.identityUploader.files.length > 0) {
        const identityFile = this.$refs.identityUploader.files[0];
        identityFilePath = await this.uploadFile(identityFile);
      }

      if (this.$refs.scholarshipUploader.files.length > 0) {
        const scholarshipFile = this.$refs.scholarshipUploader.files[0];
        scholarshipFilePath = await this.uploadFile(scholarshipFile);
      }

      if (this.$refs.educationCertificateUploader.files.length > 0) {
        const educationCertificateFile = this.$refs.educationCertificateUploader.files[0];
        educationCertificateFilePath = await this.uploadFile(educationCertificateFile);
      }

      // Log the data being sent
      const studentData = {
        fullName: this.newStudent.fullName,
        contactNumber: this.newStudent.contactNumber,
        email: this.newStudent.email,
        cgpa: parseFloat(this.newStudent.cgpa),
        education: this.newStudent.education,
        codingPlatform: this.newStudent.codingPlatform,
        resume: resumeFilePath,
        identityDocument: identityFilePath,
        scholarship: scholarshipFilePath,
        education_Certificate: educationCertificateFilePath,
        batchId: parseInt(this.newStudent.batchId),
        batchName: this.newStudent.batchName,
        startDate: startDateStr,
        payments: [
        {
          amount: this.newStudent.paymentAmount,
          paymentDate: this.newStudent.paymentDate
        }
      ], // Include payments data
      };

      console.log('Enrolling student with data:', studentData);

      const response = await axios.post('http://localhost:8087/api/registered-students', studentData);

      // Log the response data
      console.log('Enroll response:', response.data);

      if (response.data.success) {
        const newStudent = response.data.data;
        this.students.push(newStudent);
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
          education_Certificate: '',
          batchId: '',
          batchName: '',
          startDate: '',
          payments: [] // Reset payments
        };
        this.dialog = false;
      } else {
        console.error('Error enrolling student:', response.data.message);
      }
    } catch (error) {
      console.error('Error enrolling student:', error);
    }
  } else {
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
  
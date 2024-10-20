<template>
<fin-portlet-header>
    <fin-portlet-heading :loading="masterLoading">
      <span class="User_heading">Student Assignments</span>
    </fin-portlet-heading>
    <fin-portlet-item class="search-container">
      <q-select
        v-model="assignmentSearch"
        :options="assignmentOptions"
        option-label="label"
        option-value="value"
        label="Assignments"
        outlined
        dense
        clearable
        class="fin-input"
        @update:model-value="handleSelectChange"
      />
    </fin-portlet-item>
  </fin-portlet-header>
  <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
    <fin-portlet-item class="table-scroll">
      <div class="fin-table shadow-6 fin-br-8">
      <table style="width: 100%; border-collapse: collapse;" class="table full-width rounded-borders">
        <thead>
          <tr>
            <th>S.No</th>
            <th >Assignment Title</th>
            <th >Batch Title</th>
            <th>is Verified</th>
            <th>Student Name</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(assignment, index) in assignmentsList" :key="assignment.assignmentId">
            <td >{{ index + 1 }}</td>
            <td>{{ assignment.assignmentTitle }}</td>
            <td >{{ assignment.batchTitle }}</td>
            <td>{{ assignment.isVerified }}</td>
            <td >{{ assignment.studentName }}</td>
            <td >
              <template v-if="assignment.blobUrl">
                <button @click="openDialog(assignment.blobUrl, assignment.fileType, assignment)">View</button>
              </template>
              <template v-else>
                <a :href="assignment.submittedFile" download>Download</a>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </fin-portlet-item>
  </fin-portlet>

  <!-- Quasar Dialog for viewing files -->
  <q-dialog v-model="dialogVisible" class="custom-dialog">
  <q-card class="q-pa-md custom-card">
    <q-btn flat icon="close" class="close-btn" @click="dialogVisible = false" />
    <q-card-section class="q-dialog-content">
      <div>
        <!-- <span><strong>Student Assignment Id:</strong> {{ assignmentData.id }}</span><br>
        <span><strong>Assignment Id:</strong> {{ assignmentData.assignmentId }}</span><br> -->
        <span><strong>Assignment Title:</strong> {{ assignmentData.assignmentTitle }}</span><br>
        <!-- <span><strong>Batch Id:</strong> {{ assignmentData.batchId }}</span><br> -->
        <span><strong>Batch Name:</strong> {{ assignmentData.batchTitle }}</span><br>
        <!-- <span><strong>Due Date:</strong> {{ assignmentData.createdDate }}</span><br> -->
        <span><strong>Student:</strong> {{ assignmentData.studentName }}</span><br>
        <!-- Add q-select for isVerified -->
        
      </div>
      <template v-if="fileType === 'png'">
        <q-img :src="dialogFileUrl" class="custom-img" />
      </template>
      <template v-else-if="fileType === 'pdf'">
        <div v-if="fileType === 'pdf'">
            <vue-pdf-app style="height: calc(60vh - 70px)" :pdf="chapterFilePath" :title="true" :theme="theme" class="q-pt-sm pdf"
            page-scale="20" :config="config">
            <template #toolbar-right-prepend>
      <div style="min-height:30px" class="flex flex-center">
        <q-icon name="contrast" @click="toggleTheme" size="sm" color="white" class="q-ma-md cursor-pointer"></q-icon>
      </div>
    </template>
    </vue-pdf-app>
          </div>
</template>
 <!-- Java and Python File Preview -->
 <template v-else-if="['java', 'py'].includes(fileType)">
    <pre v-if="dialogFileContent">
      <code class="language-{{ fileType }}">
        {{ dialogFileContent }}
      </code>
    </pre>
  </template>

      <template v-else>
        <div>No preview available for this file type</div>
      </template>

      <div v-if="dialogFileUrl" class="q-mt-md">
  <!-- <q-btn label="View in New Tab" icon="open_in_new" color="primary" @click="openInNewTab(dialogFileUrl)" /> -->
</div>
    </q-card-section>
    <q-select
          v-model="assignmentData.isVerified"
          :options="verificationOptions"
          label="Verification Status"
          class="q-mt-md"
        />
    <q-card-actions class="q-dialog-actions">
      
      <q-btn label="Verification Done" color="primary" @click="submitAssignmentData" />
      <q-btn label="Download File" color="secondary" @click="downloadFile" v-if="fileType" />
    </q-card-actions>
  </q-card>
</q-dialog>

</template>

<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import axios from 'axios';
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";

export default {
  components: {
    FinPortlet,
    FinPortletItem,
    FinPortletHeader,
    VuePdfApp,
    FinPortletHeading,
  },
  data() {
    return {
      pdfPath: '',
      chapterFilePath: '', 
      numPages: 0,
      theme: 'light',
      config: {
        sidebar: {
          viewThumbnail: true,
          viewOutline: false,
          viewAttachments: false
        },
        toolbar: {
          toolbarViewerRight: {
            presentationMode: true,
            openFile: false,
            print: false,
            download: false,
            viewBookmark: false
          }
        },
        secondaryToolbar: {
          presentationMode: true,
          secondaryOpenFile: false,
          secondaryPrint: false,
          secondaryDownload: false,
          secondaryViewBookmark: false,
          
        },
      },
      assignmentsList: [],
      loading: false,
      dialogVisible: false,
      dialogFileUrl: '',
      assignmentSearch: '',
      pdf: null,
      assignmentOptions: [], // This will hold the data for q-select
      masterLoading: false, // Assuming you have a loading state
      fileType: '' ,// To store the file type ('image', 'pdf', etc.)
      currentPage: 1,
      numPages: 0,
      assignmentData: {
        id: '',
      assignmentId: '',
      currentPage: 1,
      numPages: 0,
      assignmentTitle: '',
      batchId: '',
      batchTitle: '',
      createdDate: '',
      studentName: '',
      isVerified: ''
      } ,
      verificationOptions: [
        { label: 'Y', value: 'Y' },
        { label: 'N', value: 'N' }
      ]
    };
  },
  created() {
    this.fetchAssignments();
  },
  methods: {
    async getStudentAssignmentsData() {
  this.loading = true;
  try {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    let url = baseUrl + 'api/student-assignments';
    if (this.assignmentSearch) {
      url += `?assignmentId=${this.assignmentSearch.value}`;
      console.log("url:", url);
    }

    const response = await this.$api.get(url);
    if (response.data.success) {
      const assignmentsWithBlobs = await Promise.all(response.data.message.map(async (assignment, index) => {
        const fileName = assignment.submittedFile;
        const cleanFileName = fileName;

        let fileType = 'unknown';

        // Determine the file type based on the extension
        if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
          fileType = 'png';
        } else if (fileName.endsWith('.pdf')) {
          fileType = 'pdf';
        } else if (fileName.endsWith('.java')) {
          fileType = 'java';
        } else if (fileName.endsWith('.py')) {
          fileType = 'py';
        }

        const blobUrl = cleanFileName;

        return {
          index: index + 1,
          id: assignment.id,
          assignmentId: assignment.assignmentId,
          batchId: assignment.batchId,
          assignmentTitle: assignment.assignmentTitle,
          batchTitle: assignment.batchTitle,
          createdDate: new Date(assignment.createdDate).toLocaleDateString(),
          studentId: assignment.studentId,
          studentName: assignment.studentName,
          submittedFile: assignment.submittedFile,
          isVerified: assignment.isVerified,
          blobUrl: blobUrl, // Blob URL
          fileType: fileType // File Type (png, pdf, java, py)
        };
      }));

      this.assignmentsList = assignmentsWithBlobs;
    } else {
      console.error('Failed to fetch student assignments:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching student assignments data:', error);
  } finally {
    this.loading = false;
  }
},
async handleSelectChange(value) {
    this.assignmentSearch = value;
    console.log('Selected assignment ID:', value); // Log the selected assignment ID
    const selectedOption = this.assignmentOptions.find(option => option.value === value);
    console.log('Selected assignment option:', selectedOption); // Log the full selected option
    await this.getStudentAssignmentsData(); // Fetch data based on selected assignment
  },
  async fetchAssignments() {
  try {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const getAssignmentsUrl = baseUrl + 'api/assignments';
    
    // Make the API call using this.$api
    const response = await this.$api.get(getAssignmentsUrl);
    
    // Assuming response.data contains your data structure
    this.assignmentOptions = response.data.data.map(assignment => ({
      label: assignment.title, // The text displayed in the select
      value: assignment.id, // The value bound to the selection
    }));
  } catch (error) {
    console.error('Error fetching assignments:', error);
  } finally {
    this.masterLoading = false;
  }
},
    async submitAssignmentData() {
    try {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const submitAssignmentUrl = `${baseUrl}api/student-assignments/${this.assignmentData.id}`;
      // Construct the URL with the assignment ID
      const currentDate = Date.now(); 
      // Prepare the JSON data to be sent
      const data = {
        // id: this.assignmentData.id,
        assignmentId: this.assignmentData.assignmentId,
        assignmentTitle: this.assignmentData.assignmentTitle,
        batchId: this.assignmentData.batchId,
        batchTitle: this.assignmentData.batchTitle,
        studentId: this.assignmentData.studentId,
        studentName: this.assignmentData.studentName,
        submittedFile: this.assignmentData.submittedFile,
        createdDate: currentDate,
        isVerified: this.assignmentData.isVerified.value
      };

      // Make the PUT request
      const response = await this.$api.put(submitAssignmentUrl, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check for successful response
      if (response.data.success) {
        console.log('Assignment data updated successfully:', response.data.message);
        // Optionally, you might want to close the dialog or refresh the data
        this.dialogVisible = false;
        await this.getStudentAssignmentsData(); // Refresh data if needed
      } else {
        console.error('Failed to update assignment data:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating assignment data:', error);
    }
  },
  async openDialog(blobUrl, fileType, assignment) {
  console.log('Opening dialog with assignment data:', assignment);
  this.dialogFileUrl = blobUrl;
  this.fileType = fileType;
  this.dialogVisible = true;
  this.assignmentData = assignment;
  console.log("file:", blobUrl);

  if (fileType === 'pdf') {
    this.chapterFilePath = blobUrl;

  } else if (['java', 'py'].includes(fileType)) {
    // Fetch content for .java or .py files using this.$api
    try {
      const response = await this.$api.get(blobUrl, {
        headers: {
          // The token is automatically included by the axios instance if set in your store
        }
      });

      this.dialogFileContent = response.data; // Assuming the content comes directly in response.data
    } catch (error) {
      console.error('Error fetching file content:', error);
      // Handle error appropriately
    }
  }

  this.assignmentData.isVerified = assignment.isVerified;
},

  // openInNewTab(url) {
  //     window.open(url, '_blank');
  //   },
    async downloadFile() {
  try {
    // Fetch the file from the URL
    const response = await fetch(this.dialogFileUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Convert the response to a Blob
    const blob = await response.blob();

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;

    // Set a default filename (you can customize this)
    const filename = this.dialogFileUrl.split('/').pop(); // Extract filename from URL
    link.download = filename;

    // Append the link to the body and trigger a click
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}
  },
  watch: {
  dialogFileContent() {
    this.highlightCode();
  }
},
  
  mounted() {
    this.getStudentAssignmentsData();
    this.pdfPath = this.dialogFileUrl;
  }
};
</script>

<style scoped>
.custom-dialog .q-card {
  width: 100vw;
  height: 100vh;
  margin: 0;
  border-radius: 0;
}

.custom-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1; /* Ensure button is above other content */
}
.pdf-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.q-dialog-actions {
  display: flex;
  justify-content: flex-end;
}
.table {
  width: 100%;
  color: #212529;
  vertical-align: top;
  border-collapse: collapse;
  border-radius: 10px;
}

.table th,
.table td {
  border: none;
  
}

.table th {
  background-color: #5479F7 !important;
  color: #ffffff;
}

.table tbody tr:nth-child(even) {
  background-color: #E7F0FF;
  
}
.fin-table {
  min-height: 400px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #FFFF;
  border-radius: 10px;
  width: 96%;
  margin-left: 2%;
  margin-right: 2%
}

button {
  background-color: #5479F7;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #34549E;
}

.table-body {
  /* display: block; */
  max-height: 400px;
  overflow-y: auto;
}
.User_heading {
  color: #5479F7;
  margin-left: 4%;
}
.search-container {
  margin-left: auto;
}
.search-input {
  width: 300px;
}
.table thead, .table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  white-space: pre-wrap; /* Wrap long lines */
}
</style>

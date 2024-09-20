<template>
  <div>
    <!-- Content for admin and faculty -->
    <div v-if="isEligible">
      <!-- Show assignments or batch assignments based on selected state -->
      <SubmittedAssignment />
    </div>

    <!-- Content for students and guests -->
    <div>
      <!-- Show enrollments or batch assignments based on selected state -->
      <div v-if="!selectedCycleId">
        <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
          <fin-portlet-header>
            <fin-portlet-heading :loading="loading">
              <span class="User_heading">My Assignments</span>
            </fin-portlet-heading>
          </fin-portlet-header>
          <fin-portlet style="background-color:transparent;">
            <fin-portlet-item>
              <div class="assignment-container">
                <button
                  v-for="enrollment in enrollments"
                  :key="enrollment.courseId"
                  @click="handleEnrollmentClick(enrollment.cycleid)"
                  class="assignment-button"
                >
                  <img src="../../assets/folder.png" alt="Folder Icon" class="assignment-icon" />
                  <div class="assignment-name">My Batch</div>
                </button>
              </div>
            </fin-portlet-item>
          </fin-portlet>
        </fin-portlet>
      </div>
      <div v-if="batchAssignments2.length > 0">
        <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
          <fin-portlet-header>
            <fin-portlet-heading :loading="loading">
              <q-btn @click="showEnrollments" style="box-shadow: none !important;--q-btn-shadow: none !important;">
                <q-icon name="arrow_back" style="font-weight: bold; color: #5479F7;" class="cursor-pointer" />
              </q-btn>
              <span class="User_heading">Batch Assignments</span>
            </fin-portlet-heading>
          </fin-portlet-header>
          <fin-portlet style="background-color:transparent;">
            <fin-portlet-item>
              <div class="assignment-container">
                
                <q-btn
                  v-for="batch in batchAssignments2"
                  :key="batch.id"
                  class="assignment-button"
                  @click="openDialog(batch.file, batch.assignmentDesc, batch.assignmentId, batch.assignmentTitle, batch.batchName, batch.batchId, userId, userEmail)"
                >
                  <img src="../../assets/folder.png" alt="Folder Icon" class="assignment-icon" />
                  <div class="assignment-name">{{ batch.assignmentTitle }}</div>
              </q-btn>
              </div>
            </fin-portlet-item>
          </fin-portlet>
        </fin-portlet>
      </div>
    </div>
    <q-dialog v-model="dialogVisible" full-width full-height persistent>
    <q-card style="height: 100vh; display: flex; flex-direction: row; position: relative;">
      
      <!-- Close button at the top-right corner -->
      <q-btn
  flat
  icon="close"
  @click="closeDialog"
  style="position: absolute; top: 10px; right: 10px; z-index: 1000;"
/>

      <!-- Left half for the image -->
      
      <q-card-section style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
  <!-- First row: Assignment Description -->
  <div style="width: 100%; text-align: center; margin-bottom: 20px;">
    <div style="padding: 10px;">
      <fin-portlet-header>
      <fin-portlet-heading :loading="loading">
        <span class="User_heading">Assignment:{{ dialogAssignmentTitle }}</span>
      </fin-portlet-heading>
    </fin-portlet-header>
      <!-- Display the assignment description -->
      <span><strong>Assignment Description:</strong> {{ dialogAssignmentDesc }}</span>
    </div>
  </div>

  <!-- Second row: Image -->
  <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
    <q-img 
      v-if="dialogFileUrl" 
      :src="dialogFileUrl" 
      alt="File" 
      style="max-width: 100%; max-height: 100%; object-fit: contain;" 
    />
  </div>
</q-card-section>

      <!-- Right half for drag and drop and actions -->
     <!-- Right half for drag and drop and actions -->
     
     
     <q-card-section style="flex: 1; display: flex; flex-direction: column; align-items: center; border-left: 1px solid #ddd; padding: 20px;">

      <div v-if="studentAssignments.length > 0">
  <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;width: 100%;">
    <fin-portlet-header style="width: 30vw;">
      <fin-portlet-heading :loading="loading">
        <span class="User_heading text-center" >Submit Assignment</span>
      </fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet style="background-color:transparent;">
      <fin-portlet-item>
        <div class="assignment-container">
          <div v-for="assignment in studentAssignments" :key="assignment.id">
            <div>
              <span><strong>Assignment Title:</strong> {{ assignment.assignmentTitle }}</span>
            </div>
            <div>
              <span><strong>Batch :</strong> {{ assignment.batchTitle }}</span>
            </div>
            <div>
              <span><strong>Submission Date:</strong> {{ new Date(assignment.createdDate).toLocaleDateString() }}</span>
            </div>
            <div>
              <span><strong>Is Verified:</strong> 
                <template v-if="assignment.isVerified === 'Y'">
                  Your Assignment has been <strong>VERIFIED</strong>
              
                </template>
                
              </span>
            </div>

            <!-- Conditionally render button if not verified -->
            <div class="row items-center" >
  <div v-if="assignment.isVerified === 'N'" class="col-auto">
    <div>Your assignment is not yet verified</div>
    <q-btn 
      label="Edit" 
      color="primary" 
      @click="handleSupport(assignment.id)" 
      style="margin-left: 10px;margin-top: 20px;" 
    />
    
  </div>

  <div class="col-auto">
    <q-btn 
      label="Download File" 
      color="green" 
      @click="downloadFileAsPdf" 
      style="margin-left: 10px;margin-top: 32px;" 
    />
  </div>
</div>

<div v-if="EditisNotCLicked">
  <!-- Image preview logic -->
  <q-img 
    v-if="['jpg', 'jpeg', 'png', 'gif'].includes(dialogFileUrl2.split('.').pop().toLowerCase())" 
    :src="dialogFileUrl2" 
    alt="Image File" 
    style="max-width: 100%; max-height: 100%; object-fit: contain; margin-top: 20px;" 
  />

  <!-- PDF display logic -->
  <template v-else-if="dialogFileUrl2 && dialogFileUrl2.endsWith('.pdf')">
    <div>
      <vue-pdf-app 
        style="height: calc(60vh - 70px)" 
        :pdf="dialogFileUrl2" 
        :title="true" 
        :theme="theme" 
        class="q-pt-sm pdf" 
        page-scale="20" 
        :config="config"
      >
        <template #toolbar-right-prepend>
          <div style="min-height:30px" class="flex flex-center">
            <q-icon 
              name="contrast" 
              @click="toggleTheme" 
              size="sm" 
              color="white" 
              class="q-ma-md cursor-pointer"
            />
          </div>
        </template>
      </vue-pdf-app>
    </div>
  </template>
  <template v-else>File Preview Not Available</template>
</div>

        </div>
        </div>
      </fin-portlet-item>
    </fin-portlet>
  </fin-portlet>
</div>

      <div v-if="showDragAndDrop"
      style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;position: relative;"
      >
  <div 
    v-if="!filePreviewUrl"
    style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px dashed #aaa; padding: 20px; box-sizing: border-box; position: relative;"
    @dragover.prevent
    @drop="handleDrop"
  >
    <span>Drag & Drop Image, PDF, or DOC Here</span>
    <input
  type="file"
  ref="fileInput"
  @change="handleFileSelect"
  accept="image/*,.pdf,.doc,.docx"
  style="position: absolute; top: 50%; transform: translateY(-50%); opacity: 0; width: 100%; height: 100%; cursor: pointer;"
/>
  </div>

  <!-- File Preview and Remove Button -->
  <div v-if="filePreviewUrl" style="width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 20px;">
    <div style="position: relative; width: 100%; max-width: 600px;">
      <q-btn
        flat
        icon="close"
        @click="removeFile"
        style="position: absolute; top: 10px; right: 10px; z-index: 1000; background: rgba(255, 255, 255, 0.8);"
      />
      <!-- Display image preview -->
      <q-img
        v-if="fileType.startsWith('image/')"
        :src="filePreviewUrl"
        alt="File Preview"
        style="max-width: 100%; max-height: 400px; object-fit: contain;"
      />
      <!-- Display PDF preview -->
      <iframe
        v-else-if="fileType === 'application/pdf'"
        :src="filePreviewUrl"
        style="width: 100%; height: 500px;"
      ></iframe>
      <!-- Display message for other types -->
      <div v-else>
        <span>File preview not available for this file type.</span>
      </div>
    </div>
  </div>
</div>

  <!-- Submit Button -->
  <q-btn v-if="filePreviewUrl" label="Submit" @click="onSubmit" style="margin-top: 20px;" />
</q-card-section>
    </q-card>
  </q-dialog>




  </div>
</template>



<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { useProfileStore } from "src/stores/profile";
import SubmittedAssignment from "./SubmitAssignments.vue";
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
export default {
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
      assignmentes: [], // Ensure this matches the API response structure
      batchAssignments: [],
      batchAssignments2:[],
      loading: false,
      selectedAssignmentId: null,
      selectedCycleId:null,
      enrollments: [],
      studentAssignments: [],
      filePreviewUrl: '',
      fileType: '',
      fileType2: '',
      fileName: '', // Add this line
    selectedFile: null, // Add this line
      userId: null,
      dialogVisible: false,
      showDragAndDrop: true,
      EditisNotCLicked: true, 
      dialogFileUrl: '' ,
      dialogFileUrl2: ''
      // URL for the image blob
    };
  },
  components: {
    FinPortlet,
    FinPortletHeader,
    SubmittedAssignment,
    FinPortletHeading,
    VuePdfApp,
    FinPortletItem
  },
  computed: {
  isEligible() {
    const profileStore = useProfileStore();
    const roles = profileStore.user.roles.map(role => role.name);
    // Check if the user is admin or faculty
    return roles.includes('Admin') || roles.includes('Faculty');
  },
  isImage() {
    return this.fileType2.startsWith('image/png');
  }
},
  mounted() {
    this.logUserProfile(); 
    this.fetchUserId();
    this.fetchAssignments();
    
    // this.fetchStudentAssignments();
    if (this.isEligible) {
      this.fetchAssignments();
    }
  },
  methods: {
    fetchUserId() {
      const profileStore = useProfileStore();
      this.userId = profileStore.user.id; // Store the user ID
      this.userEmail = profileStore.user.email;
      this.fetchEnrollments(this.userId); // Fetch enrollments based on user ID
    },
    onSubmit() {
  if ( this.selectedAssignmentId) {
    console.log("StudentAssignmentId",this.selectedAssignmentId)
    // If studentAssignment.id exists, call the update method
    this.updateSubmit();
  } else {
    // Otherwise, call the handleSubmit method for new submission
    this.handleSubmit();
  }
},
closeDialog() {
    this.dialogVisible = false;
    this.EditisNotCLicked = true;
    // ////
  },
  handleSupport(assignmentId) {
  // If the clicked assignment is the same as the currently selected one, toggle the states
  if (this.selectedAssignmentId === assignmentId) {
    this.showDragAndDrop = !this.showDragAndDrop;
    this.EditisNotCLicked = !this.EditisNotCLicked;
  } else {
    // Set the selected assignment ID and reset states if a different assignment is clicked
    this.selectedAssignmentId = assignmentId;
    console.log("selectedAssignmentId:", assignmentId);
    this.showDragAndDrop = true;  // Show the drag-and-drop area
    this.EditisNotCLicked = false; // Set to false when a new assignment is clicked
  }
},
  async downloadFileAsPdf() {
    try {
    // Fetch the file from the URL
    const response = await fetch(this.dialogFileUrl2);

    // Check if the response is OK
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

    // Set the filename directly from the URL
    const filename = this.dialogFileUrl2.split('/').pop();
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
},
    async fetchBatchAssignmentsByCycleId(cycleId) {
    this.loading = true;
    try {
      
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const url = `${baseUrl}api/batch-assignments/batch/${cycleId}`;

    const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched batch assignments for cycleId:', cycleId, data.data); // Debugging output
      this.batchAssignments2 = data.data; // Store fetched batch assignments
    } catch (error) {
      console.error('Error fetching batch assignments by cycleId:', error);
    } finally {
      this.loading = false;
    }
  },
  async fetchStudentAssignments(userId, assignmentId) {
  this.loading = true;
  try {
    const profileStore = useProfileStore();
    this.userId = profileStore.user.id; 
    const userId = this.userId;
    const assignmentId = this.dialogAssignmentId;

    console.log(userId, assignmentId);
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const url = `${baseUrl}api/student-assignments?studentId=${userId}&assignmentId=${assignmentId}`;
    const response = await fetch(url);
    const result = await response.json();
    
    if (result.success) {
      this.studentAssignments = result.data;
      this.showDragAndDrop = this.studentAssignments.length === 0;
      const fetchFiles = this.studentAssignments.map(async (assignment) => {
        console.log("submitFile:", assignment.submittedFile);
        const fileName = assignment.submittedFile;

        const fileType = fileName.split('.').pop().toLowerCase();
        const fileType2 = fileName.split('.').pop().toLowerCase(); // Get the file extension
        const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileType); // Check if it's an image
        const isPdf = fileType2 === 'pdf'; // Check if it's a PDF
        this.dialogFileUrl2 = fileName;
        if (isImage) {
          // Update the file URL only if it's an image
          console.log("File type:", fileType, "Is image:", isImage);
        } else if (isPdf) {

          this.chapterFilePath =fileName;
          console.log("file",blobUrl);
          
        } else {
          console.log("File type:", fileType, "Is image:", isImage, "Is PDF:", isPdf);
        }
      });

      await Promise.all(fetchFiles);

      this.showDragAndDrop = this.studentAssignments.length === 0;
    } else {
      console.error('Failed to fetch student assignments:', result.message);
    }
  } catch (error) {
    console.error('Error fetching student assignments:', error);
  } finally {
    this.loading = false;
  }
},

  handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    this.fileType = file.type;
    this.filePreviewUrl = URL.createObjectURL(file);
    this.fileName = file.name;
    this.selectedFile = file; // Store the selected file
    console.log('Selected file:', file); // Log the selected file
  } else {
    console.log('No file selected.');
  }
},
    
    async uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const uploadFileUrl = baseUrl + 'fs/assignments/upload-file';
      const response = await this.$api.post(uploadFileUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.uri; // Assuming the URI is returned in `data.uri`
    } catch (error) {
      this.showMsg(error.response?.data.message || error.message, 'negative');
      throw error; // Rethrow the error to handle it in the main method
    }
},
async updateSubmit() {
  try {
    const studentAssignmentId = this.selectedAssignmentId // Ensure the studentAssignmentId is available
    let fileUri = '';

    // Check if a file is selected and upload it if necessary
    if (this.selectedFile) {
      fileUri = await this.uploadFile(this.selectedFile); // Upload the file
      console.log('Uploaded file URI:', fileUri); // Log the uploaded file URI
    } else {
      console.log('No file selected for upload.');
    }

    // Prepare the data for submission
    const data = {
      assignmentId: this.dialogAssignmentId,
      assignmentTitle: this.dialogAssignmentTitle,
      batchId: this.dialogBatchTitle,
      batchTitle: this.dialogBatchId,
      studentId: this.userId,
      studentName: this.userEmail,
      submittedFile: fileUri, // Use the uploaded file URI
      createdDate: new Date().toISOString(),
      isVerified: "N", // Default value for verification status
    };

    // Convert the data to JSON
    const jsonData = JSON.stringify(data);
    console.log('Update submission data:', jsonData);

    // Define the API URL for updating the student assignment
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const url = `${baseUrl}api/student-assignments/${studentAssignmentId}`;

    // Send the PUT request to update the existing student assignment
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData, // Send the JSON data as the request body
    });

    if (response.ok) {
      console.log('Assignment updated successfully');
      // Optionally, you can reset the dialog and clear the file preview after a successful update
      this.dialogVisible = false;
      this.filePreviewUrl = '';
      this.fileType = '';
      this.fileName = ''; // Clear the file name
      this.selectedFile = null; // Clear the selected file
    } else {
      console.error('Failed to update assignment');
    }
  } catch (error) {
    console.error('Error updating assignment:', error);
  }
},
async handleSubmit() {
  try {
    let fileUri = '';

    // Check if a file is selected
    if (this.selectedFile) {
      fileUri = await this.uploadFile(this.selectedFile); // Use the stored file
      console.log('Uploaded file URI:', fileUri); // Log the URI
    } else {
      console.log('No file selected for upload.');
    }

    // Prepare the data for submission
    const data = {
      assignmentId: this.dialogAssignmentId,
      assignmentTitle: this.dialogAssignmentTitle,
      batchId: this.dialogBatchTitle,
      batchTitle: this.dialogBatchId,
      studentId: this.userId,
      studentName: this.userEmail,
      submittedFile: fileUri, // Use the uploaded file URI
      createdDate: new Date().toISOString(),
      isVerified:"N",
    };

    // Convert data to JSON
    const jsonData = JSON.stringify(data);
    console.log('Submission data:', jsonData);

    // POST request to submit the assignment
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const studentAssignmentUrl = baseUrl + 'api/student-assignments';
    const response = await fetch(studentAssignmentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    });

    if (response.ok) {
      console.log('Assignment submitted successfully');
      // Optionally, you can reset the dialog and clear the file preview
      this.dialogVisible = false;
      this.filePreviewUrl = '';
      this.fileType = '';
      this.fileName = ''; // Clear the file name
      this.selectedFile = null; // Clear the selected file
    } else {
      console.error('Failed to submit assignment');
    }
  } catch (error) {
    console.error('Error submitting assignment:', error);
  }
},
    removeFile() {
      // Clear file preview and type
      this.filePreviewUrl = '';
      this.fileType = '';
      // Optionally clear the file input field
      this.$refs.fileInput.value = '';
    },
    async openDialog(fileName, assignmentDesc, assignmentId, assignmentTitle, batchId, batchName, userId, userEmail) {
  this.loading = true;
  console.log("Original fileName:", fileName); // Log the original fileName for debugging

  try {
    
    const cleanFileName = fileName

    console.log("Cleaned fileName:", cleanFileName); // Log the cleaned fileName for debugging

    // Set the cleaned filename and other dialog properties
    this.dialogAssignmentDesc = assignmentDesc;
    this.dialogAssignmentId = assignmentId;
    this.dialogAssignmentTitle = assignmentTitle;
    this.dialogBatchId = batchId;
    this.dialogBatchTitle = batchName;
    this.dialogUserId = userId; // Set userId
    this.dialogUserEmail = userEmail; // Set userEmail
    this.dialogFileUrl = cleanFileName;
    // Open the dialog
    this.dialogVisible = true;
  } catch (error) {
    console.error('Error processing file name for dialog:', error);
  } finally {
    this.loading = false;
    await this.fetchStudentAssignments();
  }
},

  handleEnrollmentClick(cycleId) {
    this.selectedCycleId = cycleId;
    this.fetchBatchAssignmentsByCycleId(cycleId); // Fetch batch assignments based on enrollment's cycleId
  },

    async fetchEnrollments(userId) {
    this.loading = true;
    try {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const url = `${baseUrl}api/enrollments/student/${userId}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched enrollments:', data.data); // Log the fetched enrollments
      this.enrollments = data.data; // Store the enrollments in the state
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      this.loading = false;
    }
  },
    async fetchAssignments() {
      this.loading = true;
      try {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const getAssignmentsUrl = baseUrl + 'api/assignments';
        const response = await fetch(getAssignmentsUrl);
        const data = await response.json();
        console.log('Fetched assignments:', data.data); // Debugging output
        this.assignmentes = data.data; // Access the `data` array from the response
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchBatchAssignments(assignmentId) {
      this.loading = true;
      try {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const url = `${baseUrl}api/batch-assignments/assignment/${assignmentId}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched batch assignments:', data.data); // Debugging output
        this.batchAssignments = data.data; // Access the `data` array from the response
      } catch (error) {
        console.error('Error fetching batch assignments:', error);
      } finally {
        this.loading = false;
      }
    },
    handleAssignmentClick(assignmentId) {
      this.selectedAssignmentId = assignmentId;
      this.fetchBatchAssignments(assignmentId);
    },
    
    showAssignments() {
      this.selectedAssignmentId = null;
      this.fetchAssignments();
    },
    showEnrollments() {
      this.selectedCycleId = null;
      this.fetchBatchAssignmentsByCycleId();
    },
    handleBatchClick(batchId) {
      console.log('Button clicked for batch ID:', batchId);
      // Add your batch click logic here
    },
    logUserProfile() {
      const profileStore = useProfileStore();
      console.log('User Profile:', profileStore.user);
    }
  }
};
</script>

<style scoped>
.assignment-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between buttons */
}
.q-btn::before {
  box-shadow: none !important;
}
  
.assignment-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: center;
  width: 15vw; /* Adjust width as needed */
}
  
.assignment-icon {
  width: 10vw; /* Adjust icon size */
  height: 8vw;
}
  
.User_heading {
  color: #5479F7;
  margin-left: 4%;
}
  
.assignment-name {
  margin-top: 5px;
  font-size: 14px; /* Adjust text size */
  color: #333; /* Adjust text color */
}
  
.back-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>

<template>
  <fin-portlet-header>
    <fin-portlet-heading :loading="masterLoading">
      <span class="User_heading">Student Assignments</span>
    </fin-portlet-heading>
    <fin-portlet-item class="search-container">
      <q-select
      v-model="batchSearch"
      :options="batchOptions"
      option-label="label"
      option-value="value"
      label="Batches"
      outlined
      dense
      clearable
      class="fin-input"
      @update:model-value="handleSelectChange"
    />
    </fin-portlet-item>
  </fin-portlet-header>
  <fin-portlet
    style="background-color: transparent; margin-bottom: 0px; max-height: 100vh"
  >
    <fin-portlet-item class="table-scroll">
      <div class="q-pa-md">
    <q-table
      flat
      bordered
      :rows="filteredBatches"
      :columns="columns"
      row-key="cycleid"
       style="height: 60vh;"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width 
          style="background-color: #5479f7;" />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="text-align: left; width: 600px;background-color: #5479f7;color: #ffff" 
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width 
          style="background-color: #5479f7"
          /> <!-- For spacing after the columns -->
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props" style="color: #5479f7;">
           <b>{{ props.row[col.field] }}</b>
          </q-td>
          <q-td auto-width class="text-right">
            <q-btn
              size="sm"
              color="#5479f7"
              round
              dense
              @click="() => { props.expand = !props.expand; fetchAssignments(props.row.cycleid); }"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <table class="nested-table">
                <thead>
                  <tr style="color: #5479f7;">
                    <th><strong>Assignment Title</strong></th>
            <th><strong>Batch Title</strong></th>
            <th><strong>is Verified</strong></th>
            <th><strong>Student Name</strong></th>
            <th><strong>File</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-if="loading">
                    <td colspan="3">Loading assignments...</td>
                  </tr> -->
                  <tr v-if="!assignments[props.row.cycleid]?.length && !loading">
                    <td colspan="3">No assignments available.</td>
                  </tr>
                  <tr v-else v-for="assignment in assignments[props.row.cycleid]" :key="assignment.assignmentId">
                    <td>{{ assignment.assignmentTitle }}</td>
            <td>{{ assignment.batchTitle }}</td>
            <td>{{ assignment.isVerified }}</td>
            <td>{{ assignment.studentName }}</td>
            <td>
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
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <p v-if="!filteredBatches.length">No batches found.</p>
  </div>
    </fin-portlet-item>
  </fin-portlet>

  <!-- Quasar Dialog for viewing files -->
  <q-dialog v-model="dialogVisible" class="custom-dialog">
    <q-card class="q-pa-md custom-card">
      <q-btn flat icon="close" class="close-btn" @click="closeDialog" />
      <q-card-section class="q-dialog-content">
        <div>
          <!-- <span><strong>Student Assignment Id:</strong> {{ assignmentData.id }}</span><br>
        <span><strong>Assignment Id:</strong> {{ assignmentData.assignmentId }}</span><br> -->
          <span
            ><strong>Assignment Title:</strong>
            {{ assignmentData.assignmentTitle }}</span
          ><br />
          <!-- <span><strong>Batch Id:</strong> {{ assignmentData.batchId }}</span><br> -->
          <span
            ><strong>Batch Name:</strong> {{ assignmentData.batchTitle }}</span
          ><br />
          <!-- <span><strong>Due Date:</strong> {{ assignmentData.createdDate }}</span><br> -->
          <span><strong>Student:</strong> {{ assignmentData.studentName }}</span
          ><br />
          <!-- Add q-select for isVerified -->
        </div>
        <template v-if="fileType === 'png'">
          <q-img :src="dialogFileUrl" class="custom-img" />
        </template>
        <template v-else-if="fileType === 'pdf'">
          <div v-if="fileType === 'pdf'">
            <vue-pdf-app
              style="height: calc(60vh - 70px)"
              :pdf="chapterFilePath"
              :title="true"
              :theme="theme"
              class="q-pt-sm pdf"
              page-scale="20"
              :config="config"
            >
              <template #toolbar-right-prepend>
                <div style="min-height: 30px" class="flex flex-center">
                  <q-icon
                    name="contrast"
                    @click="toggleTheme"
                    size="sm"
                    color="white"
                    class="q-ma-md cursor-pointer"
                  ></q-icon>
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
          <div class="row q-gutter-sm">
            <q-btn
              label="View in New Tab"
              icon="open_in_new"
              color="primary"
              @click="openInNewTab(dialogFileUrl)"
            />
            <q-btn
              v-if="!assignmentData.evaluation"
              label="Evaluate"
              icon="assignment_turned_in"
              color="green"
              @click="evaluateFileUrl"
            />
          </div>

          <p v-if="assignmentData.evaluation">
            Rating: {{ assignmentData.evaluation }}
          </p>

          <div v-if="evaluationResult" class="evaluationResult">
            <p v-if="evaluationResult.accuracy !== 'N/A'">
              <span class="bold-text">Accuracy: </span>
              {{ evaluationResult.accuracy }}
            </p>
            <p v-if="evaluationResult.mean_absolute_error !== 'N/A'">
              <span class="bold-text">Mean Absolute Error:</span>
              {{ evaluationResult.mean_absolute_error }}
            </p>
            <p v-if="evaluationResult.mean_squared_error !== 'N/A'">
              <span class="bold-text">Mean Squared Error:</span>
              {{ evaluationResult.mean_squared_error }}
            </p>
            <p v-if="evaluationResult.evaluation_feedback !== 'N/A'">
              <span class="bold-text">Feedback: </span
              >{{ evaluationResult.evaluation_feedback }}
            </p>
            <p v-if="evaluationResult.space_complexity !== 'N/A'">
              <span class="bold-text">Space Complexity: </span
              >{{ evaluationResult.space_complexity }}
            </p>
            <p v-if="evaluationResult.time_complexity !== 'N/A'">
              <span class="bold-text">Time Complexity: </span
              >{{ evaluationResult.time_complexity }}
            </p>
            <p v-if="evaluationResult.rating_of_the_code !== 'N/A'">
              <span class="bold-text">Rating of the code: </span
              >{{ evaluationResult.rating_of_the_code }}
            </p>
          </div>
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
import axios from "axios";
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
      pdfPath: "",
      batches: [],               // All batches from API
      filteredBatches: [],       // Batches to display based on selection
      batchSearch: null,         // Selected batch for filtering
      assignments: {},           // Assignments for the selected batch
      loading: false,            // Loading state for assignments
      columns: [                 // Table column definitions
        { name: 'cycleid', label: 'Batch ID', field: 'cycleid' },
        { name: 'cycleDesc', label: 'Batch Name', field: 'cycleDesc' },
      ],
      chapterFilePath: "",
      numPages: 0,
      evaluationResult: "",
      theme: "light",
      config: {
        sidebar: {
          viewThumbnail: true,
          viewOutline: false,
          viewAttachments: false,
        },
        toolbar: {
          toolbarViewerRight: {
            presentationMode: true,
            openFile: false,
            print: false,
            download: false,
            viewBookmark: false,
          },
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
      dialogFileUrl: "",
      assignmentSearch: "",
      pdf: null,
      assignmentOptions: [], // This will hold the data for q-select
      masterLoading: false, // Assuming you have a loading state
      fileType: "", // To store the file type ('image', 'pdf', etc.)
      currentPage: 1,
      numPages: 0,
      assignmentData: {
        id: "",
        assignmentId: "",
        currentPage: 1,
        numPages: 0,
        assignmentTitle: "",
        batchId: "",
        batchTitle: "",
        createdDate: "",
        studentName: "",
        isVerified: "",
        evaluation:"",
      },
      verificationOptions: [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
      ],
    };
  },
  created() {
    this.fetchBatches();
  },
  computed: {
    batchOptions() {
      return this.batches.map(batch => ({
        label: batch.cycleDesc,
        value: batch.cycleid,  // Use cycleid for fetching details
      }));
    },
  },
  methods: {
    async getStudentAssignmentsData() {
      this.loading = true;
      try {
        const baseUrl =
          (process.env.VUE_APP_CORE_URL || "").replace(/\/$/g, "") + "/";
        let url = baseUrl + "api/student-assignments";
        if (this.assignmentSearch) {
          url += `?assignmentId=${this.assignmentSearch.value}`;
          console.log("url:", url);
        }

    const response = await this.$api.get(url);
    if (response.data.success) {
      const assignmentsWithBlobs = await Promise.all(response.data.message.map(async (assignment, index) => {
        const fileName = assignment.submittedFile;
        const cleanFileName = fileName;

              let fileType = "unknown";

              // Determine the file type based on the extension
              if (
                fileName.endsWith(".png") ||
                fileName.endsWith(".jpg") ||
                fileName.endsWith(".jpeg")
              ) {
                fileType = "png";
              } else if (fileName.endsWith(".pdf")) {
                fileType = "pdf";
              } else if (fileName.endsWith(".java")) {
                fileType = "java";
              } else if (fileName.endsWith(".py")) {
                fileType = "py";
              }

              const blobUrl = cleanFileName;

              return {
                index: index + 1,
                id: assignment.id,
                assignmentId: assignment.assignmentId,
                batchId: assignment.batchId,
                assignmentTitle: assignment.assignmentTitle,
                batchTitle: assignment.batchTitle,
                createdDate: new Date(
                  assignment.createdDate
                ).toLocaleDateString(),
                studentId: assignment.studentId,
                studentName: assignment.studentName,
                submittedFile: assignment.submittedFile,
                isVerified: assignment.isVerified,
                evaluation: assignment.evaluation,
                blobUrl: blobUrl, // Blob URL
                fileType: fileType, // File Type (png, pdf, java, py)
              };
            })
          );

          this.assignmentsList = assignmentsWithBlobs;
        } else {
          console.error(
            "Failed to fetch student assignments:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching student assignments data:", error);
      } finally {
        this.loading = false;
      }
    },
    evaluateFileUrl() {
  const baseUrl =
    (process.env.VUE_APP_CORE_URL || "").replace(/\/$/g, "") + "/";
  const postEvaluateUrl = baseUrl + "api/evaluator/evaluatecode";

  const assignmentID = this.assignmentData.assignmentId;

  // Use the pre-configured Axios instance (this.$api)
  this.$api
    .post(`${postEvaluateUrl}?assignment-id=${encodeURIComponent(assignmentID)}`)
    .then((response) => {
      this.evaluationResult = response.data.response;
      // You can add any additional logic here if needed
    })
    .catch((error) => {
      console.error(error);
      this.evaluationResult = "Error evaluating the file.";
    });
},
    async fetchBatches() {
  try {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const url = `${baseUrl}api/cycles`;
    const response = await this.$api.get(url);
    const data = response.data; // Axios automatically parses JSON

    if (data.success) {
      this.batches = data.data;  // Store fetched batches
      this.filteredBatches = data.data; // Initially show all batches
    } else {
      console.error('Failed to fetch batches:', data.message);
      this.filteredBatches = []; // Clear on error
    }
  } catch (error) {
    console.error('Error fetching batches:', error);
    this.filteredBatches = []; // Clear on error
  }
},
async fetchAssignments(batchId) {
  this.loading = true; // Start loading assignments

  // Check if the assignments for the batch have already been fetched
  if (!this.assignments[batchId]) {
    try {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const url2 = `${baseUrl}api/student-assignments`;
      // Use the pre-configured Axios instance (this.$api) to make the request
      const response = await this.$api.get(url2, {
        params: { batchId }
      });

      const data = response.data;

      if (data.success) {
        // Process the assignments and add details such as fileType
        const assignmentsWithDetails = await Promise.all(data.data.map((assignment, index) => {
          const fileName = assignment.submittedFile;
          let fileType = 'unknown';

          // Determine file type based on the extension
          if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
            fileType = 'png';
          } else if (fileName.endsWith('.pdf')) {
            fileType = 'pdf';
          } else if (fileName.endsWith('.java')) {
            fileType = 'java';
          } else if (fileName.endsWith('.py')) {
            fileType = 'py';
          }

          // Return assignment details along with file type
          return {
            index: index + 1,
            id: assignment.id,
            assignmentId: assignment.assignmentId,
            batchId: assignment.batchId,
            assignmentTitle: assignment.assignmentTitle,
            assignmentEvalution: assignment.evaluation,
            batchTitle: assignment.batchTitle,
            createdDate: new Date(assignment.createdDate).toLocaleDateString(),
            studentId: assignment.studentId,
            studentName: assignment.studentName,
            submittedFile: assignment.submittedFile,
            isVerified: assignment.isVerified,
            blobUrl: assignment.submittedFile, // Assuming this is the URL to the file
            fileType: fileType,
            evaluation:assignment.evaluation,
          };
        }));

        // Update assignments for the selected batch
        this.assignments = {
          ...this.assignments, // Preserve existing assignments
          [batchId]: assignmentsWithDetails // Add the processed assignments
        };
      } else {
        console.error('Failed to fetch assignments:', data.message);

        // Set an empty array for the batch in case of failure
        this.assignments = {
          ...this.assignments,
          [batchId]: []
        };
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);

      // Handle errors by setting an empty array for the batch
      this.assignments = {
        ...this.assignments,
        [batchId]: []
      };
    } finally {
      this.loading = false; // Stop the loading spinner or indicator
    }
  }
},
async handleSelectChange(selectedBatch) {
  if (selectedBatch) {
    try {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const url = `${baseUrl}api/cycles/${selectedBatch.value}`;
      console.log("url", url);
      
      const response = await this.$api.get(url);
      const data = response.data;

      if (data.success) {
        // Update filteredBatches to only include the selected batch
        this.filteredBatches = [data.data]; // Assuming data.data contains the specific batch details
      } else {
        console.error('Failed to fetch batch:', data.message);
        this.filteredBatches = []; // Clear if there's an error
      }
    } catch (error) {
      console.error('Error fetching batch:', error);
      this.filteredBatches = []; // Clear on error
    }
  } else {
    this.filteredBatches = this.batches; // Show all if no batch is selected
  }
},
 
async submitAssignmentData() {
  try {
    const baseUrl =
      (process.env.VUE_APP_CORE_URL || "").replace(/\/$/g, "") + "/";
    const submitAssignmentUrl = `${baseUrl}api/student-assignments/${this.assignmentData.id}`;
    
    // Construct the URL with the assignment ID
    const currentDate = Date.now();
    const evaluationString = this.evaluationResult || "";

    // Prepare the JSON data to be sent
    const data = {
      assignmentId: this.assignmentData.assignmentId,
      assignmentTitle: this.assignmentData.assignmentTitle,
      batchId: this.assignmentData.batchId,
      batchTitle: this.assignmentData.batchTitle,
      studentId: this.assignmentData.studentId,
      studentName: this.assignmentData.studentName,
      submittedFile: this.assignmentData.submittedFile,
      createdDate: currentDate,
      isVerified: this.assignmentData.isVerified.value,
      blobUrl: this.assignmentData.submittedFile, // Change here

      evaluation:
        JSON.stringify(this.evaluationResult.evaluation_feedback) || "",
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
  closeDialog() {
      this.dialogVisible = false;
      this.evaluationResult = ""; // Clear the evaluation result when closing
    },
  async openDialog(blobUrl, fileType, assignment) {
      console.log('Opening dialog with assignment data:', assignment);
      this.dialogFileUrl = blobUrl;
      this.fileType = fileType;
      this.dialogVisible = true;
      this.assignmentData = assignment;
      console.log("file:",blobUrl);
      if (fileType === 'pdf') {
        this.chapterFilePath = blobUrl;
        
      }else if (['java', 'py'].includes(fileType)) {
    // Fetch content for .java or .py files
    const response = await fetch(blobUrl);
    this.dialogFileContent = await response.text();
  }
      this.assignmentData.isVerified = assignment.isVerified;
    },
    highlightCode() {
    this.$nextTick(() => {
      Prism.highlightAll();
    });
  },
  openInNewTab(url) {
      window.open(url, '_blank');
    },
    async downloadFile() {
      try {
        // Fetch the file from the URL
        const response = await fetch(this.dialogFileUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Convert the response to a Blob
        const blob = await response.blob();

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;

        // Set a default filename (you can customize this)
        const filename = this.dialogFileUrl.split("/").pop(); // Extract filename from URL
        link.download = filename;

        // Append the link to the body and trigger a click
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link and revoking the object URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    },
  },
  watch: {
    dialogFileContent() {
      this.highlightCode();
    },
  },

  mounted() {
    this.getStudentAssignmentsData();
    this.pdfPath = this.dialogFileUrl;
  },
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
  background-color: #5479f7 !important;
  color: #ffffff;
}

.table tbody tr:nth-child(even) {
  background-color: #e7f0ff;
}
.fin-table {
  min-height: 400px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #ffff;
  border-radius: 10px;
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
}

button {
  background-color: #5479f7;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #34549e;
}

.table-body {
  /* display: block; */
  max-height: 400px;
  overflow-y: auto;
}
.User_heading {
  color: #5479f7;
  margin-left: 4%;
}
.evaluationResult {
  padding-top: 30px;
}
.search-container {
  margin-left: auto;
}
.search-input {
  width: 300px;
}
.table thead,
.table tbody tr {
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
.bold-text {
  font-weight: bold;
}
.nested-table {
  width: 100%;
  border-collapse: collapse;
}
.nested-table th,
.nested-table td {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>

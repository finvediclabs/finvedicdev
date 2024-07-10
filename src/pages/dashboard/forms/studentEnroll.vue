<template>
  <div class="whole_body">
    <div id="content">
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading"><span class="User_heading">Student Enrollments</span></fin-portlet-heading>
      </fin-portlet-header>
      <div class="fin-table shadow-6 fin-br-8">
        <table id="enrollmentsTable" class="table full-width rounded-borders">
          <thead style="white-space: nowrap;">
            <tr>
              <th>Full Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>CGPA</th>
              <th>Education</th>
              <th>Coding Platform</th>
              <th>Resume PDF</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="enrollment in enrollments" :key="enrollment.id">
              <td>{{ enrollment.fullName }}</td>
              <td>{{ enrollment.contactNumber }}</td>
              <td>{{ enrollment.email }}</td>
              <td>{{ enrollment.cgpa }}</td>
              <td>{{ enrollment.education }}</td>
              <td>{{ enrollment.codingPlatform }}</td>
              <td>
                <button v-if="enrollment.uploadDocumentPath" @click="downloadPdf(enrollment.uploadDocumentPath, enrollment.fullName + '.pdf')">Download PDF</button>
                <span v-else>Not uploaded</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";

export default {
  data() {
    return {
      enrollments: []
    };
  },
  components: {
    FinPortletHeader,
    FinPortletHeading,
  },
  mounted() {
    this.fetchEnrollments();
  },
  methods: {
    fetchEnrollments() {
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const getStudentEnroll = baseUrl + 'api/student-enrollments';
      fetch(getStudentEnroll)
        .then(response => response.json())
        .then(data => {
          this.enrollments = data.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
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
          console.log('Download successful');
        })
        .catch(error => {
          console.error('Error in download:', error);
        });
    }
  }
};
</script>

<style scoped>
.whole_body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo img {
  max-width: 100%;
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
  background-color: #5479F7;
  color: #ffffff;
}

.table tbody tr:nth-child(even) {
  background-color: #E7F0FF;
  
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

.table thead, .table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
</style>

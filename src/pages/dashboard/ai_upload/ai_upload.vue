<template>
  <fin-portlet-header>
    <fin-portlet-heading :loading="loading" backArrow>
      <span class="User_heading">AI Training Arena</span>
    </fin-portlet-heading>
  </fin-portlet-header>
  <div class="container">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-4">
        <DronaTraining @files-refresh="fetchDronaFiles" />
      </div>
      <div class="col-md-2">
        <div class="outer">
          <div class="inner"></div>
          <div v-if="notification" class="notification">
            {{ notification }}
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <VedTraining @files-refresh="fetchVedFiles" />
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>

  <div class="container">
    <div class="row fileList">
      <div class="col-md-6">
        <div v-if="DronafileList.length > 0 && DronafileList[0] !== 'No PDF files found in folder'" class="Drona-file-list">
          <h3>Drona Files</h3>
          <div v-for="(file, index) in DronafileList" :key="index" class="file-item">
            <span class="file-name">{{ file }}</span>
            <button class="delete-button" @click="deleteDronaFile(file)">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
        <div v-else class="Drona-file-list">
          <h3>Drona Files</h3>
          <p>No Files Found</p>
        </div>
      </div>
      <div class="col-md-6">
        <div v-if="VedfileList.length > 0 && VedfileList[0] !== 'No PDF files found in folder'" class="Ved-file-list">
          <h3>Ved Files</h3>
          <div v-for="(file, index) in VedfileList" :key="index" class="file-item">
            <span class="file-name">{{ file }}</span>
            <button class="delete-button" @click="deleteVedFile(file)">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
        <div v-else class="Ved-file-list">
          <h3>Ved Files</h3>
          <p>No Files Found</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// Import the Drona.vue component
import axios from 'axios';
import DronaTraining from './DronaTraining.vue';
import VedTraining from './VedTraining.vue';
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";

export default {
  data() {
    return {
      DronafileList: [], // List to store Drona files
      VedfileList: [], // List to store Ved files
    };
  },
  mounted() {
    this.fetchDronaFiles(); // Fetch Drona files on mount
    this.fetchVedFiles(); // Fetch Ved files on mount
  },
  components: {
    DronaTraining,
    VedTraining,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  methods:{
      async fetchDronaFiles() {
        try {
          const response = await axios.get("http://localhost:8087/api/drona/getpdf");
          console.log(response.data)
          this.DronafileList = response.data instanceof Array ? response.data : [response.data];
        } catch (error) {
          console.error("Error fetching Drona files:", error);
        }
      },
      async fetchVedFiles() {
        try {
          const response = await axios.get("http://localhost:8087/api/ved/getpdf");
          console.log(response.data)
          this.VedfileList = response.data instanceof Array ? response.data : [response.data];
        } catch (error) {
          console.error("Error fetching Ved files:", error);
        }
      },
      async deleteDronaFile(fileName) {
        const confirmed=confirm(`Are you sure to delete ${fileName} ?`)
        if(confirmed){
          try {
          axios.delete(`http://localhost:8087/api/drona/deletepdf?filename=${fileName}`);
          this.DronafileList = this.DronafileList.filter(file => file !== fileName);
          this.$emit('files-refresh'); // Refresh file list after deletion
          this.notification = `${fileName} Deleted successfully`; // Set notification message
          setTimeout(() => {
            this.notification = null; // Clear notification after a delay
          }, 3000);
        } catch (error) {
          console.error("Error deleting file:", error);
      }
        }
    },
    async deleteVedFile(fileName) {
        const confirmed=confirm(`Are you sure to delete ${fileName} ?`)
        if(confirmed){
          try {
          axios.delete(`http://localhost:8087/api/ved/deletepdf?filename=${fileName}`);
          this.VedfileList = this.VedfileList.filter(file => file !== fileName);
          this.$emit('files-refresh'); // Refresh file list after deletion
          this.notification = `${fileName} Deleted successfully`; // Set notification message
          setTimeout(() => {
            this.notification = null; // Clear notification after a delay
          }, 3000);
        } catch (error) {
          console.error("Error deleting file:", error);
      }
        }
    }
  }
}
</script>

<style>
/* Add any custom styles as needed */
.container {
  margin-top: 20px;
}
.User_heading{
  color:#5479F7;
  margin-left:4%;
}
.notification {
    background-color: #4caf50;
    color: white;
    padding: 16px;
    border-radius: 5px;
    position: fixed;
    bottom: 60px;
    right: 20px;
  }

.fileList{
  text-align: center;
  justify-content: center;
  display: flex;
}
.file-item {
  display: flex;
  align-items: center;
  background-color: white;
  color: red;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.file-name {
  flex: 1;
  text-align: left;
  font-weight: bold;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 18px;
}

.delete-button .material-icons {
  vertical-align: middle;
}

.Drona-file-list, .Ved-file-list {
  padding: 10px;
}
/* .outer {
width: 1px;
height: 60vh;
margin: auto;
position: relative;
overflow: hidden;
}
.inner {
position: absolute;
width:100%;
height: 60%;
background: #5479F7;
top: 30%;
box-shadow: 0px 0px 30px 20px #5479F7;
} */
</style>

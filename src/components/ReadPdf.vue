<template>
  <vue-pdf-app style="height: calc(100vh - 70px)" :pdf="chapterFilePath" :title="true" :theme="theme" class="q-pt-sm pdf"
    page-scale="20" :config="config">
    <template #toolbar-right-prepend>
      <div style="min-height:30px" class="flex flex-center">
        <q-icon name="contrast" @click="toggleTheme" size="sm" color="white" class="q-ma-md cursor-pointer"></q-icon>
      </div>
    </template>
  </vue-pdf-app>
</template>
<script>
import CryptoJS from 'crypto-js';
import Axios from 'axios'; // Import Axios for HTTP requests

import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";

export default {
  name: 'read-pdf',
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
      }
    }
  },
  components: {
    VuePdfApp
  },
  mounted() {
    this.pdfPath = CryptoJS.AES.decrypt(this.$route.query.item, 'fileData').toString(CryptoJS.enc.Utf8);
    this.sendPostRequest(); // Call the method to send the POST request
  },
  methods: {
    toggleTheme() {
      if (this.theme == 'light') {
        this.theme = 'dark';
      } else {
        this.theme = 'light';
      }
    },
    async sendPostRequest() {
    try {
      // Remove the prefix from this.pdfPath
      const filePathWithoutPrefix = this.pdfPath.replace('https://fnbackend.finvedic.com/fs/download/', '');

      const formData = new FormData();
      formData.append('filename', filePathWithoutPrefix); // Use the modified filePathWithoutPrefix

      const response = await Axios.post('https://fnbackend.finvedic.com/fs/download', formData, { responseType: 'blob' });

      if (response.status === 200) {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        this.chapterFilePath = url; // Set the chapterFilePath data property with the received URL
      } else {
        console.error('Error fetching chapter data:', response);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  },
    toggleTheme() { /* Your toggleTheme method */ },
  },
};
</script>
<style>
.pdf #thumbnailView {
  overflow: initial !important;
}

.pdf #thumbnailView::-webkit-scrollbar {
  width: 2px;
  height: 0px;
  border-radius: 10%;
}

.pdf #thumbnailView::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.pdf #thumbnailView::-webkit-scrollbar-thumb {
  background: #888;
}

.pdf #thumbnailView::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 10px;
}
</style>

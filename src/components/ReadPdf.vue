<template>
  <vue-pdf-app style="height: calc(100vh - 70px)" :pdf="pdfPath" :title="true" :theme="theme" class="q-pt-sm pdf"
    page-scale="20" :config="config">
    <template #toolbar-right-prepend>
      <div style="min-height:30px" class="flex flex-center">
        <q-icon name="contrast" @click="toggleTheme" size="sm" color="white" class="q-ma-md cursor-pointer"></q-icon>
      </div>
    </template>
  </vue-pdf-app>
</template>
<script>
import CryptoJS from 'crypto-js'

import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";

export default {
  name: 'read-pdf',
  data() {
    return {
      pdfPath: '',
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
        }
      }
    }
  },
  components: {
    VuePdfApp
  },
  mounted() {
    this.pdfPath = CryptoJS.AES.decrypt(this.$route.query.item, 'fileData').toString(CryptoJS.enc.Utf8);
  },
  methods: {
    toggleTheme() {
      if (this.theme == 'light') {
        this.theme = 'dark';
      } else {
        this.theme = 'light';
      }
    }
  }
}
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

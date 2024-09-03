<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Chapters List</fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Add Chapter" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
          no-caps @click="createFile()" />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="chaptersList" select @reCall="getChaptersData()" @editFun="editDataFun"
        :loading="loading" allowDelete :delete-url="deleteUrl" />
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinTable from "src/components/FinTable.vue";
import axios from 'axios';
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { urls } from "../Urls"
import CryptoJS from 'crypto-js'
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
      deleteUrl: urls.bookChaptersUrl,
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Cover', key: 'imageDownload', align: 'start', type: 'image' },
        { label: 'Title', key: 'chapterTitle', align: 'start', width: '150px' },
        { label: 'Display Order', key: 'displayOrder', align: 'start', width: '150px' },
        { label: 'Description', key: 'description', align: 'start', width: '250px' },
      ],
      chaptersList: [],
      loading: true,
    }
  },
  computed: {
    bookId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getChaptersData();
  },
  watch: {
    bookId() {
      this.getChaptersData();
    }
  },
  methods: {
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
    async getChaptersData() {
      if (this.bookId) {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const removeImagePath = baseUrl +'fs/download/'
        this.loading = true;
        this.$api.get(urls.bookChaptersUrl, {
          params: {
            bookId: this.bookId
          }
        }).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.chaptersList = response.data.data.map((item, index) => ({
               ...item,
              index: index + 1,
              imageDownload: item.chapterImagePath.replace(removeImagePath, ''),
            }));
            this.chaptersList.forEach(async item => {
          const image = item.imageDownload;
          // console.log(image);
          // Check if image exists
          if (image) {
            // Create form data
            const formData = new FormData();
            formData.append('filename', image);
       
          const getImagesUrl = baseUrl + 'fs/download';
            // Send form data to http://localhost:8083/fs/download
            const downloadResponse = await axios.post(getImagesUrl, formData, {
              responseType: 'blob' // Set response type to blob
            });
            
            // Handle the blob response as needed
            item.imageDownload = URL.createObjectURL(downloadResponse.data);
            // console.log(downloadResponse); // Log or process the blob response
          }
        });
            
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
        }).catch((error) => {
          this.loading = false;
        })
      }
    },
    editDataFun(val) {
      let item = {
        title: val.chapterTitle,
        description: val.description,
        id: val.id,
        cover: '',
        coverOld: '' ,
        displayOrder:val.displayOrder,
        file: val.chapterFilePath
      };
      // console.log('Original Cover Path:', val.chapterImagePath);

// Define the base URL to remove
const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
const removechapterImagePath = baseUrl + 'fs/download/';

// Function to get cover Blob via a POST request
async function fetchCoverBlob(chapterImagePath) {
  item.coverOld = chapterImagePath;
  try {
    // Remove the base URL part from chapterImagePath
    const filename = chapterImagePath.replace(removechapterImagePath, '');
    // console.log("Filename:", filename);

    // Create a FormData object and append the filename
    const formData = new FormData();
    formData.append('filename', filename);

    // Send POST request with FormData
    const postchapterImagePath = baseUrl + 'fs/download';
    const response = await axios.post(postchapterImagePath, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure the correct content type is set
      },
      responseType: 'blob' // Request response as a Blob
    });

    // Convert Blob to a URL
    if (response.status === 200) {
      return URL.createObjectURL(response.data); // Create an object URL for the Blob
    } else {
      // console.error('Failed to fetch cover Blob:', response.statusText);
      return null;
    }
  } catch (error) {
    // console.error('Error fetching cover Blob:', error);
    return null;
  }
}

// Fetch the cover Blob and then proceed
fetchCoverBlob(val.chapterImagePath).then((coverUrl) => {
  if (coverUrl) {
    item.cover = coverUrl;
    // console.log('Updated Cover URL:', item.cover);
  } else {
    // Handle the case where cover URL couldn't be fetched
    // console.warn('Cover URL could not be fetched, proceeding without cover.');
  }

      this.createFile('Update Chapter', item);

    });
    },
    createFile(title, item) {
      let params = {
        title: title ?? 'Create Chapter',
        url: item?.id ? `${urls.bookChaptersUrl}/${item?.id}` : urls.bookChaptersUrl,
        item: item,
        bookId: this.bookId,
        chapter: true,
        requiredCategory: false,
        parentKey: 'bookId',
        coverKey: "chapterImagePath",
        fileKey: "chapterFilePath",
        fileAccept: ".doc, .docx,.pdf",
      };
      params = JSON.stringify(params);
      this.$router.push({
        path: '/admin/create',
        query: {
          params: CryptoJS.AES.encrypt(params, 'fileData').toString()
        }
      });

    }
  }
}
</script>

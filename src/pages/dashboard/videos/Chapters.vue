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
      deleteUrl: urls.videoChaptersUrl,
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Cover', key: 'imageDownload', align: 'start', type: 'image' },
        { label: 'Title', key: 'chapterTitle', align: 'start', width: '150px' },
        { label: 'Description', key: 'description', align: 'start', width: '250px' },
      ],
      chaptersList: [],
      loading: true,
    }
  },
  computed: {
    videoId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getChaptersData();
  },
  watch: {
    videoId() {
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
  if (this.videoId) {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
          const getImagesUrl = baseUrl + 'fs/download';
          const removeImagePath = baseUrl +'fs/download/'
    this.loading = true;
    try {
      const formData = new FormData();
      formData.append('videoId', this.videoId);

      const response = await this.$api.post(urls.videoChaptersUrl, formData);
      this.loading = false;
      if (response.data.success) {
        this.chaptersList = response.data.data.map((item, index) => ({
          ...item,
          index: index + 1,
          imageDownload: item.videoCoverPath.replace(removeImagePath, ''),
        }));

        // Log the imageDownload of each item in chaptersList
        this.chaptersList.forEach(async item => {
          const image = item.imageDownload;
          console.log(image);
          // Check if image exists
          if (image) {
            // Create form data
            const formData = new FormData();
            
            formData.append('filename', image);

            // Send form data to http://localhost:8083/fs/download
            const downloadResponse = await axios.post(getImagesUrl, formData, {
              responseType: 'blob' // Set response type to blob
            });

            // Handle the blob response as needed
            item.imageDownload = URL.createObjectURL(downloadResponse.data);
            console.log(downloadResponse); // Log or process the blob response
          }
        });

      } else {
        this.showMsg(response.data?.message, 'negative');
      }
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }
},

    editDataFun(val) {
      let item = {
        title: val.chapterTitle,
        description: val.description,
        id: val.id,
        cover: '',
        file:val.videoFilePath
      };
      
  console.log('Original Cover Path:', val.videoCoverPath);

// Define the base URL to remove
const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
const removevideoCoverPath = baseUrl + 'fs/download/';

// Function to get cover Blob via a POST request
async function fetchCoverBlob(videoCoverPath) {
  try {
    // Remove the base URL part from videoCoverPath
    const filename = videoCoverPath.replace(removevideoCoverPath, '');
    console.log("Filename:", filename);

    // Create a FormData object and append the filename
    const formData = new FormData();
    formData.append('filename', filename);

    // Send POST request with FormData
    const postvideoCoverPath = baseUrl + 'fs/download';
    const response = await axios.post(postvideoCoverPath, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure the correct content type is set
      },
      responseType: 'blob' // Request response as a Blob
    });

    // Convert Blob to a URL
    if (response.status === 200) {
      return URL.createObjectURL(response.data); // Create an object URL for the Blob
    } else {
      console.error('Failed to fetch cover Blob:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching cover Blob:', error);
    return null;
  }
}

// Fetch the cover Blob and then proceed
fetchCoverBlob(val.videoCoverPath).then((coverUrl) => {
  if (coverUrl) {
    item.cover = coverUrl;
    console.log('Updated Cover URL:', item.cover);
  } else {
    // Handle the case where cover URL couldn't be fetched
    console.warn('Cover URL could not be fetched, proceeding without cover.');
  }

      this.createFile('update Chapter', item);
    });
    },

    createFile(title, item) {
  let params = {
    title: title ?? 'Create Chapter',
     url: item?.id ? `${urls.videoChaptersCreateUrl}/${item?.id}` : urls.videoChaptersCreateUrl,
    // url: urls.videoChaptersCreateUrl, // Use the specific URL for creating new chapters
    item: item,
    videoId: this.videoId,
    chapter: true,
    requiredCategory: false,
    parentKey: 'videoId',
    coverKey: "videoCoverPath",
    fileKey: "videoFilePath",
    fileAccept: "video/mp4,video/x-m4v,video/*",
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

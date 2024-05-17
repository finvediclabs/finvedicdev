<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading backArrow :loading="loading"><span class="User_heading" >Presentations</span></fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Add New" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder" no-caps
          @click="createFile()" />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="presentations" select @reCall="getPresentationsData()" @editFun="editDataFun"
        :loading="loading" showChapters @showChapters="showChaptersList" allowDelete :delete-url="deleteUrl" />
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import axios from 'axios';
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import FinTable from "src/components/FinTable.vue";
import { urls } from "../Urls"
import CryptoJS from 'crypto-js'
export default {
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
    FinTable
  },
  data() {
    return {
      deleteUrl: urls.presentationsUrl,
      loading: false,
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Cover', key: 'imageDownload', align: 'start', type: 'image' },
        { label: 'Title', key: 'heading', align: 'start', width: '150px' },
        { label: 'Description', key: 'description', align: 'start', width: '250px' },
      ],
      presentations: [],
    }
  },
  mounted() {
    this.getPresentationsData();
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
    getPresentationsData() {
  if (!this.loading) {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
            const removeImagePath = baseUrl + 'fs/download/';
          
    this.loading = true;
    this.$api.get(urls.presentationsUrl)
      .then(async response => {
        this.loading = false;
        if (response.data.success) {
          // this.presentations = response.data.data.map((item, index) => ({ ...item, index: index + 1,imageDownload: item.videoCoverPath.replace('http://localhost:8083/fs/download/', '') }) }));
          this.presentations  = response.data.data.map((item, index) => ({ ...item, index: index + 1, imageDownload: item.videoCoverPath.replace(removeImagePath, '') }));
          // Log the imageDownload of each item in presentations
          this.presentations.forEach(async item => {
            const image = item.imageDownload;
            console.log(image);
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
              console.log(downloadResponse); // Log or process the blob response
            }
          });
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      })
      .catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
  }
},
    editDataFun(val) {
      let item = {
        title: val.heading,
        description: val.description,
        id: val.id,
        cover: val.videoCoverPath,
        categoryId: val.categoryId,
        subCategoryId: val.subCategory
      };
      this.createFile('Update Presentation', item)
    },
    showChaptersList(book) {
      this.$router.push({ path: `presentations/chapter/${book.id}` })
    },
    createFile(title, item) {
      let params = {
        title: title ?? 'Create presentation',
        url: item?.id ? `${urls.presentationsUrl}/${item.id}` : urls.presentationsUrl,
        item: item,
        coverKey: 'videoCoverPath'
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
<style>
.User_heading{
  color:#5479F7;
  margin-left:4%;
}
</style>
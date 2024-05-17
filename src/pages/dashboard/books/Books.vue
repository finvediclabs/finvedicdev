<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow><span class="User_heading" >Books</span></fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Add Book" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder" no-caps
          @click="createFile()" />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="booksList" select @reCall="getBooksData()" allowDelete :delete-url="deleteUrl"
        @editFun="editDataFun" :loading="loading" showChapters @showChapters="showChaptersList" />
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
  name: 'books',
  components: {
    FinTable,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      deleteUrl: urls.booksDataUrl,
      loading: false,
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Cover', key: 'imageDownload', align: 'start', type: 'image' },
        { label: 'Title', key: 'heading', align: 'start', width: '150px' },
        { label: 'Description', key: 'description', align: 'start', width: '250px' },
      ],
      booksList: []
    }
  },
  mounted() {
    this.getBooksData();
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
    async getBooksData() {
  if (!this.loading) {
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
            const removeImagePath = baseUrl + 'fs/download/';
          const imagePath = baseUrl + 'fs/download'
    this.loading = true;
    try {
      const response = await this.$api.get(urls.booksDataUrl);
      this.loading = false;
      if (response.data.success) {
        this.booksList = response.data.data.map((item, index) => ({
          ...item,
          index: index + 1,
          imageDownload: item.imagePath.replace(removeImagePath, ''),
        }));
        
        // Log the imageDownload of each item in booksList
        this.booksList.forEach(async item => {
          const image = item.imageDownload;
          console.log(image);
          // Check if image exists
          if (image) {
            // Create form data
            const formData = new FormData();
            formData.append('filename', image);
            
            // Send form data to http://localhost:8083/fs/download
            const downloadResponse = await axios.post(imagePath, formData, {
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
      this.showMsg(error.response?.data.message || error.message, 'negative');
    }
  }
},

    editDataFun(val) {
      let item = {
        title: val.heading,
        description: val.description,
        id: val.id,
        cover: val.imagePath,
        categoryId: val.categoryId,
        subCategoryId: val.subCategory
      };
      this.createFile('Update Book', item);
    },
    showChaptersList(book) {
      this.$router.push({ path: `books/chapter/${book.id}` })
    },
    createFile(title, item) {
      var params = {
        title: title ?? 'Create Book',
        url: item?.id ? `${urls.booksDataUrl}/${item.id}` : urls.booksDataUrl,
        item: item,
        requiredCategory: false,
        coverKey: 'imagePath'
      };
      params = JSON.stringify(params);
      this.$router.push({
        path: '/admin/create',
        query: {
          params: CryptoJS.AES.encrypt(params, 'fileData').toString()
        }
      });
    }
  },
}
</script>
<style>
.User_heading{
  color:#5479F7;
  margin-left:4%;
}
</style>

<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Books</fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="this.createFile()">
          <q-btn  label="Add Book" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
          no-caps />
        </router-link>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="booksList" select @reCall="getBooksData()" allowDelete delete-url=""
        @editFun="editDataFun" :loading="loading" showChapters @showChapters="showChaptersList" />
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinTable from "src/components/FinTable.vue"
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { urls } from "../urls"
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
      loading: false,
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Cover', key: 'imagePath', align: 'start', type: 'image' },
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
    getBooksData() {
      if (!this.loading) {
        this.loading = true;
        this.$api.get(urls.booksDataUrl).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.booksList = response.data.data.map((item, index) =>({ ...item, index: index + 1 }));
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
        }).catch(error => {
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
        cover: val.imagePath,
        categoryId: val.categoryId,
        subCategoryId: val.subCategory
      };
      this.createFile('Update Book',item);
    },
    showChaptersList(book) {
      this.$router.push({ path: `books/chapter/${book.id}` })
    },
    createFile(title, item, id) {
      let params = {
        title: title ?? 'Create Book',
        url: item?.id ? `${urls.booksDataUrl}/${item.id}` : urls.booksDataUrl,
        item: item,
        requiredCataloge: false,
        coverKey: 'imagePath'
      };
      const text = JSON.stringify(params);
      // text = CryptoJS.AES.encrypt(editedEvent, 'objects').toString();
      if (item) {
        this.$router.push({
          path: 'create',
          query: {
            data: text
          }
        });
      } else {
        return `create?data=${text}`;
      }
    }
  },
}
</script>

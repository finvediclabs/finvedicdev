<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading backArrow :loading="loading">Prasentations</fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="createFile()">
          <q-btn label="Add New" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
          no-caps/>
        </router-link>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="prasentations" select @reCall="getPrasentationsData()" @editFun="editDataFun"
        :loading="loading" showChapters @showChapters="showChaptersList" allowDelete :delete-url="deleteUrl"/>
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import FinTable from "src/components/FinTable.vue";
import { urls } from "../urls"
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
      deleteUrl: urls.prasentationsUrl,
      loading: false,
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Cover', key: 'videoCoverPath', align: 'start', type: 'image' },
        { label: 'Title', key: 'heading', align: 'start', width: '150px' },
        { label: 'Description', key: 'description', align: 'start', width: '250px' },
      ],
      prasentations: [],
    }
  },
  mounted() {
    this.getPrasentationsData();
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
    getPrasentationsData() {
      this.loading = true;
      this.$api.get(urls.prasentationsUrl).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.prasentations = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
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
      this.createFile('Update Prasentation', item)
    },
    showChaptersList(book) {
      this.$router.push({ path: `prasentations/chapter/${book.id}` })
    },
    createFile(title, item) {
      let params = {
        title: title ?? 'Create Prasention',
        url: item?.id ? `${urls.prasentationsUrl}/${item.id}` : urls.prasentationsUrl,
        item: item,
        coverKey: 'videoCoverPath'
      };
      let text = JSON.stringify(params);
      // text = CryptoJS.AES.encrypt(editedEvent, "fileTypes").toString();
      if (item) {
        this.$router.push({
          path: 'create',
          query: {
            data: text
          }
        });
      } else {
        return `/admin/create?data=${text}`;
      }
    }
  }
}
</script>

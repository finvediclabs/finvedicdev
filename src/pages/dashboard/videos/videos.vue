<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Videos</fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="createFile()">
          <q-btn label="Create Video" icon="add" color="blue-15"
            class="fin-br-8 text-subtitle1 text-weight-bolder q-px-md" dense no-caps />
        </router-link>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-table :columns="header" :data="videosList" select @reCall="getVideosData()" @editFun="editDataFun"
        :loading="loading" showChapters @showChapters="showChaptersList" />
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
  name: 'videos',
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
        { label: 'Cover', key: 'videoCoverPath', align: 'start', type: 'image' },
        { label: 'Title', key: 'heading', align: 'start' },
        { label: 'Description', key: 'description', align: 'start' },
      ],
      videosList: []
    }
  },
  mounted() {
    this.getVideosData();
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
    getVideosData() {
      if (!this.loading) {
        this.loading = true;
        this.$api.get(urls.videoDataUrl).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.videosList = response.data.data.map((item, index) =>({ ...item, index: index + 1 }));
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
        cover: val.videoCoverPath,
        categoryId: val.categoryId,
        subCategoryId: val.subCategory
      };
      this.createFile( 'Update Video' ,item);
    },
    showChaptersList( video) {
      this.$router.push({ path: `videos/chapter/${video.id}` })
    },
    createFile(title ,item) {
      let params = {
        title: title ?? 'Create Video',
        url: item?.id ? `${urls.videoDataUrl}/${item.id}` : urls.videoDataUrl,
        item: item
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
  },
}
</script>



<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Chapters List : {{ videoId }}</fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="this.createFile()">
          <q-btn label="Create Chapter" outline icon="add" class="q-px-sm" color="blue-8" />
        </router-link>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-table :columns="header" :data="chaptersList" select @reCall="getChaptersData()" @editFun="editDataFun"
        :loading="loading" />
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
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Cover', key: 'videoFilePath', align: 'start', type: 'image' },
        { label: 'Title', key: 'chapterTitle', align: 'start' },
        { label: 'Description', key: 'description', align: 'start' },
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
    getChaptersData() {
      if (this.videoId) {
        this.loading = true;
        this.$api.get(urls.videoChaptersUrl, {
          params: {
            videoId: this.videoId
          }
        }).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.chaptersList = response.data.data.map((item, index) =>({ ...item, index: index + 1 }));
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
        }).catch((error) => {
          this.loading = false;
          console.log(error);
        })
      }
    },
    editDataFun(val) {
      let item = {
        title: val.chapterTitle,
        description: val.description,
        id: val.id,
        cover: val.videoFilePath
      };
      this.createFile('update Chapter', item);
    },
    createFile(title, item) {
      let params = {
        title: title ?? 'Create Chapter',
        url: item?.id ? `${urls.videoChaptersUrl}/${item.id}` : urls.videoChaptersUrl ,
        item: item,
        chapter: true,
        requiredCataloge: false,
        parentKey: 'videoId',
        videoId: this.videoId,
        fileKey:"videoFilePath",
        coverRequired: false,
        fileAccept: "video/mp4,video/x-m4v,video/*",
      };
      let text = JSON.stringify(params);
      // text = CryptoJS.AES.encrypt(editedEvent, "fileTypes").toString();
      if (item) {
        this.$router.push({
          path: '/admin/create',
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

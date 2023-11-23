<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Chapters List : {{ presentationId }}</fin-portlet-heading>
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
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Cover', key: 'chapterImagePath', align: 'start', type: 'image' },
        { label: 'Title', key: 'chapterTitle', align: 'start' },
        { label: 'Description', key: 'description', align: 'start' },
      ],
      chaptersList: [],
      loading: true,
    }
  },
  computed: {
    presentationId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getChaptersData();
  },
  watch: {
    presentationId() {
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
      if (this.presentationId) {
        this.loading = true;
        this.$api.get(urls.prasentationChapterUrl, {
          params: {
            presentationId: this.presentationId
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
        })
      }
    },
    editDataFun(val) {
      let item = {
        title: val.chapterTitle,
        description: val.description,
        id: val.id,
        file: val.presentationFilePath,
      };
      this.createFile('Update Chapter', item);
    },
    createFile(title, item) {
      let params = {
        title: title ?? 'Create Chapter',
        url: item?.id ? `${urls.prasentationChapterUrl}/${item?.id}` : urls.prasentationChapterUrl,
        item: item,
        presentationId: this.presentationId,
        chapter: true,
        requiredCataloge: false,
        parentKey: 'presentationId',
        fileKey: "presentationFilePath",
        coverRequired: false,
        fileAccept: ".doc, .docx,.ppt, .pptx, .pdf",
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

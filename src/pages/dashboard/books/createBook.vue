<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>
        Books Section
      </fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Create Book" icon="add" color="blue-15" class="fin-br-8 text-subtitle1 text-weight-bolder q-px-md"
          dense no-caps />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item>
      <q-form @submit="createBook">
        <div class="row justify-center">
          <div class="col-12 col-md-6 ">
            <fin-portlet-item class="full-width q-pa-md">
              <q-input v-model="title" filled label="Title"  lazy-rules
                :rules="[val => val && val.length > 0 || 'Title Is required']"/>
            </fin-portlet-item>
            <fin-portlet-item class="full-width q-pa-md">
              <q-input v-model="description" filled type="textarea" label="Description"  rows="12"  lazy-rules
                :rules="[val => val && val.length > 0 || 'Discription Is required']"/>
            </fin-portlet-item>
          </div>
          <div class="col-12 col-md-4 q-pa-md text-center">
            <drop-file @update="selectFilesData" />
            <div style="height: 20px;font-size: 14px;" class="text-red q-pt-sm" v-if="!cover.length">
              {{ errorFile }}
            </div>
          </div>
          <div class="col-12 col-lg-10 q-pa-md text-start">
            <q-btn type="submit" label="Save" no-caps size="lg" class="q-px-xl shadow-1 bg-blue-15 text-white" :disable="loading">
              <q-spinner-facebook size="xs" class="q-ml-sm" v-if="loading" />
            </q-btn>
          </div>
        </div>
      </q-form>
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import DropFile from "src/components/dropFile/DropFile.vue"
import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";
import { urls } from "../urls"
export default {
  setup() {
    const profileStore = useProfileStore();
    const { profile } = storeToRefs(profileStore);
    return {
      profile
    }
  },
  name: 'create-book',
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
    DropFile
  },
  data() {
    return {
      title: "",
      description: "",
      cover: [],
      errorFile: '',
      loading: false,
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
    ChangeCover() {
      this.cover = this.$refs.file.values;
    },
    createBook() {
      if(!this.cover.length) {
        this.errorFile = "Image Is required";
        return false;
      }
      let formData = new FormData();
      formData.append('accountId', this.profile?.id);
      formData.append('description', this.description);
      formData.append('heading', this.title);
      formData.append('image', this.cover[0]);
      formData.append('id', '');
      if (!this.loading) {
        this.loading = true;
        this.$api.post(urls.booksDataUrl, formData).then(response => {
          this.loading = false;
          if(response.data.success) {
            this.showMsg(response.data?.message, 'positive');
            this.$router.push({path: '/admin/books'});
          } else {
            this.showMsg(response.data?.message, 'negative');
          }
        }).catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        })
      }

    },
    selectFilesData(val) {
      this.cover = val;
    },
  }
}
</script>

<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow> {{ queryData.title }}</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item>
      <q-form @submit="validatePostData">
        <div class="row justify-center">
          <div class="col-10 q-pb-lg">
            <div class="row">
              <div v-for="category in categories" class="col q-pa-sm">
                <q-btn :label="category.categoryName" no-caps v-if="!subCategories[category.id]" class="full-width"
                  size="lg" :class="selectedCategory?.id == category.id ? 'bg-finvedic text-white' : ''"
                  @click="selectCategory(category)" />

                <q-btn-dropdown :label="category.categoryName" no-caps v-if="subCategories[category.id]"
                  class="full-width" :class="{ 'bg-finvedic text-white': selectedCategory?.id === category.id }"
                  size="lg">
                  <q-list>
                    <q-item v-for="subCategory in subCategories[category.id]" clickable v-close-popup
                      @click="selectSubCategory(category, subCategory)"
                      :class="{ 'bg-finvedic text-white': selectedSubCategory?.id == subCategory.id }">
                      <q-item-section>
                        <q-item-label><b>{{ subCategory.subCategoryName }}</b></q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                <div v-if="selectedCategory?.id && subCategories[selectedCategory.id] && !selectedSubCategory?.id">
                  {{ error[selectedCategory.id] }}
                </div>
              </div>
            </div>
            <div v-if="!selectedCategory?.id" class="text-red" style="height: 20px;font-size: 14px;">{{ error.category }}
            </div>
          </div>
          <div class="col-12 col-md-6 ">
            <fin-portlet-item class="full-width q-pa-md">
              <q-input v-model="title" filled label="Title" lazy-rules
                :rules="[val => val && val.length > 0 || 'Title Is required']" />
            </fin-portlet-item>
            <fin-portlet-item class="full-width q-pa-md">
              <q-input v-model="description" filled type="textarea" label="Description" rows="12" lazy-rules
                :rules="[val => val && val.length > 0 || 'Discription Is required']" />
            </fin-portlet-item>
          </div>
          <div class="col-12 col-md-4 q-pa-md text-center">
            <drop-file @update="selectFilesData" />
            <div style="height: 20px;font-size: 14px;" class="text-red q-pt-sm" v-if="!cover.length">
              {{ errorFile }}
            </div>
          </div>
          <div class="col-12 col-lg-10 q-pa-md text-start">
            <q-btn type="submit" label="Save" no-caps size="lg" class="q-px-xl shadow-1 bg-blue-15 text-white"
              :disable="loading">
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
import { useCategorieStore } from "src/stores/Categories";
import CryptoJS from 'crypto-js'
export default {
  setup() {
    const profileStore = useProfileStore();
    const { profile } = storeToRefs(profileStore);
    const categorieStore = useCategorieStore();
    const { categories, subCategories } = storeToRefs(categorieStore);
    return { profile, categories, subCategories }
  },
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
      queryData: {},
      selectedCategory: {},
      selectedSubCategory: {},
      videoCoverPath: '',
      error: {}
    }
  },
  mounted() {
    let data = this.$route.query.data; //CryptoJS.AES.decrypt(this.$route.query.data, 'objects').toString(CryptoJS.enc.Utf-8);
    this.queryData = data ? JSON.parse(data) : data;
    if (this.queryData.item) {
      let item = this.queryData.item;
      this.title = item.title;
      this.description = item.description;
      this.id = item.id;
      this.cover = item.cover;
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
    validatePostData() {
      console.log(this.cover,this.selectedCategory?.id );
      if (this.cover.length && this.selectedCategory?.id) {
        alert('aaaaaaaaaaa')
        if (this.subCategories[this.selectedCategory?.id]) {
          alert('sub Cat');
          if (this.selectedSubCategory?.id) {
            this.uploadImg();
          } else {

            this.error[this.selectedCategory?.id] = 'Choose An Option'
          }
        } else {
          alert('category');
          this.uploadImg();
        }
      } else {
        alert('saaaaadddddddddddddddddddddddd')
        this.errorFile = "Image Is required";
        this.error.category = "Please Select An Option";
      }
    },
    uploadImg() {
      alert('hai');
      let formData = new FormData();
      formData.append('file', this.cover[0]);
      this.$api.post('fs/upload-file', formData).then(response => {
        this.videoCoverPath = response.data.uri;
        this.onSubmit();
      }).catch(error => {
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    onSubmit() {
      alert('called');
      let request = {
        accountId: this.profile?.id,
        description: this.description,
        heading: this.title,
        videoCoverPath: this.videoCoverPath,
        categoryId: this.selectedCategory.id
      }
      request.subCategory = this.selectedSubCategory.id;

      if (!this.loading) {
        this.loading = true;
        this.$api.post(this.queryData.url, request).then(response => {
          this.loading = false;
          if (response.data.success) {
            this.showMsg(response.data?.message, 'positive');
            this.$router.go(-1);
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
    selectCategory(category) {
      this.selectedCategory = category;
      this.selectedSubCategory = {};
    },
    selectSubCategory(category, subCategory) {
      this.selectedCategory = category;
      this.selectedSubCategory = subCategory;
    }
  }
}
</script>

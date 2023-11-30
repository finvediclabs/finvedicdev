<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>{{ queryParams.title }}</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item>
      <q-form @submit="validatePostData">
        <div class="row">
          <div class="col-12 q-pb-md" v-if="requiredCategory">
            <div class="row">

              <div v-for="category in categories" class="col-12 col-sm-4 q-px-md" style="white-space: nowrap;">
                <q-btn :label="category.categoryName" no-caps v-if="!subCategories[category.id]"
                  class="full-width shadow-3 fin-br-8" size="lg"
                  :class="selectedCategory?.id == category.id ? 'bg-finvedic text-white' : ''"
                  @click="selectCategory(category)" />

                <q-btn-dropdown :label="category.categoryName" no-caps v-if="subCategories[category.id]"
                  class="full-width shadow-3 fin-br-8"
                  :class="{ 'bg-finvedic text-white': selectedCategory?.id === category.id }" size="lg">
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
                <div class="errorMsgBox"
                  v-if="selectedCategory?.id && subCategories[selectedCategory.id] && !selectedSubCategory?.id">
                  <span>{{ errors[selectedCategory.id] }}</span>
                </div>
              </div>
            </div>
            <div class="q-px-md errorMsgBox">
              <span v-if="!selectedCategory?.id">{{ errors.category }}</span>
            </div>
          </div>

          <div class="col-12 col-md-7 q-px-md">

            <fin-portlet-item class="full-width q-my-md">
              <q-input v-model="title" borderless label="Title" class="shadow-3 fin-br-8 q-px-sm bg-grey-2" />
              <div class="errorMsgBox" style="height: 20px;font-size: 14px;">
                <span v-if="!title">{{ errors.title }}</span>
              </div>
            </fin-portlet-item>

            <fin-portlet-item class="full-width">
              <q-input v-model="description" borderless type="textarea" label="Description" rows="16"
                class="fin-br-8 shadow-3 q-pa-sm bg-grey-2" />
              <div class="errorMsgBox">
                <span v-if="!description">{{ errors.description }}</span>
              </div>
            </fin-portlet-item>

          </div>
          <div class="col-12 col-md-5 q-px-md">
            <div class="q-mx-auto" style="width: 200px;max-height: 300px;" v-if="coverRequired">
              <label class="text-weight-bolder">Cover</label>
              <div v-if="coverPath" class="shadow-3 dropzone-container">
                <q-btn class="q-pa-xs close-btn bg-grey-5" size="sm" icon="close" flat @click="coverPath = ''" />
                <q-img :src="coverPath" class="full-width preview-img" />
              </div>
              <drop-file @update="(val) => cover = val" :fileRef="'cover'" accept=".jpg, .jpeg, .png" min-size="512"
                max-size="30720" v-else />
              <div class="errorMsgBox">
                <span v-if="!cover.length">{{ errors.cover }}</span>
              </div>
            </div>

            <div class="q-mx-auto" style="width: 200px;max-height: 300px;" v-if="chapter">
              <label class="text-weight-bolder">File </label>
              <div v-if="filePath" class="shadow-3 dropzone-container">
                <q-btn class="q-pa-xs close-btn bg-grey-5" size="sm" icon="close" flat @click="filePath = ''" />
                <q-img :src="filePath" class="full-width preview-img" style="width: 180px;max-height: 180px;" />
              </div>
              <drop-file @update="(val) => files = val" :fileRef="'file'" :accept="fileAccept" min-size="512"
                max-size="30720" v-else />
              <div class=" errorMsgBox">
                <span v-if="!files.length">{{ errors.file }}</span>
              </div>
            </div>

          </div>
          <div class="col-12 col-lg-11 q-py-xl q-px-xl text-right">
            <q-btn type="submit" label="Save" no-caps size="lg" class="q-px-xl shadow-1 bg-blue-15 text-white"
              :disable="loading">
              <q-spinner-ios size="xs" class="q-ml-sm" v-if="loading" />
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
import { useCategoryStore } from "src/stores/Categories";
import CryptoJS from 'crypto-js'
import { isThisSecond } from "date-fns";
export default {
  setup() {
    const profileStore = useProfileStore();
    const { profile } = storeToRefs(profileStore);
    const categoryStore = useCategoryStore();
    const { categories, subCategories } = storeToRefs(categoryStore);
    return {
      profile,
      categories,
      subCategories
    }
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
      loading: false,
      queryParams: {},
      selectedCategory: {},
      selectedSubCategory: {},
      coverPath: '',
      errors: {},
      chapter: false,
      id: '',
      requiredCategory: true,
      parentKey: '',
      coverKey: '',
      fileKey: '',
      files: [],
      filePath: '',
      coverRequired: true,
      fileAccept: '',
    }
  },
  mounted() {
    let data = CryptoJS.AES.decrypt(this.$route.query.params, 'fileData').toString(CryptoJS.enc.Utf8);
    this.queryParams = JSON.parse(data);
    this.chapter = this.queryParams.chapter ?? false;
    this.requiredCategory = this.queryParams.requiredCategory ?? true;
    this.parentKey = this.queryParams?.parentKey;
    this.fileKey = this.queryParams?.fileKey;
    this.coverKey = this.queryParams?.coverKey;
    this.coverRequired = this.queryParams?.coverRequired ?? true;
    this.fileAccept = this.queryParams?.fileAccept;
    if (this.queryParams.item) {
      let item = this.queryParams.item;
      this.title = item.title;
      this.description = item.description;
      this.id = item.id;
      // this.cover[0] = item.cover;
      this.coverPath = item.cover;
      this.filePath = item.file;
      this.selectedCategory.id = item.categoryId;
      this.selectedSubCategory.id = item.subCategoryId;
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
    getRequest() {
      var request = {
        accountId: this.profile?.id,
        description: this.description,
      };

      request[this.coverKey] = this.coverPath;
      if (this.chapter) {
        request[this.parentKey] = this.queryParams[this.parentKey];
        request.chapterTitle = this.title;
        request[this.fileKey] = this.filePath;
      } else {
        request.heading = this.title;
      }

      if (this.requiredCategory) {
        request.categoryId = this.selectedCategory?.id;
        request.subCategory = this.selectedSubCategory?.id;
      }

      return request;
    },
    validatePostData() {
      var errorsCount = 0;
      if (this.requiredCategory) {
        if (!this.selectedCategory?.id) { errorsCount += 1; }
        if (this.subCategories[this.selectedCategory?.id]) {
          if (!this.selectedSubCategory?.id) {
            errorsCount += 1;
          }
        }
      }

      if (!this.title) { errorsCount += 1; }

      if (!this.description) { errorsCount += 1; }

      if (this.coverRequired) {
        (this.cover.length || this.coverPath) ? '' : errorsCount += 1;
      }
      if (this.chapter) {
        (this.files.length || this.filePath) ? '' : errorsCount += 1;
      }

      if (!errorsCount) {
        this.errors = {};
        if (this.id) {
          if (this.cover.length && this.coverRequired) { this.uploadImg(); }
          else if (this.files.length) { this.uploadFile(); }
          else {
            this.updateData();
          }
        } else {
          this.coverRequired ? this.uploadImg() : this.uploadFile();
        }
      } else {
        this.errors = {
          title: "Title Is required",
          description: "Description Is required",
          cover: "Cover image is required",
          file: "file is required",
          category: "Please Select Category",
        }
        if (this.requiredCategory) {
          this.errors[this.selectedCategory?.id] = 'Choose An Option';
        }
      }
    },

    uploadImg() {
      if (!this.loading) {
        this.loading = true;
        let formData = new FormData();
        formData.append('file', this.cover[0]);
        this.$api.post('fs/upload-file', formData).then(response => {
          this.coverPath = response.data.uri;
          this.nextFunction();
        }).catch(error => {
          this.showMsg(error.response?.data.message || error.message, 'negative');
        })
      }
    },
    nextFunction() {

      if (this.id) {
        this.chapter ? (this.files.length ? this.uploadFile() : this.updateData()) : this.updateData();
      } else {
        this.chapter ? this.uploadFile() : this.onSubmit();
      }
    },
    uploadFile() {
      this.loading = true;
      let formData = new FormData();
      formData.append('file', this.files[0]);
      this.$api.post('fs/upload-file', formData).then(response => {
        this.filePath = response.data.uri;
        if (this.id) {
          this.updateData();
        } else {
          this.onSubmit();
        }
      }).catch(error => {
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    onSubmit() {
      this.$api.post(this.queryParams.url, this.getRequest()).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.showMsg(response.data?.message || 'File Created Successfully', 'positive');
          this.$router.go(-1);
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        var message = error.response?.data.fieldErrors[0] ? error.response?.data.fieldErrors[0].field + ' ' + error.response?.data.fieldErrors[0].errorCode : '';
        this.showMsg(message || error.message, 'negative');
      })
    },

    updateData() {
      this.$api.put(this.queryParams.url, this.getRequest()).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.showMsg(response.data?.message || 'File Updated Successfully', 'positive');
          this.$router.go(-1);
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        var message = error.response?.data.fieldErrors[0] ? error.response?.data.fieldErrors[0].field + ' ' + error.response?.data.fieldErrors[0].errorCode : '';
        this.showMsg(message || error.message, 'negative');
      })
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
<style>
.dropzone-container {
  height: 200px;
  width: 200px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  background: rgba(0, 0, 0, 0.05);
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 9;
}

.preview-img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>

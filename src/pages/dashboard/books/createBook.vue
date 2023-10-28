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
              <q-input v-model="title" filled label="Title" class="shadow-3" />
            </fin-portlet-item>
            <fin-portlet-item class="full-width q-pa-md">
              <q-input v-model="description" filled type="textarea" label="Description" class="shadow-3" rows="12"/>
            </fin-portlet-item>
          </div>
          <div class="col-12 col-md-4 q-pa-md text-center">
            <drop-file @update="selectFilesData"/>
          </div>
          <div class="col-12 col-lg-10 q-pa-md text-start">
            <q-btn type="submit" label="Save" no-caps size="lg" class="q-px-xl shadow-1 bg-blue-15 text-white"></q-btn>
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
export default {
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
      cover: "",
    }
  },
  methods: {
    ChangeCover() {
      this.cover = this.$refs.file.values;
    },
    createBook() {

    },
    selectFilesData(val) {
      this.cover = val;
    },
  }
}
</script>

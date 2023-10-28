<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading">
        <q-icon name="arrow_back" class="text-grey-8 cursor-pointer" @click="$router.go(-1)" />
        Video Section
      </fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Create Book" icon="add" color="blue-15" class="fin-br-8 text-subtitle1 text-weight-bolder q-px-md"
          dense no-caps />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item>
      <q-form @submit="createBook">
        <div class="row">
          <div class="col-12 col-md-7 ">
            <fin-portlet-item class="full-width q-pa-md">
              <q-input v-model="title" filled label="Title" class="shadow-3" />
            </fin-portlet-item>
            <fin-portlet-item class="full-width q-pa-md">
              <q-input v-model="description" filled type="textarea" label="Description" class="shadow-3" />
            </fin-portlet-item>
          </div>
          <div class="col-12 col-md-5 q-pa-md text-center">
            <div class="flex justify-center q-pa-md">
              <div>
                <q-file v-model="cover" label="Label" filled id="filePick" class="videoSelecter">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <!-- <input type="file" id="filePick" @change="ChangeCover" ref="file" class="q-pa-md" > -->
                <div class="q-py-sm">
                  <strong class="q-py-sm">Or</strong>
                </div>
                <label for="filePick" class="full-width bg-blue-3 q-px-xl q-py-sm shadow-2 rounded-borders ">Browse
                </label>
              </div>
            </div>

          </div>
          <div class="col-12 q-pa-md text-right">
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
export default {
  name: 'create-book',
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
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

    }
  }
}
</script>
<style>
.videoSelecter .q-field__control {
  min-height: 200px;
  width: 240px
}
</style>

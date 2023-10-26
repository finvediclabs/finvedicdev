<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading">Books</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="q-pb-xl">
      <carousel-3d :totalSlides="booksData.length" :count="booksData.length" @beforeSlideChange="getCurrentSlide"
        :controls-visible="true">
        <slide v-for="(slide, i) in booksData" :key="i" :index="i">
          <q-img :src="slide.imagePath" class="fit" :alt="slide.heading"></q-img>
        </slide>
      </carousel-3d>
    </fin-portlet-item>
    <fin-portlte>
      <div class="row">
        <div class="col-12 col-md-6 flex q-pr-md">
          <q-avatar style="width:250px; height: 300px" square>
            <q-img :src="selectedSlide?.imagePath" class="fin-br-8 fit" style="border:1px solid #00000030"
              :alt="selectedSlide?.heading"></q-img>
          </q-avatar>
          <fin-portlet-heading class="q-pa-md" small>
            {{ selectedSlide?.heading }}
            <br>
            <p style="font-size: 14px;font-weight: 300;">
              {{ selectedSlide?.description }}
            </p>
          </fin-portlet-heading>


        </div>
        <div class="col-12 col-md-6  justify-center">
          <p>More Chapters</p>
          <div class="row ">
            <div class="col-2 col-md-4 col-lg-2 q-pa-sm" v-for="item in 12">
              <q-skeleton height="120px" />
            </div>
          </div>

        </div>
      </div>
    </fin-portlte>
  </fin-portlet>
</template>
<script lang="ts">
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { Carousel3d, Slide } from "src/components/carousel-3d";
import { urls } from "./urls"
export default {
  components: {
    Carousel3d,
    Slide,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      booksData: [],
      selectedSlide: {},
      loading: false,
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
    getCurrentSlide(index) {
      this.selectedSlide = this.booksData[index];
    },
    getBooksData() {
      this.loading = true;
      this.$api.get(urls.getBooksData).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.booksData = response.data.data.map(books => {
            return {
              id: books.id,
              accountId: books.accountId,
              description: books.description,
              heading: books.heading,
              imagePath: books.imagePath,
              createdAt: books.createdAt,
            }
          });
          this.selectedSlide = this.booksData.length ? this.booksData[0] : {};
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.message, 'negative');
      });
    }
  }
};
</script>

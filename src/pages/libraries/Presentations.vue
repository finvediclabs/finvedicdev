<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading">Presentations</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item>
      <div class="row q-pb-lg">
        <div v-for="category in categories" class="col-12 col-sm-4 q-pa-sm">
          <q-btn :label="category.categoryName" no-caps v-if="!subCategories[category.id]" class="full-width fin-br-8 shadow-2"
            size="lg" :class="selectedCategory?.id == category.id ? 'bg-finvedic text-white' : ''"
            @click="selectCategory(category)" />

          <q-btn-dropdown :label="category.categoryName" no-caps v-if="subCategories[category.id]"
            class="full-width fin-br-8 shadow-2" :class="{ 'bg-finvedic text-white': selectedCategory?.id === category.id }"
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
        </div>
      </div>
    </fin-portlet-item>
    <fin-portlet-item class="q-pb-xl" v-if="presentations.length">
      <carousel-3d :totalSlides="presentations.length" :count="presentations.length" @beforeSlideChange="getCurrentSlide"
        :controls-visible="true">
        <slide v-for="(slide, i) in presentations" :key="i" :index="i">
          <q-img :src="slide.imagePath ?? 'dummy'" class="fit" :alt="slide.heading">
            <template v-slot:error>
              <q-img :src="DummyBook" class="full-height full-width" />
            </template>
          </q-img>
        </slide>
      </carousel-3d>
    </fin-portlet-item>
    <fin-portlet-item v-else style="height: 272px" class="q-pb-xl">
      <div class="full-width full-height flex flex-center">
        <q-spinner-ios color="blue-9" size="3.5em" />
      </div>
    </fin-portlet-item>
    <fin-portlte>
      <div class="row">
        <div class="col-12 col-md-7 q-pr-md ">
          <div class="row">
            <div class="col-12 col-md-5 row justify-center">
              <q-avatar style="width:250px; height: 300px" square>
                <q-img :src="selectedSlide?.imagePath ?? 'dummy'" class="fin-br-8 fit" style="border:1px solid #00000030"
                  :alt="selectedSlide?.heading">
                  <template v-slot:error>
                    <q-img :src="DummyBook" class="full-height full-width" />
                  </template>
                </q-img>
              </q-avatar>
            </div>
            <div class="col-12 col-md-6">
              <fin-portlet-heading class="q-pa-md" small>
                {{ selectedSlide?.heading }}
                <br>
                <p style="font-size: 14px;font-weight: 300;">
                  {{ selectedSlide?.description }}
                </p>
              </fin-portlet-heading>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-12 col-md-4  justify-center self-end justify-end">
          <div class="row ">
            <div class="col-12" style="height: 300px;">
              <q-carousel swipeable animated v-model="slide" ref="carousel" infinite class="full-height"
                style="padding-top: 50px;">
                <template v-slot:control>
                  <q-carousel-control position="top-left" :offset="[20, 8]" class="text-black">
                    <span>More Chapters</span>
                  </q-carousel-control>
                  <q-carousel-control position="top-right" :offset="[20, 0]" class="q-gutter-xs">
                    <q-btn round dense class="shadow-2" text-color="black" icon="chevron_left"
                      @click="$refs.carousel.previous()" />
                    <q-btn round dense class="shadow-2" text-color="black" icon="chevron_right"
                      @click="$refs.carousel.next()" />
                  </q-carousel-control>
                </template>
                <template v-if="chaptersLoader">
                  <q-carousel-slide :name="0" class="rounded-borders text-italic">
                    <div class="row full-height">
                      <div class="col-6 q-px-sm fin-br-8" style="height:100px" v-for="item in 4">
                        <q-skeleton class="full-width full-height fin-br-8 shadow-1" style="background-color: #F5F5F5;" />
                      </div>
                    </div>
                  </q-carousel-slide>
                </template>

                <template v-if="!chaptersLoader">
                  <template v-if="chaptersData.length">
                    <q-carousel-slide v-for="(slider, i) in allSlides" :name="i" class="items-end q-pa-none">
                      <div class="row full-height">
                        <div class="col-6 fin-br-8 q-px-sm" style="height:110px" v-for="item in slider">
                          <q-img class="full-height fin-br-8 shadow-2 cursor-pointer "
                            :src="item.presentationFilePath ?? 'dummy'" @click="visitChapter(item)">
                            <template v-slot:error>
                              <q-img :src="DummyBook" class="full-height full-width" />
                            </template>
                          </q-img>
                        </div>
                      </div>
                    </q-carousel-slide>
                  </template>

                  <template v-if="!chaptersData.length">
                    <q-carousel-slide :name="0" class="rounded-borders text-italic">
                      <div class="row full-height">
                        <div class="col-12 q-px-sm full-height">
                          <div square class="full-width full-height q-pa-md rounded-borders"
                            style="background-color: #F5F5F5;">
                            No Chapters Found
                          </div>
                        </div>
                      </div>
                    </q-carousel-slide>
                  </template>
                </template>

              </q-carousel>

            </div>
          </div>
        </div>
      </div>
    </fin-portlte>
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { Carousel3d, Slide } from "src/components/carousel-3d";
import { urls } from "./Urls"
import { storeToRefs } from "pinia";
import { useCategoryStore } from "src/stores/Categories";
import moment from "moment";
import DummyBook from "src/assets/dummyBook.jpg"
export default {
  setup() {
    const categoryStore = useCategoryStore();
    const { categories, subCategories, selectedCategory, selectedSubCategory } = storeToRefs(categoryStore);
    const { selectCategory, selectSubCategory } = categoryStore;
    return { categories, subCategories, selectedCategory, selectedSubCategory, selectCategory, selectSubCategory }
  },
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
      DummyBook: DummyBook,
      presentations: [],
      selectedSlide: {},
      loading: false,
      chaptersData: [],
      slide: 0,
      allSlides: [],
      chaptersLoader: false,
      loading: false,
    }
  },
  watch: {
    selectedSlide() {
      setTimeout(() => {
        this.getChaptersData();
      }, 500);
    },
    selectedCategory() {
      if (!this.selectedSubCategory?.id) {
        this.getPresentations();
      }
    },
    selectedSubCategory() {
      if (this.selectedSubCategory?.id) {
        this.getPresentations();
      }
    }
  },
  mounted() {
    if (this.selectedCategory) {
      this.getPresentations();
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
    getCurrentSlide(index) {
      this.selectedSlide = this.presentations[index];
    },
    getPresentations() {
      this.loading = true;
      let request = {
        params: {
          categoryId: this.selectedCategory.id
        }
      }
      if (this.selectedSubCategory && this.selectedCategory?.id == this.selectedSubCategory?.categoryCode) {
        request.params.subCategoryId = this.selectedSubCategory.id;
      }
      this.$api.get(urls.getPresentationsUrl, request).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.presentations = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
          this.selectedSlide = this.presentations.length ? this.presentations[0] : {};
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.message, 'negative');
      });
    },
    getChaptersData() {
      this.chaptersLoader = true;
      this.$api.get(urls.getPresentationChaptersUrl, {
        params: {
          presentationId: this.selectedSlide?.id
        }
      }).then(response => {
        this.chaptersLoader = false;
        if (response.data.success) {
          this.chaptersData = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
          this.getdummychapters(this.chaptersData);
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.chaptersLoader = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    getdummychapters(chapter) {
      let index = 0;
      let slide = [];
      for (let j = 0; j < chapter.length; j++) {
        slide.push(chapter[j]);
        this.allSlides[index] = slide;
        if ((j + 1) % 3 == 0) {
          index += 1;
          slide = [];
        }
      }
    },
    visitChapter(chapter) {
      let url = '/watch-video';
      let item = chapter.presentationFilePath ?? "https://youtu.be/VCtVrJLNR1c?si=O1pOuQo1s6492Qh-";
      this.$router.push({
        path: url,
        query: {
          item: item
        }
      })
    }
  }
};
</script>
./Urls

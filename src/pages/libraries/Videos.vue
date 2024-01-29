<template>
  <!--
  <div class="row q-pa-md">
    <q-btn-group spread rounded v-for="category in categories" class="col-12 col-sm-4">
      <q-btn  rounded glossy :label="category.categoryName"  no-caps  
      :class="selectedCategory?.id == 1 ? 'bg-finvedic text-white' : ''"
      @click="selectCategory(category)" />
    </q-btn-group>
  </div>
  -->
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading>Videos</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item>
      <div class="row q-pb-lg">
        <div v-for="category in categories" class="col-12 col-sm-4 q-pa-sm">
          <q-btn :label="category.categoryName" no-caps
            class="full-width fin-br-8 shadow-2" size="lg"
            :class="selectedCategory?.id == category.id ? 'bg-finvedic text-white' : ''"
            @click="selectCategory(category)" />
        </div>
      </div>
    </fin-portlet-item>
    <fin-portlet-item class="q-pb-xl" v-if="VideosList.length">
      <carousel-3d :totalSlides="VideosList.length" :count="VideosList.length" @beforeSlideChange="getCurrentSlide"
        :controls-visible="true" :width="384" height="216">
        <slide v-for="(slide, i) in VideosList" :key="i" :index="i">
          <q-img :src="slide.videoCoverPath ?? 'dummy'" class="fit" :alt="slide.heading">
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

    <fin-portlet>
      <div class="row">
        <div class="col-12 col-md-5 q-pt-lg q-px-lg">
          <q-img :src="selectedSlide.videoCoverPath" :ratio="16 / 9" class="fin-br-8 shadow-1" />
          <fin-portlet-heading class="q-pa-md" small>
            {{ selectedSlide?.heading }}
            <br>
            <p style="font-size: 14px;font-weight: 300;">
              {{ selectedSlide?.description }}
            </p>
          </fin-portlet-heading>
        </div>
        <div class="col-3"></div>
        <div class="col-12 col-md-4 column justify-top q-pt-lg items-end">
          <div class="row full-width ">
            <div class="col-12 bg-blue" style="height: 300px;">
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
                  <template v-if="chapters.length">
                    <q-carousel-slide v-for="(slider, i) in allSlides" :name="i" class="items-end q-pa-none">
                      <div class="row full-height">
                        <div class="col-6 fin-br-8 q-px-sm" style="height:110px" v-for="item in slider">
                          <q-img class="full-height fin-br-8 shadow-2 cursor-pointer"
                            :src="item.videoCoverPath ?? 'dummy'" @click="visitChapter(item)">
                            <template v-slot:error>
                              <q-img :src="DummyBook" class="full-height full-width" />
                            </template>
                          </q-img>
                        </div>
                      </div>
                    </q-carousel-slide>
                  </template>

                  <template v-if="!chapters.length">
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
    </fin-portlet>
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
import DummyBook from "src/assets/dummyBook.jpg"
import moment from "moment"
import CryptoJS from 'crypto-js'
import ViewJs from "src/components/viewjs.vue"
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
    ViewJs
  },
  data() {
    return {
      DummyBook: DummyBook,
      VideosList: [],
      selectedSlide: {},
      loading: false,
      chapters: [],
      slide: 0,
      allSlides: [],
      chaptersLoader: false,
      loading: false,
      slideWidth: window.innerWidth < 470 ? window.innerWidth - 30 : 450,
    }
  },
  computed: {
    selectedVideoData() {
      return {
        allowFullScreen: true,
        preload: 'auto',
        sources: [
          {
            url: this.selectedSlide?.videoCoverPath,
            type: 'video/mp4'
          },
        ]
      }
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
        this.getVideosData();
      }
    },
    selectedSubCategory() {
      if (this.selectedSubCategory?.id) {
        this.getVideosData();
      }
    }
  },
  mounted() {
    if (this.selectedCategory) {
      this.getVideosData();
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
      this.selectedSlide = this.VideosList[index];
    },
    getVideosData() {
      this.loading = true;
      //let request = {
       // params: {
       //   categoryId: this.selectCategory.id
       // }
      //}
      this.$api.get(urls.getVideosUrl,{
        params: {
          categoryId: this.selectedCategory?.id
        }
      }).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.VideosList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
          this.selectedSlide = this.VideosList.length ? this.VideosList[0] : {};
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
      this.$api.get(urls.getVideoChaptersUrl, {
        params: {
          videoId: this.selectedSlide?.id
        }
      }).then(response => {
        this.chaptersLoader = false;
        if (response.data.success) {
          this.chapters = response.data.data.map((item, index) => {
            return {
            
              index: index + 1,
              id: item.id,
              videoId: item.videoId,
              accountId: item.accountId,
              description: item.description,
              chapterTitle: item.chapterTitle,
              videoCoverPath: item.videoCoverPath,
              videoFilePath: item.videoFilePath,
              createdAt: moment(item.createdAt).format('YYYY-MM-DD'),
              updatedAt: moment(item.updatedAt).format('YYYY-MM-DD'),
              deletedAt: moment(item.deletedAt).format('YYYY-MM-DD')
            }
          }); this.getDummyChapters(this.chapters);
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.chaptersLoader = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    getDummyChapters(chapter) {
      let index = 0;
      let slide = [];
      for (let j = 0; j < chapter.length; j++) {
        slide.push(chapter[j]);
        this.allSlides[index] = slide;
        if ((j + 1) % 4 == 0) {
          index += 1;
          slide = [];
        }
      }
    },
    visitChapter(chapter) {
      var ext = chapter.videoFilePath?.substr(chapter.videoFilePath.lastIndexOf('.') + 1);
      let url = '/watch-video';
      if(ext == 'pptx' ) { url = '/watch-ppt'; }
      else if(ext == 'mp4') { url = '/watch-video'; }
      else if(ext == 'pdf') { url = '/read-pdf'; }
      let item = chapter.description;
      this.$router.push({
        path: url,
        query: {
          item: CryptoJS.AES.encrypt(item, 'fileData').toString()
        }
      })
    }
  }
};
</script>

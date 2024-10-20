<template>
  <fin-portlet>
    <fin-portlet-header> </fin-portlet-header>
    <div class="row totalView">
      <div class="col-3 topView">
        <fin-portlet-item>
          <div class="row q-lg">
            <q-btn-group class="style_for_q_btn" style="flex-direction: column;">
              <div v-for="category in categories" class="full-width">
                <q-btn
                  unelevated
                  rounded
                  :label="category.categoryName"
                  no-caps
                  v-if="!subCategories[category.id]"
                  class="full-width padding_zero"
                  size="m"
                  :class="{
                    'white-background':
                      !selectedCategory || selectedCategory.id !== category.id,
                    'bg-finvedic text-white':
                      selectedCategory && selectedCategory.id === category.id,
                  }"
                  @click="selectCategory(category)"
                  style="
                    margin-bottom: 10%;
                    padding-top: 5%;
                    padding-bottom: 5%;
                  "
                />


                <q-btn-dropdown
                  unelevated
                  rounded
                  :label="category.categoryName"
                  no-caps
                  v-if="subCategories[category.id]"
                  class="full-width padding_zero"
                  :class="{
                    'white-background':
                      !selectedCategory || selectedCategory.id !== category.id,
                    'bg-finvedic text-white':
                      selectedCategory && selectedCategory.id === category.id,
                  }"
                  size="m"
                  style="padding-top: 5%; padding-bottom: 5%"
                >
                  <q-list>
                    <q-item
                      v-for="subCategory in subCategories[category.id]"
                      clickable
                      v-close-popup
                      @click="selectSubCategory(category, subCategory)"
                      :class="{
                        'bg-finvedic text-white':
                          selectedSubCategory?.id == subCategory.id,
                      }"
                    >
                      <q-item-section>
                        <q-item-label
                          ><b>{{
                            subCategory.subCategoryName
                          }}</b></q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </q-btn-group>
          </div>
        </fin-portlet-item>

      </div>
      <div class="col-9 right_side topView">
        <fin-portlet-item class="q-pb-xl" v-if="VideosList.length">
          <carousel-3d
            :totalSlides="VideosList.length"
            :count="VideosList.length"
            @beforeSlideChange="getCurrentSlide"
            :controls-visible="true"
            :width="responsiveWidth"
            :height="responsiveHeight"
          >
            <slide
              v-for="(slide, i) in VideosList"
              :key="i"
              :index="i"
              style="max-height: 80%"
            >
              <q-img
                :src="slide.videoCoverPath ?? 'dummy'"
                class="fit"
                :alt="slide.heading"
              >
                <template v-slot:error>
                  <q-img :src="DummyBook" class="full-height full-width" />
                </template>
              </q-img>
            </slide>
          </carousel-3d>
        </fin-portlet-item>
        <fin-portlet-item v-else class="q-pb-xl">
          <carousel-3d :totalSlides="5" :count="5" @beforeSlideChange="getCurrentSlide"
                 :controls-visible="true" :width="responsiveWidth" :height="responsiveHeight">
      <slide v-for="i in Array.from({ length: 5 }).map((_, index) => index)" :key="i" :index="i" style="max-height:80%;">
        <q-img :src="DummyBook_2" class="fit" alt="Dummy Book">
          <template v-slot:error>
            <q-img :src="FallbackBook" class="full-height full-width" />
          </template>
        </q-img>
      </slide>
    </carousel-3d>
        </fin-portlet-item>
      </div>
    </div>

    <div class="row col-12 bottom_div1">
      <template  v-if="VideosList.length">
      <div class="col-6 mx-auto row single_video">
        <q-img
          :src="selectedSlide.videoCoverPath"
          :ratio="16 / 9"
          class="fin-br-8 shadow-1"
          style="width: 78%; height: 78%"
        />
        <div class="heading">
          <span class="heading_h4" style="margin-bottom: 2%"
            ><span style="color: #5479f7">Module Name: </span>
            {{ selectedSlide?.heading }}
          </span>
          <p style="font-size: 14px; font-weight: 400">
            <span style="color: #5479f7">Description: </span
            >{{ selectedSlide?.description }}
          </p>
        </div>
      </div>
    </template>
    <template  v-if="!VideosList.length">
      <div class="col-6 mx-auto row single_video">
        <q-img
          :src="DummyBook_2"
          :ratio="16 / 9"
          class="fin-br-8 shadow-1"
          style="width: 78%; height: 78%"
        />
        <div class="heading">
          <span class="heading_h4" style="margin-bottom: 2%"
            ><span style="color: #5479f7">Module Name: </span>
            {{ selectedSlide?.heading }}
          </span>
          <p style="font-size: 14px; font-weight: 400">
            <span style="color: #5479f7">Description: </span
            >{{ selectedSlide?.description }}
          </p>
        </div>
      </div>
    </template>
      <div
        class="col-6"
        style="position: sticky; top: 10%; align-self: flex-start"
      >
        <q-carousel
          swipeable
          animated
          v-model="slide"
          ref="carousel"
          infinite
          class="full-height"
          style="padding-top: 20px"
        >
          <template v-if="chaptersLoader || !VideosList.length">
            <!-- <q-carousel-slide :name="0" class="rounded-borders text-italic">
              <div class="row full-height">
                <div
                  class="col-6 q-px-sm fin-br-8"
                  style="height: 100px"
                  v-for="item in 4"
                >
                  <q-skeleton
                    class="full-width full-height fin-br-8 shadow-1"
                    style="background-color: #f5f5f5"
                  />
                </div>
              </div>
            </q-carousel-slide> -->
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

          <template v-if="!chaptersLoader">
            <template v-if="chapters.length">
              <q-carousel-slide
                v-for="(slider, i) in allSlides"
                :name="i"
                class="items-end q-pa-none"
              >
                <div class="row">
                  <div
                    class="col-2"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <q-carousel-control
                      class="q-gutter-xs"
                      style="position: relative"
                    >
                      <q-btn
                        position="top-left"
                        round
                        dense
                        class="shadow-2"
                        text-color="white"
                        icon="chevron_left"
                        @click="$refs.carousel.previous()"
                        style="background-color: #5479f7"
                      />
                    </q-carousel-control>
                  </div>
                  <div class="col-8">
                    <div class="row chapters_show">
                      <div class="col-6 col-lg-6 mb-4" v-for="item in slider">
                        <div
                          class="fin-br-8"
                          style="
                            height: 100%;
                            padding-bottom: 10px;
                            padding-top: 10px;
                            width: 90%;
                            margin-left: auto;
                            margin-right: auto;
                          "
                        >
                          <q-img
                            class="full-height fin-br-8 shadow-2 cursor-pointer"
                            :src="item.videoCoverPath ?? 'dummy'"
                            @click="visitChapter(item)"
                          >
                            <template v-slot:error>
                              <q-img
                                :src="DummyBook"
                                class="full-height full-width"
                              />
                            </template>
                          </q-img>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-2"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <q-carousel-control
                      class="q-gutter-xs"
                      style="position: relative"
                    >
                      <q-btn
                        round
                        dense
                        class="shadow-2"
                        text-color="white"
                        icon="chevron_right"
                        @click="$refs.carousel.next()"
                        style="background-color: #5479f7"
                      />
                    </q-carousel-control>
                  </div>
                </div>
              </q-carousel-slide>
            </template>

            <template v-if="!chapters.length">
              <q-carousel-slide :name="0" class="rounded-borders text-italic">
                <div class="row full-height">
                  <div class="col-12 q-px-sm full-height">
                    <div
                      square
                      class="full-width full-height q-pa-md rounded-borders"
                      style="background-color: #f5f5f5"
                    >
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
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { Carousel3d, Slide } from "src/components/carousel-3d";
import { urls } from "./Urls";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "src/stores/Categories";
import { setToken } from "src/boot/axios";
import DummyBook from "src/assets/dummyBook.jpg";
import DummyBook_2 from "src/assets/video_pre.gif";
import moment from "moment";
import CryptoJS from "crypto-js";
import ViewJs from "src/components/viewjs.vue";
export default {
  setup() {
    const categoryStore = useCategoryStore();
    const { categories, subCategories, selectedCategory, selectedSubCategory } =
      storeToRefs(categoryStore);
    const { selectCategory, selectSubCategory } = categoryStore;
    return {
      categories,
      subCategories,
      selectedCategory,
      selectedSubCategory,
      selectCategory,
      selectSubCategory,
    };
  },
  components: {
    Carousel3d,
    Slide,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
    ViewJs,
  },
  data() {
    return {
      DummyBook: DummyBook,
      DummyBook_2: DummyBook_2,
      VideosList: [],
      selectedSlide: {},
      loading: false,
      chapters: [],
      slide: 0,
      allSlides: [],
      chaptersLoader: false,
      loading: false,
      responsiveHeight: "40vh",
      responsiveWidth: "80vw",
      slideWidth: window.innerWidth < 470 ? window.innerWidth - 30 : 450,
    };
  },
  created() {
    this.updateCarouselDimensions();
    window.addEventListener("resize", this.updateCarouselDimensions);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateCarouselDimensions);
  },
  computed: {
    selectedVideoData() {
      return {
        allowFullScreen: true,
        preload: "auto",
        sources: [
          {
            url: this.selectedSlide?.videoCoverPath,
            type: "video/mp4",
          },
        ],
      };
    },
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
    },
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
        position: "top-right",
        actions: [{ icon: "close", color: "white", handler: () => {} }],
      });
    },
    updateCarouselDimensions() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        this.responsiveHeight = "30vh"; // Height for small screens
        this.responsiveWidth = "90vw"; // Width for small screens
      } else if (screenWidth >= 600 && screenWidth < 1367) {
        this.responsiveHeight = "220vh"; // Height for medium screens
        this.responsiveWidth = "340"; // Width for medium screens
      } else if (screenWidth >= 1400 && screenWidth < 1602) {
        this.responsiveHeight = "300vh"; // Height for medium screens
        this.responsiveWidth = "400"; // Width for medium screens
      } else {
        this.responsiveHeight = "320vh"; // Height for large screens
        this.responsiveWidth = "480"; // Width for large screens
      }
    },
    getCurrentSlide(index) {
      this.selectedSlide = this.VideosList[index];
    },
    getVideosData() {
      this.loading = true;
      let request = {
        params: {
          categoryId: this.selectedCategory.id,
        },
      };
      if (
        this.selectedSubCategory &&
        this.selectedCategory?.id == this.selectedSubCategory?.categoryCode
      ) {
        request.params.subCategoryId = this.selectedSubCategory.id;
      }

      this.$api
        .get(urls.getVideosUrl, request)
        .then((response) => {
          this.loading = false;
          // console.log("Data from getbooksurl:", response.data);
          if (response.data.success) {
            this.VideosList = response.data.data.map((item, index) => ({
              ...item,
              index: index + 1,
            }));

            // Loop through each book and fetch imagePath for it
            this.VideosList.forEach((video) => {
              // Fetch imagePath and send it to download URL for each book
              if (video.videoCoverPath) {
                const baseUrl =
                  (process.env.VUE_APP_CORE_URL || "").replace(/\/$/g, "") +
                  "/";
                const getImagesUrl = baseUrl + "fs/download";
                const removeImagePath = baseUrl + "fs/download/";
                const imagePathWithoutPrefix = video.videoCoverPath.replace(
                  removeImagePath,
                  ""
                );
                const formData = new FormData();
                formData.append("filename", imagePathWithoutPrefix);

                this.$api
                  .post(getImagesUrl, formData, { responseType: "blob" })
                  .then((downloadResponse) => {
                    // Handle download success, e.g., open or save the downloaded file
                    const blob = new Blob([downloadResponse.data]);
                    const url = window.URL.createObjectURL(blob);
                    video.videoCoverPath = url; // Update imagePath with the received image URL
                  })
                  .then(() => {
                    // console.log("Post request successful"); // Log successful post request
                  })
                  .catch((error) => {
                    console.error("Error in post request:", error); // Log error in post request
                    this.showMsg(
                      error.response?.data.message || error.message,
                      "negative"
                    );
                  });
              }
            });

            this.selectedSlide = this.VideosList.length
              ? this.VideosList[0]
              : {};
          } else {
            this.showMsg(response.data?.message, "negative");
          }
        })
        .catch((error) => {
          this.loading = false;
          this.showMsg(error.message, "negative");
        });
    },
    getChaptersData() {
      this.chaptersLoader = true;
      this.chapters = [];
      this.allSlides=[];
      const formData = new FormData();
      formData.append("videoId", this.selectedSlide?.id);

      this.$api
        .post(urls.getVideoChaptersUrl, formData)
        .then((response) => {
          this.chaptersLoader = false;
          if (response.data.success) {
            this.chapters = response.data.data.map((item, index) => ({
              index: index + 1,
              id: item.id,
              videoId: item.videoId,
              accountId: item.accountId,
              description: item.description,
              chapterTitle: item.chapterTitle,
              videoCoverPath: item.videoCoverPath,
              videoFilePath: item.videoFilePath,
              createdAt: moment(item.createdAt).format("YYYY-MM-DD"),
              updatedAt: moment(item.updatedAt).format("YYYY-MM-DD"),
              deletedAt: moment(item.deletedAt).format("YYYY-MM-DD"),
            }));
            // Fetch imagePath and send it to download URL
            this.chapters.forEach((chapter) => {
              if (chapter.videoCoverPath) {
                const baseUrl =
                  (process.env.VUE_APP_CORE_URL || "").replace(/\/$/g, "") +
                  "/";
                const getImagesUrl = baseUrl + "fs/download";
                const removeImagePath = baseUrl + "fs/download/";
                const imagePathWithoutPrefix = chapter.videoCoverPath.replace(
                  removeImagePath,
                  ""
                );
                const formData = new FormData();

                formData.append("filename", imagePathWithoutPrefix);

                this.$api
                  .post(getImagesUrl, formData, { responseType: "blob" })
                  .then((downloadResponse) => {
                    const blob = new Blob([downloadResponse.data]);
                    const url = window.URL.createObjectURL(blob);
                    chapter.videoCoverPath = url; // Update imagePath with the received image URL
                  })
                  .catch((error) => {
                    console.error(
                      "Error in post request for imagePath:",
                      error
                    );
                    this.showMsg(
                      error.response?.data.message || error.message,
                      "negative"
                    );
                  });
              }
            });

            this.getDummyChapters(this.chapters);
            this.slide = 0;
          } else {
            // this.showMsg(response.data?.message, "negative");
          }
        })
        .catch((error) => {
          this.chaptersLoader = false;
          // this.showMsg(
          //   error.response?.data.message || error.message,
          //   "negative"
          // );
        });
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
      var ext = chapter.videoFilePath?.substr(
        chapter.videoFilePath.lastIndexOf(".") + 1
      );
      let url = "/watch-video";
      if (ext == "pptx") {
        url = "/watch-ppt";
      } else if (ext == "mp4") {
        url = "/watch-video";
      } else if (ext == "pdf") {
        url = "/read-pdf";
      }
      let item = chapter.videoFilePath;
      this.$router.push({
        path: url,
        query: {
          item: CryptoJS.AES.encrypt(item, "fileData").toString(),
        },
      });
    },
  },
};
</script>
<style>
.radio-button-group {
  display: flex;
}
.radio-button-group .item {
  width: 100%;
}
.row.q-lg {
  display: flex;
  justify-content: center; /* Aligns horizontally in the center */
}
.q-btn-group {
  display: flex;
  flex-direction: column;
  box-shadow: none !important; /* Displays buttons vertically */
}
.padding_zero {
  padding: 5% 0px;
}

.white-background {
  background-color: #fff;
  color: #5479f7 !important;
}
.radio-button-group .radio-button {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.right_side {
  margin-top: 0px !important;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.radio-button-group .radio-button + label {
  padding: 16px 10px;
  cursor: pointer;

  margin-right: -2px;
  color: #555;
  background-color: #ffffff;
  display: block;
  text-align: center;
}
.radio-button-group .item:first-of-type .radio-button + label {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  margin-right: 2%;
}
.radio-button-group .item:last-of-type .radio-button + label {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  margin-left: 2%;
}
.radio-button-group .radio-button:checked + label {
  background-color: #5479f7;
  color: #fff;
  border-radius: 25px;
}
.totalView {
  height: 50vh;
}
.bottom_div1 {
  position: relative;
  background-color: #ffff !important;
  margin-top: 2vh;
  display: flex;
  align-items: end;
  justify-content: center;
  /* border: 2px solid grey; */
}
.single_video {
  margin-top: -14vh;
  /* border:2px solid red; */
  /* position: absolute;
  top: -12vh; */
}
.style_for_q_btn{
  width: 100%;
                margin: 0 auto;
                display: flex;
                flex-direction: column;

}
.heading {
  margin-top: 3%;
  width: 80%;
}
.heading_h4 {
  /* font-family: 'Manrope'; */
  font-size: 16px;
  width: 100%;
  padding-top: 2%;
  margin-top: 0px;
  margin-left: 0px;
  padding-left: 0px;
  line-height: 26px;
}
/* .topView{
  padding-top: 2%;
} */
@media screen and (min-width: 1920px) {
  /* Your CSS styles for this screen width range */
  .totalView {
    height: 54vh;
  }
  .topView {
    padding-top: 4%;
  }
}
@media screen and (min-width: 1400px) and (max-width: 1602px) {
  .totalView {
    height: 52vh;
  }
  .topView {
    padding-top: 4%;
  }
}
</style>

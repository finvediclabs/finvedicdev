<template>
  <fin-portlet>
    <fin-portlet-header>
      <!--
      <fin-portlet-heading :loading="loading">Presentations</fin-portlet-heading>
      -->
    </fin-portlet-header>
    <fin-portlet-item>
      <!--
      <div class="radio-button-group mts" style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius: 25px;width: 60%;margin-left: auto;margin-right: auto;">
  <div class="item">
    <input type="radio" name="button-group" class="radio-button" value="1" id="button1" checked />
    <label for="button1">Introduction to Banking</label>
  </div>
  <div class="item">
    <input type="radio" name="button-group" class="radio-button" value="2" id="button2" />
    <label for="button2">Disruptive Technologies</label>
  </div>
  <div class="item">
    <input type="radio" name="button-group" class="radio-button" value="3" id="button3" />
    <label for="button3">Specializations</label>
  </div>
  
</div>
-->
      
      
      
      
      
      <div class="row q-lg">
        <q-btn-group rounded style="width: 80%;margin-left: auto;margin-right: auto;">
        <div v-for="category in categories" class="full-width">
          <q-btn unelevated rounded :label="category.categoryName" no-caps v-if="!subCategories[category.id]" class="full-width"
            size="lg" :class="selectedCategory?.id == category.id ? 'bg-finvedic text-white' : ''"
            @click="selectCategory(category)" />

          <q-btn-dropdown unelevated rounded :label="category.categoryName" no-caps v-if="subCategories[category.id]"
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
        </div>
      </q-btn-group>
      </div>
    
    </fin-portlet-item>
    <fin-portlet-item class="q-pb-xl" v-if="presentations.length">
      <carousel-3d :totalSlides="presentations.length" :count="presentations.length" @beforeSlideChange="getCurrentSlide"
        :controls-visible="true" :width="461" height="259">
        <slide v-for="(slide, i) in presentations" :key="i" :index="i">
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
            <div class="col-12 col-md-5 q-pt-lg q-px-lg" style="border: 2px solid #d3d3d3;border-radius: 15px;">
              <div style="text-align: center;">
          <q-img :src="selectedSlide.videoCoverPath" :ratio="16 / 9" class="fin-br-8 shadow-1" style="width:384px; height: 216px;" />
        </div>
          <fin-portlet-heading class="q-pa-md" small>
            {{ selectedSlide?.heading }}
            <br>
            <p style="font-size: 14px;font-weight: 300;">
              {{ selectedSlide?.description }}
            </p>
          </fin-portlet-heading>
        </div>
        <div class="col-2"></div>
        <div class="col-12 col-md-5 column justify-top q-pt-lg items-end" style="border: 2px solid #d3d3d3;border-radius: 15px;">
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
                        <div class="col-6 fin-br-8 q-px-sm" style="height:110px;" v-for="item in slider">
                          <q-img class="full-height fin-br-8 shadow-2 cursor-pointer "
                            :src="item.presentationCoverPath ?? 'dummy'" @click="visitChapter(item)">
                            <template v-slot:error>
                              <q-img :src="chapter.presentationCoverPath" class="full-height full-width" />
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
import axios from 'axios';
import { Carousel3d, Slide } from "src/components/carousel-3d";
import { urls } from "./Urls"
import { storeToRefs } from "pinia";
import { useCategoryStore } from "src/stores/Categories";
import moment from "moment";
import DummyBook from "src/assets/dummyBook.jpg"
import CryptoJS from 'crypto-js'
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
      chapters: [],
      slide: 0,
      allSlides: [],
      chaptersLoader: false,
      loading: false,
      slideWidth: window.innerWidth < 470 ? window.innerWidth - 30 : 450,
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
    console.log('Data from getPresentationsUrl:', response.data);
    if (response.data.success) {
      this.presentations = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));

      // Loop through each presentation and fetch videoCoverPath for it
      this.presentations.forEach(presentation => {
        // Fetch videoCoverPath and send it to download URL for each presentation
        if (presentation.videoCoverPath) {
          const videoCoverPathWithoutPrefix = presentation.videoCoverPath.replace('https://fnbackend.finvedic.com/fs/download/', '');
          const formData = new FormData();
          formData.append('filename', videoCoverPathWithoutPrefix);

          axios.post('https://fnbackend.finvedic.com/fs/download', formData, { responseType: 'blob' })
            .then(downloadResponse => {
              // Handle download success, e.g., open or save the downloaded file
              const blob = new Blob([downloadResponse.data]);
              const url = window.URL.createObjectURL(blob);
              presentation.videoCoverPath = url; // Update videoCoverPath with the received video URL
            })
            .then(() => {
              console.log('Post request successful'); // Log successful post request
            })
            .catch(error => {
              // console.error('Error in post request:', error); // Log error in post request
              // this.showMsg(error.response?.data.message || error.message, 'negative');
            });
        }
      });

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
  const formData = new FormData();
  formData.append('presentationId', this.selectedSlide?.id); // Add presentationId to form data
  console.log('Selected Slide ID:', this.selectedSlide?.id);
  axios.post('https://fnbackend.finvedic.com/api/presentationChapters/findPresentationChapter', formData)
    .then(response => {
      this.chaptersLoader = false;
      if (response.data.success) {
        this.chapters = response.data.data.map((chapter, index) => {
          return {
            index: index + 1,
            id: chapter.id,
            presentationId: chapter.presentationId,
            accountId: chapter.accountId,
            description: chapter.description,
            chapterTitle: chapter.chapterTitle,
            presentationCoverPath: chapter.presentationCoverPath,
            presentationFilePath: chapter.presentationFilePath,
            createdAt: moment(chapter.createdAt).format('YYYY-MM-DD'),
            updatedAt: moment(chapter.updatedAt).format('YYYY-MM-DD'),
            deletedAt: moment(chapter.deletedAt).format('YYYY-MM-DD')
          };
        });

        // Fetch presentationCoverPath and send it to download URL
        this.chapters.forEach(chapter => {
          if (chapter.presentationCoverPath) {
            const imagePathWithoutPrefix = chapter.presentationCoverPath.replace('https://fnbackend.finvedic.com/fs/download/', '');
            const formData = new FormData();
            formData.append('filename', imagePathWithoutPrefix);
            
            axios.post('https://fnbackend.finvedic.com/fs/download', formData, { responseType: 'blob' })
              .then(downloadResponse => {
                const blob = new Blob([downloadResponse.data]);
                const url = window.URL.createObjectURL(blob);
                chapter.presentationCoverPath = url; // Update presentationCoverPath with the received image URL
              })
              .catch(error => {
                console.error('Error in post request for presentationCoverPath:', error);
                this.showMsg(error.response?.data.message || error.message, 'negative');
              });
          }
        });

        this.getDummyChapters(this.chapters);
      } else {
        this.showMsg(response.data?.message, 'negative');
      }
    })
    .catch(error => {
      this.chaptersLoader = false;
      this.showMsg(error.response?.data.message || error.message, 'negative');
    });
},
    getDummyChapters(chapter) {
      let index = 0;
      let slide = [];
      
      for (let j = 0; j < chapter.length; j++) {
        slide.push(chapter[j]);
        this.allSlides[index] = slide;
        if ((j + 1) % 4  == 0) {
          index += 1;
          slide = []
        }
      }
    },
    visitChapter(chapter) {
      var ext = chapter.presentationFilePath?.substr(chapter.presentationFilePath.lastIndexOf('.') + 1);
      let url = '/watch-ppt';
      if(ext == 'pptx' ) { url = '/watch-ppt'; }
      else if(ext == 'mp4') { url = '/watch-video'; }
      else if(ext == 'pdf') { url = '/read-pdf'; }
      let item = chapter.description ;
      this.$router.push({
        path: url,
        query: {
          item:  CryptoJS.AES.encrypt(item, 'fileData').toString()
        }
      })
    }
  }
};
</script>
<style>
.radio-button-group {
  display: flex;
}
.radio-button-group .item {
  width: 100%;
}
.radio-button-group .radio-button {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
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
.radio-button-group .item:first-of-type .radio-button + label{
  
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
    background-color: #5479F7;
    color: #FFF;
    border-radius: 25px;
}
</style>
./Urls

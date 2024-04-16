<template>
  <fin-portlet>
    <fin-portlet-header>
    </fin-portlet-header>
    <fin-portlet-item class="q-pb-xl" v-if="booksData.length">
      <carousel-3d :totalSlides="booksData.length" :count="booksData.length" @beforeSlideChange="getCurrentSlide"
        :controls-visible="true" width="235" height="325" display="9" >
        <slide v-for="(slide, i) in booksData" :key="i" :index="i">
          <q-img :src="slide.imagePath ?? 'dummy'" class="fin-br-8 fit" :alt="slide.heading" >
            <template v-slot:error>
              <q-img :src="DummyBook" class="full-width full-height" />
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
      <div class="row" >
        <div class="col-12 col-md-6 col-lg-6  q-pr-md">
          <div class="row" style="border: 2px solid #d3d3d3;border-radius: 15px;">
            <div class="col-1"></div>
            <div class="col-12 col-sm-4 col-md-4 row justify-center" style="padding-top: 2%;padding-bottom: 2%;">
              
              <q-avatar style="width:186px; height: 262px" square>
                <q-img :src="selectedSlide?.imagePath ?? 'dummy'" class="fin-br-8 fit" style="border:1px solid #00000030"
                  :alt="selectedSlide?.heading" >
                  <template v-slot:error>
                    <q-img :src="DummyBook" class="fit" />
                  </template>
                </q-img>
              </q-avatar>
            </div>
      
            <div class="col-12 col-sm-7 col-md-7" style="padding-left: 5%;">
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
        
        <div class="col-12 col-md-5" style="border: 2px solid #d3d3d3;border-radius: 15px;margin-left: 5%;">
          <div class="row " >
            <div class="col-10 justify-center" style="height: 200px;padding-top: 2%;margin-left: auto;margin-right: auto;">

              <q-carousel swipeable animated v-model="slide" ref="carousel" infinite class="full-height"
                style="padding-top: 60px;">

                <template v-slot:control>
                  <q-carousel-control position="top-left" :offset="[25, 10]" class="text-black">
                    <span>More Chapters</span>
                  </q-carousel-control>
                  <q-carousel-control position="top-right" :offset="[20, 10]" class="q-gutter-xs">
                    <q-btn round dense class="shadow-2" text-color="black" icon="chevron_left"
                      @click="$refs.carousel.previous()" />
                    <q-btn round dense class="shadow-2" text-color="black" icon="chevron_right"
                      @click="$refs.carousel.next()" />
                  </q-carousel-control>
                </template>

                <template v-if="chaptersLoader">
                  <q-carousel-slide :name="0" class="rounded-borders text-italic">
                    <div class="row full-height">
                      <div class="col-4 q-px-sm full-height" v-for="item in 3">
                        <q-skeleton class="full-width full-height" style="background-color: #F5F5F5;" />
                      </div>
                    </div>
                  </q-carousel-slide>
                </template>

                <template v-if="!chaptersLoader">
                  <template v-if="chaptersData.length">
                    <q-carousel-slide v-for="(slider, i) in allSlides" :name="i" class="items-end q-pa-none">
                      <div class="row full-height">
                        <div class="col-4 q-px-sm full-height" v-for="chapter in slider">
                          <q-img class="full-height rounded-borders shadow-2 cursor-pointer"
                            :src="chapter.chapterImagePath ?? 'dummy'" @click="visitChapter(chapter)">
                            <template v-slot:error>
                              <q-img :src="chapter.chapterImagePath" class="fit" />
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
    </fin-portlet>
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import { Carousel3d, Slide } from "src/components/carousel-3d";
import axios from 'axios';
import { urls } from "./Urls"
import { storeToRefs } from "pinia";
import moment from "moment"
import { useCategoryStore } from "src/stores/Categories";
import DummyBook from "src/assets/dummyBook.jpg"
import samplePDF from "src/assets/sample.pdf"
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
      booksData: [],
      selectedSlide: {},
      loading: false,
      chaptersData: [],
      slide: 0,
      allSlides: [],
      chaptersLoader: false,
      loading: false
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
        this.getBooksData();
      }
    },
    selectedSubCategory() {
      if (this.selectedSubCategory?.id) {
        this.getBooksData();
      }
    }
  },
  mounted() {
    if (this.selectedCategory) {
      this.getBooksData();
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
      this.selectedSlide = this.booksData[index];
    },
    getBooksData() {
  this.loading = true;
  let request = {
    params: {
      categoryId: this.selectedCategory.id
    }
  }
  if (this.selectedSubCategory && this.selectedCategory?.id == this.selectedSubCategory?.categoryCode) {
    request.params.subCategoryId = this.selectedSubCategory.id;
  }

  this.$api.get(urls.getBooksDataUrl, request).then(response => {
    this.loading = false;
    console.log('Data from getbooksurl:', response.data);
    if (response.data.success) {
      this.booksData = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));
      
      // Loop through each book and fetch imagePath for it
      this.booksData.forEach(book => {
        // Fetch imagePath and send it to download URL for each book
        if (book.imagePath) {
          const imagePathWithoutPrefix = book.imagePath.replace('https://fnbackend.finvedic.com/fs/download/', '');
          const formData = new FormData();
          formData.append('filename', imagePathWithoutPrefix);
          
          axios.post('https://fnbackend.finvedic.com/fs/download', formData, { responseType: 'blob' })
            .then(downloadResponse => {
              // Handle download success, e.g., open or save the downloaded file
              const blob = new Blob([downloadResponse.data]);
              const url = window.URL.createObjectURL(blob);
              book.imagePath = url; // Update imagePath with the received image URL
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

      this.selectedSlide = this.booksData.length ? this.booksData[0] : {};
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
  formData.append('bookId', this.selectedSlide?.id); // Add bookId to form data

  axios.post('https://fnbackend.finvedic.com/api/bookChapters/getBookChaptersByBookId', formData)
    .then(response => {
      this.chaptersLoader = false;
      if (response.data.success) {
        this.chaptersData = response.data.data.map((chapter, index) => {
          return {
            index: index + 1,
            id: chapter.id,
            bookId: chapter.bookId,
            accountId: chapter.accountId,
            description: chapter.description,
            chapterTitle: chapter.chapterTitle,
            chapterImagePath: chapter.chapterImagePath,
            chapterFilePath: chapter.chapterFilePath,
            createdAt: moment(chapter.createdAt).format('YYYY-MM-DD'),
            updatedAt: moment(chapter.updatedAt).format('YYYY-MM-DD'),
            deletedAt: moment(chapter.deletedAt).format('YYYY-MM-DD')
          };
        });

        // Fetch imagePath and send it to download URL
        this.chaptersData.forEach(chapter => {
          if (chapter.chapterImagePath) {
            const imagePathWithoutPrefix = chapter.chapterImagePath.replace('https://fnbackend.finvedic.com/fs/download/', '');
            const formData = new FormData();
            formData.append('filename', imagePathWithoutPrefix);
            
            axios.post('https://fnbackend.finvedic.com/fs/download', formData, { responseType: 'blob' })
              .then(downloadResponse => {
                const blob = new Blob([downloadResponse.data]);
                const url = window.URL.createObjectURL(blob);
                chapter.chapterImagePath = url; // Update imagePath with the received image URL
              })
              .catch(error => {
                console.error('Error in post request for imagePath:', error);
                this.showMsg(error.response?.data.message || error.message, 'negative');
              });
          }
        });

        this.getDummyChapters(this.chaptersData);
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
        if ((j + 1) % 3 == 0) {
          index += 1;
          slide = [];
        }
      }
    },
    
    visitChapter(chapter) {
  console.log('Chapter File Path:', chapter.chapterFilePath); // Log the chapter file path
  
  var ext = chapter.chapterFilePath?.substr(chapter.chapterFilePath.lastIndexOf('.') + 1);
  let url = '/read-pdf';
  if(ext == 'pptx' ) { url = '/watch-ppt'; }
  else if(ext == 'mp4') { url = '/watch-video'; }
  else if(ext == 'pdf') { url = '/read-pdf'; }
  let item = chapter.chapterFilePath;

  if (item) {
    console.log(item); // Log the item here

    this.$router.push({
      path: url,
      query: {
        item: CryptoJS.AES.encrypt(item, 'fileData').toString()
      }
    });
  } else {
    console.error('Failed to get chapter file path');
    // You can also show a notification or handle the failure in a different way
  }
}


  }
};
</script>

<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading">Books</fin-portlet-heading>
    </fin-portlet-header>

    <fin-portlet-item class="q-pb-xl" v-if="booksData.length">
      <carousel-3d :totalSlides="booksData.length" :count="booksData.length" @beforeSlideChange="getCurrentSlide"
        :controls-visible="true">
        <slide v-for="(slide, i) in booksData" :key="i" :index="i">
          <q-img :src="slide.imagePath" class="fit" :alt="slide.heading">
            <template v-slot:error>
              <q-img
                src="https://thumbs.dreamstime.com/b/wooden-man-trying-to-open-book-dummy-looking-something-books-literature-research-concept-information-search-195345616.jpg"
                class="full-height full-width" />
            </template>
          </q-img>
        </slide>
      </carousel-3d>
    </fin-portlet-item>
    <fin-portlet-item v-else style="height: 272px" class="q-pb-xl">
      <div class="full-width full-height flex flex-center">
        <q-spinner-facebook color="blue-9" size="3.5em" />
      </div>
    </fin-portlet-item>
    <fin-portlte>
      <div class="row">
        <div class="col-12 col-md-6 flex q-pr-md">
          <q-avatar style="width:250px; height: 300px" square>
            <q-img :src="selectedSlide?.imagePath" class="fin-br-8 fit" style="border:1px solid #00000030"
              :alt="selectedSlide?.heading">
              <template v-slot:error>
                <q-img
                  src="https://thumbs.dreamstime.com/b/wooden-man-trying-to-open-book-dummy-looking-something-books-literature-research-concept-information-search-195345616.jpg"
                  class="fit" />
              </template>
            </q-img>
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
          <!-- <p>More Chapters</p> -->
          <div class="row ">

            <div class="col-6 col-md-4 col-lg-3 q-pa-sm" v-for="(item, index) in chaptersData" v-if="chaptersData.length">
              <q-img :src="item.chapterImagePath" style="height: 150px; border: 1px solid #00000020;"
                class="rounded-borders full-width bg-red full-width" v-if="index < 7">
                <template v-slot:error>
                  <q-img src="https://cakedummies.com/wp-content/uploads/book-cake-dummies-247x296.jpg"
                    class="full-height full-width" />
                </template>
              </q-img>
              <q-icon name="arrow_forward_ios" v-if="index == 7" style="height: 150px; border: 1px solid #00000020;"
                class="rounded-borders full-width" />
            </div>
            <div class="col-6 col-md-4 col-lg-3 q-pa-sm" v-for="item in 8" v-else>
              <q-skeleton height="150px" />
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
      chaptersData: [],
    }
  },
  watch: {
    selectedSlide() {
      this.getChapthersData();
    },
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
      this.$api.get(urls.getBooksDataUrl).then(response => {
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
    },
    getChapthersData() {
      this.chaptersLoader = true;
      this.$api.get(urls.getBookChapterUrl, {
        params: {
          bookId: this.selectedSlide?.id
        }
      }).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.chaptersData = response.data.data.map((chapter, index) => {
            return {
              index: index + 1,
              id: chapter.id,
              bookId: chapter.bookId,
              accountId: chapter.accountId,
              description: chapter.description,
              chapterTitle: chapter.chapterTitle,
              chapterImagePath: chapter.firstchapterImagePath,
              chapterFilePath: chapter.chapterFilePath,
              createdAt: moment(chapter.createdAt).format('YYYY-MM-DD'),
              updatedAt: moment(chapter.updatedAt).format('YYYY-MM-DD'),
              deletedAt: moment(chapter.deletedAt).format('YYYY-MM-DD')
            }
          });
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.chaptersLoader = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    }
  }
};
</script>

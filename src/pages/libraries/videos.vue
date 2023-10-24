<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading>Videos</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="q-pb-xl">
      <carousel-3d :totalSlides="booksData.length" :count="booksData.length" @beforeSlideChange="getCurrentSlide" :controls-visible="true">
        <slide v-for="(slide, i) in booksData" :key="i" :index="i">
          <q-img :src="slide.image" class="fit"></q-img>
        </slide>
      </carousel-3d>
    </fin-portlet-item>
    <fin-portlte>
      <div class="row">
        <div class="col-12 col-md-5 q-pt-lg q-px-lg">
          <q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" :ratio="16 / 9" class="fin-br-8"/>
        </div>
        <div class="col-12 col-md-6 self-end justify-center">
          <p>More Chapters</p>
          <div class="flex  q-gutter-md">
            <q-skeleton height="100px" width="140px" />
            <q-skeleton height="100px" width="140px" />
            <q-skeleton height="100px" width="140px" />
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
export default {
  components: {
    Carousel3d,
    Slide,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  setup() {
    return {
    };
  },
  data() {
    return {
      booksData: [
        { id: 1, image: 'https://m.media-amazon.com/images/I/71TWHAhREXL._AC_UF1000,1000_QL80_.jpg', title: 'Famous Book Titles Taken from The Bible' },
        { id: 2, image: 'https://i.insider.com/5b5ed53cbda1c7e8018b4567?width=700', title: 'Famous Book Titles Taken from The Bible' },
        { id: 3, image: 'https://previews.123rf.com/images/zinkevych/zinkevych1902/zinkevych190202268/117413128-getting-liked-book-interested-appealing-reader-actively-collecting-new-books-while-visiting-public.jpg', title: 'Famous Book Titles Taken from The Bible' },
        { id: 4, image: 'https://blog-cdn.reedsy.com/directories/admin/featured_image/326/how-to-get-a-book-published-abe53b.jpg', title: 'Famous Book Titles Taken from The Bible' },
        { id: 5, image: 'https://m.media-amazon.com/images/I/71TWHAhREXL._AC_UF1000,1000_QL84_.jpg', title: 'Famous Book Titles Taken from The Bible' },
        { id: 6, image: 'https://writingtipsoasis.com/wp-content/uploads/2018/10/beginners-guide-to-publishing-a-book.png', title: 'Famous Book Titles Taken from The Bible' },
        { id: 7, image: 'https://m.media-amazon.com/images/I/71TWHAhREXL._AC_UF1000,1000_QL86_.jpg', title: 'Famous Book Titles Taken from The Bible' },
        { id: 8, image: 'https://i0.wp.com/www.thebookishmom.net/wp-content/uploads/2023/01/how-to-get-arcs-of-books.jpg?fit=1024%2C576&ssl=1', title: 'Famous Book Titles Taken from The Bible' },
        { id: 9, image: 'https://m.media-amazon.com/images/I/71TWHAhREXL._AC_UF1000,1000_QL88_.jpg', title: 'Famous Book Titles Taken from The Bible' },
        { id: 10, image: 'https://compote.slate.com/images/f6cdae8e-8c65-4e96-9f1b-737de66e794f.jpeg?crop=1560%2C1040%2Cx0%2Cy0', title: 'Famous Book Titles Taken from The Bible' },
      ],
      slides: 10,
      selectedSlide: { id: 1, image: 'https://m.media-amazon.com/images/I/71TWHAhREXL._AC_UF1000,1000_QL80_.jpg', title: 'Famous Book Titles Taken from The Bible' },
    }
  },
  methods: {
    getCurrentSlide(index) {
      this.selectedSlide = this.booksData[index];
    },
  }
};
</script>

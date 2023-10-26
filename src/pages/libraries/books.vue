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
      apiResponse: {
        "data": [
          {
            "id": 8,
            "accountId": 1,
            "description": "Seven Databases in Seven Weeks: A Guide to Modern Databases and the NoSQL Movement",
            "heading": "Redis Cache",
            "imagePath": "books/gvlA3k8VddRkMyCHKaaGp2BxHsggVHjwFGGkHvI7.png",
            "createdAt": "",
            "updatedAt": "",
            "deletedAt": ""
          },
          {
            "id": 9,
            "accountId": 1,
            "description": "What Are Distributed Systems? Architecture Types, Key Components, and Examples",
            "heading": "Distributed Systems - Architecture and Implementation",
            "imagePath": "booksadmin/B2CrAU2qxPnkY38K9BlNAwtzLpEGEyryWLlhQ5pR.png",
            "createdAt": "",
            "updatedAt": "",
            "deletedAt": ""
          },
          {
            "id": 10,
            "accountId": 1,
            "description": "System Design",
            "heading": "System Design",
            "imagePath": "booksadmin/mMlo6ylBZn0pn6SIsKWYUrPSQvJFux6Ya778vmPB.png",
            "createdAt": "",
            "updatedAt": "",
            "deletedAt": ""
          },
          {
            "id": 11,
            "accountId": 1,
            "description": "Load Balancer – System Design",
            "heading": "Load Balancer – System Design",
            "imagePath": "booksadmin/32egZ6d4BloDH6LUKllGGKFMawJySE8gR9qIW1OO.png",
            "createdAt": "",
            "updatedAt": "",
            "deletedAt": ""
          },
          {
            "id": 12,
            "accountId": 1,
            "description": "TEST",
            "heading": "ABC",
            "imagePath": "booksadmin/0PDcyRyBh8DaLswWPCyT02FvUfl3S8Y69bkRmwwH.png",
            "createdAt": "",
            "updatedAt": "",
            "deletedAt": ""
          },
          {
            "id": 13,
            "accountId": 1,
            "description": "TEST",
            "heading": "ADED",
            "imagePath": "booksadmin/SFvbxu7cvMyZrBePAyHL20MXVJSZOSwU6SffYTDc.png",
            "createdAt": "",
            "updatedAt": "",
            "deletedAt": ""
          },
          {
            "id": 14,
            "accountId": 1,
            "description": "Seven  in Seven Weeks: A Guide to Modern Databases and the NoSQL Movement 223",
            "heading": "Redis Cache 123",
            "imagePath": null,
            "createdAt": "",
            "updatedAt": "",
            "deletedAt": ""
          }
        ],
        "success": true,
        "status": 200
      },
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

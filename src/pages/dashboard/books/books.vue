<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>
        Books
      </fin-portlet-heading>
      <fin-portlet-item>
        <router-link :to="'books/create'">
          <q-btn label="Create Book" icon="add" color="blue-15" class="fin-br-8 text-subtitle1 text-weight-bolder q-px-md"
            dense no-caps />
        </router-link>

      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-table :columns="header" :data="booksList" select />
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinTable from "src/components/FinTable.vue"
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import dummyImg from "src/assets/dummyImg.webp"
export default {
  name: 'books',
  components: {
    FinTable,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      header: [
        { label: 'Cover', key: 'image', align: 'start', type: 'image' },
        { label: 'Title', key: 'title', align: 'start' },
        { label: 'Description', key: 'description', align: 'start' },
      ],
      booksList: [
        { image: dummyImg, title: "Book Title 1", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 2", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 3", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 4", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 5", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 6", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 7", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 8", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 9", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 10", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
        { image: dummyImg, title: "Book Title 11", description: 'Lorem Ipsum has been the industrys standard dummy text ever since' },
      ]
    }
  }
}
</script>

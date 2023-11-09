<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow> Chapters List : {{ bookId }}</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-table :columns="header" :data="chaptersList" select @reCall="getChaptersData()" @editFun="editDataFun"
        :loading="loading" />
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinTable from "src/components/FinTable.vue"
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
export default {
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
        { label: 'S.No', key: 'index', align: 'center' },
        { label: '', key: 'index', align: 'center' },
        { label: 'S.No', key: 'index', align: 'center' }
      ],
    }
  },
  computed: {
    bookId() {
      return this.$route.params.id;
    }
  },
  methods: {
    editDataFun(item) {
      console.log(item, 'item');
    }
  }
}
</script>

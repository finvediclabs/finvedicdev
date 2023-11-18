<template>
  <q-page>
    <fin-portlet >
      <fin-portlet-header>
        <fin-portlet-heading backArrow></fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item class="bg-black fin-br-8 bg-red" style="height: 90vh">
        <!-- <iframe :src="pdfPath" :ratio="16/6" style="max-height: 100%;width: 100%" class="full-height" type="application/pdf"/> -->
      </fin-portlet-item>
    </fin-portlet>
  </q-page>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
export default {
  name: 'watch-pdf',
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      pdfPath: '',
    }
  },
  mounted() {
    this.pdfPath = this.$route.query.item;
  }

}
</script>

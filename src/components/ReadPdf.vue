<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading backArrow></fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item>
      <vue-pdf-embed :source="pdfPath" >
        <template v-slot:before-page>
          <div class="row bg-dark">
            <q-separator dark />
          </div>
        </template>
        <template v-slot:after-page>
          <div class="row text-center">
            <q-space />
            Organized By Sandy
          </div>
        </template>
      </vue-pdf-embed>
    </fin-portlet-item>

  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import VuePdfEmbed from 'vue-pdf-embed'
export default {
  name: 'read-pdf',
  data() {
    return {
      pdfPath: '',
      numPages: 0,
    }
  },
  components: {
    VuePdfEmbed,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  mounted() {
    this.pdfPath = this.$route.query.item;
  },
  methods: {
  }
}
</script>

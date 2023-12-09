<template>
  <q-page class="q-mx-auto q-my-auto flex flex-center">
    <div class="video-wrapper">
      <ViewJs :props="viewJsData" class="rounded-4"></ViewJs>
    </div>
  </q-page>
</template>

<script>
import CryptoJS from 'crypto-js'
import ViewJs from './viewjs.vue';
export default {
  components: {
    ViewJs
  },
  computed: {
    viewJsData() {
      return {
        allowFullScreen: true,
        preload: 'auto',
        sources: [
          {
            url: CryptoJS.AES.decrypt(this.$route.query.item, 'fileData').toString(CryptoJS.enc.Utf8),
            type: 'video/mp4'
          },
        ]
      }
    }
  }
}
</script>
<style>
.video-wrapper {
  width: 100%;
  max-width: 1000px;
}
</style>

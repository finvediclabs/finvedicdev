<!--
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
-->
<template> 
  <!--
  <div style="position: relative; width: 70%;height: 88vh;;margin-right:auto;margin-left: auto;margin-top: 1%; will-change: transform;background-color: #fff;">
  <iframe loading="lazy" 
  style="position: absolute; 
  width: 100%; height: 100%; 
  top: 0; left: 0; 
  border: none; padding: 0;margin: 0;"
    src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFpiWADNsY&#x2F;view?embed"  allow="fullscreen">
  </iframe>
</div>
-->
<div style="position: relative; max-width: 1200px; height: 0; padding-top: 46.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 0em; margin-bottom: 0em; overflow: hidden;
 border-radius: 8px; will-change: transform;" class="q-mx-auto">
    <video loading="lazy" :src="viewJsData"
      style="position: absolute; 
      width: 100%; height: 100%; top: 0; left: 0; 
      border: none; padding: 0;margin: 0;"
      allowfullscreen="allowfullscreen" allow="fullscreen"
      controls controlsList="nodownload">
    </video>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  computed: {
    viewJsData() {
      return CryptoJS.AES.decrypt(this.$route.query.item, 'fileData').toString(CryptoJS.enc.Utf8);
    }
  },
}
</script>
<style>
.video-wrapper {
  width: 100%;
  max-width: 1000px;
}
</style>


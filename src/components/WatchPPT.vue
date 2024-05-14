
<template> 
  
<div style="position: relative; max-width: 1200px; height: 0; padding-top: 46.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 0em; margin-bottom: 0em; overflow: hidden;
 border-radius: 8px; will-change: transform;" class="q-mx-auto">
    <iframe loading="lazy" 
    :src="viewJsData"
      style="position: absolute; 
      width: 100%; height: 100%; top: 0; left: 0; 
      border: none; padding: 0;margin: 0;"
      allowfullscreen="allowfullscreen" allow="fullscreen">
    </iframe>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  computed: {
    viewJsData() {
      const decryptedData = CryptoJS.AES.decrypt(this.$route.query.item, 'fileData').toString(CryptoJS.enc.Utf8);
      console.log('Decrypted Data:', decryptedData);
      return decryptedData;
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

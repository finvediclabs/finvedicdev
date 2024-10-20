<template>
  <div
    style="position: relative; max-width: 1200px; height: 0; padding-top: 46.2500%; padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 0em; margin-bottom: 0em; overflow: hidden; border-radius: 8px; will-change: transform;"
    class="q-mx-auto"
  >
    <video
      ref="videoPlayer"
      loading="lazy"
      :src="videoUrl"
      style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0; margin: 0;"
      allowfullscreen="allowfullscreen"
      allow="fullscreen"
      controls
      controlsList="nodownload"
    >
    </video>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import { useSessionStore } from 'src/stores/session'; // Import your session store

export default {
  data() {
    return {
      decryptedString: '',
      formattedUrl: '',
      videoUrl: '' // Added for video URL
    };
  },
  mounted() {
    this.formatUrlAndSend();
  },
  methods: {
    formatUrlAndSend() {
      const sessionStore = useSessionStore(); // Access session store
      const baseUrls = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const basedUrl = baseUrls + 'fs/download/';
      
      // Decrypt the URL from query parameters
      const decryptedData = CryptoJS.AES.decrypt(this.$route.query.item, 'fileData').toString(CryptoJS.enc.Utf8);
      this.decryptedString = decryptedData; // Store decrypted data

      this.formattedUrl = this.decryptedString.replace(basedUrl, ''); 

      const formData = new FormData();
      const getVideoUrl = baseUrls + 'fs/download';
      formData.append('filename', this.formattedUrl);

      // Fetch video with authorization token
      fetch(getVideoUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStore.token}` // Use the token from session store
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const videoUrl = URL.createObjectURL(blob);
        this.videoUrl = videoUrl; // Set the video URL in the video player
        this.$refs.videoPlayer.src = videoUrl; // Set the video URL in the video player
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
      });
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

<template>
  <div class="row justify-center">
    <div class="col-12">
      <div class="row q-pa-lg">
        <div class="col-12 col-sm-6 col-lg-7 flex flex-center ">
          <img src="src/assets/landing.png" style="max-width:60%">
        </div>
        <div class="col-12 col-sm-6 col-lg-4 self-center">
          <create-account-page v-if="currentPage == 'createPage'" @changePage="changePage" />
          <log-in-page v-if="currentPage == 'loginPage'" @changePage="changePage" />
          <reset-password-page v-if="currentPage == 'resetPasswordPage'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import CreateAccountPage from "../components/LandingComponents/CreateAccountPage.vue";
import LogInPage from "../components/LandingComponents/LogInPage.vue";
import ResetPasswordPage from "../components/LandingComponents/ResetPasswordPage.vue";
export default defineComponent({
  name: 'landing-layout',
  components: {
    CreateAccountPage,
    LogInPage,
    ResetPasswordPage
  },
  setup() {
  },
  data() {
    return {
      currentPage: ref('loginPage'),
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    }
  }
});
</script>

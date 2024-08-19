<template>
  <div class="row justify-center">
    <div class="col-12">
      <div class="row ">
        <div class="col-12 col-sm-6 col-lg-7 flex q-pb-md">
          <q-img :src="LandingImg" style="max-width:95%" />
        </div>
        <div class="col-12 col-sm-6 col-lg-4 self-center">
          <create-account-page v-if="currentPage === 'createPage'" @changePage="changePage" />
          <log-in-page v-if="currentPage === 'loginPage'" @changePage="changePage" />
          <reset-password-page v-if="currentPage === 'resetPasswordPage'" @changePage="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import CreateAccountPage from "../components/LandingComponents/CreateAccountPage.vue";
import LogInPage from "../components/LandingComponents/LogInPage.vue";
import ResetPasswordPage from "../components/LandingComponents/ResetPasswordPage.vue";
import LandingImg from "../assets/landing1.png";

export default defineComponent({
  name: 'LandingLayout',
  components: {
    CreateAccountPage,
    LogInPage,
    ResetPasswordPage
  },
  data() {
    return {
      currentPage: ref('loginPage'),
      LandingImg: LandingImg,
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    }
  }
});
</script>

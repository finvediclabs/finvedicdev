<template>
  <q-layout>
    <q-page-container>
      <q-page class="login-class relative-position">
        <q-page style="z-index: 1" class="q-pt-xl q-px-xl">
          <div class="text-h3 text-weight-bolder gurukul-text">Gurukul</div>
          <landing-page style="z-index: 1" />
          <div class="row justify-between">
            <div class="text-center gurukul-text">
              <span class="text-subtitle2">A product by</span> <br>
              <span class="text-h6">FINVEDIC</span>
            </div>
            <div class="items-center row">
              <span class="text-h5 ">&#169;</span>&nbsp;<span class="text-caption">All Rights reserved</span>
            </div>
          </div>
        </q-page>
        <q-page class="bg-white fin-absolute"></q-page>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import LandingPage from 'src/pages/LandingPage.vue';

export default defineComponent({
  name: 'landing-layout',
  components: {
    LandingPage
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
})
</script>
<style>
.login-class {
  background: #5479F7;
}

.gurukul-text {
    color: #ffffff;
  }

.fin-absolute {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 35%;
  z-index: 0;
  border-radius: 20px 0px 0px 20px;
}

@media screen and (max-width: 576px) {
  .gurukul-text {
    color: #211F1F;
  }

  .fin-absolute {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
    border-radius: 20px 0px 0px 20px;
  }
}
</style>

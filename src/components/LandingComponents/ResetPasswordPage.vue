<template>
  <div>
    <div class="text-h5 text-weight-bolder">Reset Password</div>
    <div class="text-grey-8">Reset your password by providing your account below</div>
    <div class="">
      <q-input outlined class="q-my-sm" v-model="email" label="Email Address" dense lazy-rules
        :rules="[val => val && val.length > 0 || 'Email Field Is Required']" />
      <q-btn color="primary" class="full-width sub-btn" padding="md" label="Next" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'create-account-page',
  data() {
    return {
      isPwd: ref(true)
    }
  },
})
</script>

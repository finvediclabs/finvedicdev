<template>
  <div>
    <div class="text-h5 text-weight-bolder">Reset Password</div>
    <div class="text-grey-8">Reset your password by providing your account below</div>
    <div>
      <q-input
        outlined
        class="q-my-sm"
        v-model="email"
        label="Email Address"
        dense
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Email Field Is Required']"
      />
      <q-btn
        color="primary"
        class="full-width sub-btn"
        padding="md"
        label="Next"
        @click="handleForgotPassword"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create-account-page',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async handleForgotPassword() {
      try {
        const response = await axios.post('http://localhost:8087/api/users/forgot-password', {
          email: this.email
        });
        console.log("API Response:", response); 
        this.$q.notify({
          type: 'positive',
          message: response.data.message
        });
      
      } catch (error) {
        console.error("API Error:", error); 
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'An error occurred'
        });
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="text-h5 text-weight-bolder">Reset Password</div>
    <div class="text-grey-8">Reset your password by providing your email address below</div>

    <div v-if="step === 0">
      <q-input
        outlined
        class="q-my-sm"
        v-model="email"
        label="Email Address"
        dense
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Email Field Is Required']"
      />
      <q-btn color="primary" class="full-width sub-btn" padding="md" label="Next" @click="sendResetLink" />
    </div>

    <div v-if="step === 1">
      <q-input
        outlined
        class="q-my-sm"
        v-model="verificationCode"
        label="Verification Code"
        dense
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Verification Code Is Required']"
      />
      <q-input
        outlined
        class="q-my-sm"
        v-model="newPassword"
        label="New Password"
        dense :type="isPwd ? 'password' : 'text'"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'New Password Is Required']"
      >
      <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
    </q-input>
      <q-btn color="primary" class="full-width sub-btn" padding="md" label="Reset Password" @click="resetPassword" />
    </div>

    <!-- Button to go back to the login page -->
    <q-btn
      v-if="step === 0 || step === 1"
      color="secondary"
      class="full-width sub-btn"
      padding="md"
      label="Back to Login"
      @click="goToLogin"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ResetPasswordPage',
  data() {
    return {
      step: 0, // 0: Initial, 1: Verification and Password Reset
      email: '',
      verificationCode: '',
      newPassword: '',
    }
  },
  methods: {
    async sendResetLink() {
      try {
        
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const pushForgetPasswordUrl = baseUrl + 'api/users/forgot-password';
        const response = await axios.post(pushForgetPasswordUrl, {
          email: this.email
        });
        console.log('Forgot password response:', response.data);
        
        if (response.data.success) {
          this.step = 1; // Show the next step
        } else {
          console.error('Error response:', response.data.message);
        }
      } catch (error) {
        console.error('Error sending reset link:', error);
      }
    },
    async resetPassword() {
      try {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const putResetPasswordUrl = baseUrl + 'api/users/forget/reset-password';
        const response = await axios.put(putResetPasswordUrl, {
          email: this.email,
          code: this.verificationCode,
          newPassword: this.newPassword
        });
        console.log('Reset password response:', response.data);
        
        if (response.data.success) {
          console.log('Password reset successfully');
          this.email = '';
          this.verificationCode = '';
          this.newPassword = '';
          this.step = 0; // Optionally reset step to initial
          this.goToLogin(); // Redirect to login page
        } else {
          console.error('Error response:', response.data.message);
        }
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    },
    goToLogin() {
      this.$emit('changePage', 'loginPage'); // Emit an event to change page
    }
  }
});
</script>

<style scoped>
.sub-btn {
  margin-top: 20px;
}
</style>

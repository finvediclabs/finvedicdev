<template>
  <div>
    <div class="text-h5 text-weight-bolder">Log In</div>
    <account-log-in />
    <div class="full-width text-center q-py-sm">OR</div>
    <div class="">
      <div class="">
        <q-form @submit="onSubmit">
          <q-input outlined class="q-my-sm" v-model="email" label="Email Address" dense lazy-rules
            :rules="[val => val && val.length > 0 || 'Email field is required']" />

          <q-input v-model="password" outlined class="q-my-sm" label="Password" dense :type="isPwd ? 'password' : 'text'"
            lazy-rules :rules="[val => val && val.length > 0 || 'Password is required']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <div class="row justify-between q-mb-sm items-center">
            <q-checkbox v-model="rememberMe" label="Remember me" />
            <a @click="changePage('resetPasswordPage')" class="cursor-pointer fin-text-blue">Forget password</a>
          </div>
          <q-btn color="primary" class="full-width sub-btn" padding="md" label="Log in" type="submit" />
        </q-form>
      </div>

    </div>
    <div class="q-my-md">
      Need an account?
      <q-btn outline label="Sign Up" dense class="q-px-lg q-mx-md sub-btn-outline" @click="changePage('createPage')" />
    </div>
  </div>
</template>
<script>
import AccountLogIn from "./AccountLogIn.vue";
export default {
  name: 'login-page',
  components: {
    AccountLogIn
  },
  data() {
    return {
      isPwd: true,
      rememberMe: false,
      email: "",
      password: "",
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
    onSubmit() {
      this.$router.push({ path: '/admin' });
    }
  }
}
</script>

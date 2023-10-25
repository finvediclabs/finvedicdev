<template>
  <div>
    <div class="text-h5 text-weight-bolder">Create Account</div>
    <account-log-in />
    <div class="full-width text-center q-py-sm">OR</div>
    <div class="">
      <div class="">
        <q-form @submit="onSubmit">

          <q-input outlined class="q-my-sm" v-model="name" label="Full Name" dense lazy-rules
            :rules="[val => val && val.length > 0 || 'Name is requried']" />

          <q-input outlined class="q-my-sm" v-model="email" label="Email Address" dense lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />

          <q-input v-model="password" class="q-my-sm" outlined label="Password" dense :type="isPwd ? 'password' : 'text'"
            lazy-rules :rules="[val => val && val.length > 0 || 'Password is required']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <q-btn color="primary" class="full-width sub-btn text-weight-bolder" padding="md" label="Create Account"
            type="submit" />

        </q-form>
      </div>
      <div class="q-my-lg">
        Alreay have an account?
        <q-btn outline label="Log In" dense class="q-px-lg q-mx-md sub-btn-outline" @click="changePage('loginPage')" />
      </div>
    </div>
  </div>
</template>
<script>
import AccountLogIn from "./AccountLogIn.vue";
export default {
  name: 'create-account-page',
  components: {
    AccountLogIn
  },
  data() {
    return {
      isPwd: true,
      name: '',
      email: "",
      password: "",
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
    onSubmit() {

    }
  }
}
</script>

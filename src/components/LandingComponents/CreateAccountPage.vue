<template>
  <div>
    <div class="text-h5 text-weight-bolder">Create Account</div>
    <account-log-in />
    <div class="full-width text-center q-py-sm">OR</div>
    <div class="">
      <div class="">
        <q-form @submit="onSubmit">

          <q-input outlined class="q-my-sm" v-model="name" label="Name" dense lazy-rules
            :rules="[val => val && val.length > 0 || 'Name is requried']" />

          <q-input outlined class="q-my-sm" v-model="userName" label="User Name" dense lazy-rules
            :rules="[val => val && val.length > 0 || 'User Name is requried']" />

          <q-input outlined class="q-my-sm" v-model="email" label="Email Address" dense lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />

          <q-input v-model="password" class="q-my-sm" outlined label="Password" dense :type="isPwd ? 'password' : 'text'"
            lazy-rules :rules="[val => val && val.length > 0 || 'Password is required']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <q-input v-model="confirmPassword" class="q-my-sm" outlined label="Confirm Password" dense
            :type="isCrmPwd ? 'password' : 'text'" lazy-rules
            :rules="[val => val && val.length > 0 && password === val || 'Confirm Password is Wrong']">
            <template v-slot:append>
              <q-icon :name="isCrmPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isCrmPwd = !isCrmPwd" />
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
import { urls } from "./Urls"
export default {
  name: 'create-account-page',
  components: {
    AccountLogIn
  },
  data() {
    return {
      isPwd: true,
      isCrmPwd: true,
      name: '',
      userName: '',
      email: "",
      password: "",
      confirmPassword: '',
    }
  },
  methods: {
    showMsg(message, type) {
      this.$q.notify({
        message: message || "Something Went Wrong!",
        type: type,
        position: 'top-right',
        actions: [
          { icon: 'close', color: 'white', handler: () => { } }
        ]
      });
    },
    changePage(page) {
      this.$emit('changePage', page);
    },
    onSubmit() {
      this.$api.post(urls.registerUrl, {
        name: this.name,
        username: this.userName,
        email: this.email,
        password: this.password,
      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    }
  }
}
</script>

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
          <q-btn color="primary" no-caps class="full-width sub-btn" padding="md" label="Log In" type="submit"
            :disable="loading">
            <q-spinner-facebook color="white" class="q-pl-sm" v-if="loading" />
          </q-btn>
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
import { urls } from "./Urls"
import { storeToRefs } from "pinia";
import { useSessionStore } from "src/stores/session";
export default {
  name: 'login-page',
  setup() {
    const session = useSessionStore();
    const { token, userType } = storeToRefs(session);
    const { setSessionToken, setUserType } = session;
    return {
      setSessionToken,
      setUserType,
      token,
      userType
    }
  },
  components: {
    AccountLogIn
  },
  data() {
    return {
      isPwd: true,
      rememberMe: false,
      email: "",
      password: "",
      loading: false,
    }
  },
  mounted() {
    if (this.token) {
      this.$router.push({ path: '/' });
    }
  },
  watch: {
    token() {
      if (this.token) {
        this.$router.push({ path: '/' });
      }
    },
    userType() {
      if (this.token) {
        this.$router.push({ path: '/' });
      }
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
      if (!this.loading) {
        this.loading = true;
        this.$api.post(urls.signInUrl, {
          usernameOrEmail: this.email,
          password: this.password,
        }).then(response => {
          this.loading = false;
          // if (response.data.success) {
          sessionStorage.setItem('accessToken', response.data.accessToken);
          sessionStorage.setItem('userType', 1);
          this.setSessionToken(response.data.accessToken);
          this.setUserType(response.data.userType || 1);

          // } else {
          // this.showMsg(response.data.message || "Something Went Wrong!");
          // }
        }).catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
      }

    }
  }
}
</script>
./Urls

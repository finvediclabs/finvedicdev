<template></template>

<script>
import { storeToRefs } from "pinia";
import { useSessionStore } from "src/stores/session";

export default {
  name: 'IndexPage',
  setup() {
    const session = useSessionStore();
    const { token, userType } = storeToRefs(session);
    // session.setSessionToken();
      console.log('Session Store:', session);
    return {
      token,
      userType,
    }
  },
  mounted() {
    this.verifyToken();
  },
  methods: {
    verifyToken() {
      if (this.token) {
        if (this.userType == 'Admin') {
          this.$router.push({ path: '/admin' });
        } else {
          this.$router.push({ path: '/library/books' });
        }
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

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
        if (this.userType == 1) {
          this.$router.push({ path: '/admin' });
        } else {
          this.$router.push({ path: '/labs' });
        }
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

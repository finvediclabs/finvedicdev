<template>
  <router-view />
</template>
<script>
import { storeToRefs } from "pinia";
import { useSessionStore } from "src/stores/session";
export default {
  name: 'App',
  setup() {
    // sessionStorage.setItem('accessToken', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzcmkuZW1haWxAZ21haWwuY29tIiwiaWF0IjoxNjk4ODU2NTY1LCJleHAiOjE2OTk0NjEzNjV9.0UXHHDBj8bbd4mkFJeSJHe6JpeOJN_MSIdyoXs5byqiLZywIX3kEkObTAjGwUTuJ')
    const session = useSessionStore();
    const { token, userType } = storeToRefs(session);
    session.setSessionToken(sessionStorage.getItem('accessToken'));
    return {
      token,
      userType
    }
  },
}
</script>

import { defineStore } from 'pinia';
import { setToken } from "src/boot/axios"

export const useSessionStore = defineStore('session', {
  state: () => ({
    token: sessionStorage.getItem('accessToken') || null,
    userType: sessionStorage.getItem('userType') || null,
  }),
  getters: {

  },
  actions: {
    setSessionToken(val) {
      setToken(val);
      this.token = val;
    },
    setUserType(val) {
      this.userType = val;
    }
  },
});

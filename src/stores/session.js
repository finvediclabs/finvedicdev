import { defineStore } from 'pinia';
import { setToken } from "src/boot/axios"
import { useProfileStore } from "./profile"

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
      const profile = useProfileStore();
      profile.fetchProfile();
    },
    setUserType(val) {
      this.userType = val;
    }
  },
});

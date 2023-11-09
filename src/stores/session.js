import { defineStore } from 'pinia';
import { setToken } from "src/boot/axios"
import { useProfileStore } from "./profile"
import { useRolesStore } from "./roles"

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

      const rolesStore = useRolesStore();
      rolesStore.fetchRoles();
    }
  },
});

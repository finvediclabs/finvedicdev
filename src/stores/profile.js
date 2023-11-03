import { defineStore } from 'pinia';
import axios from 'axios'
const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
  }),
  getters: {

  },
  actions: {
    fetchProfile() {
      axios.get(baseUrl + 'accounts/2').then(response => {
        this.user = response.data.data;
      })
    },
  },
});

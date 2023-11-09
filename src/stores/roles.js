import { defineStore } from 'pinia';
import axios from 'axios'
const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
export const useRolesStore = defineStore('roles', {
  state: () => ({
    roles: [],
  }),
  getters: {

  },
  actions: {
    fetchRoles() {
      axios.get(baseUrl + 'api/roles').then(response => {
        this.roles = response.data.data;
      })
    },
  },
});

import { defineStore } from 'pinia';
import axios from 'axios';
import { useSessionStore } from "src/stores/session"; // Import the session store

const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';

export const useRolesStore = defineStore('roles', {
  state: () => ({
    roles: [],
  }),
  getters: {},
  actions: {
    fetchRoles() {
      const sessionStore = useSessionStore(); // Get the session store
      const token = sessionStore.token; // Retrieve the token

      const headers = {
        Authorization: `Bearer ${token}`, // Attach the token in the request headers
      };

      axios.get(baseUrl + 'api/roles', { headers }) // Pass headers in the request
        .then(response => {
          this.roles = response.data.data; // Set the roles data
        })
        .catch(error => {
          console.error('Error fetching roles:', error);
          // Handle unauthorized access (401) if needed
          if (error.response && error.response.status === 401) {
            // Perform any specific action on 401 Unauthorized
          }
        });
    },
  },
});


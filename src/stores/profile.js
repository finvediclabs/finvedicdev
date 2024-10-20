import { defineStore } from 'pinia';
import axios from 'axios';
import { useSessionStore } from "src/stores/session"; // Import the session store

const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    user: sessionStorage.getItem('profile') ? JSON.parse(sessionStorage.getItem('profile')) : null,
  }),
  getters: {},
  actions: {
    fetchProfile() {
      const sessionStore = useSessionStore(); // Get the session store
      const token = sessionStore.token; // Retrieve the token

      const headers = {
        Authorization: `Bearer ${token}`, // Attach the token in the request headers
      };

      axios.get(baseUrl + 'api/accounts/2', { headers }) // Pass headers in the request
        .then(response => {
          this.profile = response.data.data; // Set the profile data
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
          // Handle unauthorized access (401) if needed
          if (error.response && error.response.status === 401) {
            // Perform any specific action on 401 Unauthorized
          }
        });
    },
    setUserData(user) {
      sessionStorage.setItem('profile', JSON.stringify(user));
      this.user = user; // Update the state with the new user data
    }
  },
});


import { boot } from 'quasar/wrappers';
import axios from 'axios';
import qs from "qs";

// Create API base URL
const coreUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';

const api = axios.create({
  baseURL: coreUrl,
  paramsSerializer: function (params) {
    const a = qs.stringify(params, { arrayFormat: 'brackets' });
    return a;
  },
});

// Token management function
export function setToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// Check if token exists in sessionStorage on boot and set it
const token = sessionStorage.getItem('authToken'); // Retrieve token from sessionStorage
if (token) {
  setToken(token); // Set the token in Axios default headers
}

export default boot(({ app }) => {
  // Make Axios globally available in Vue components as this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };

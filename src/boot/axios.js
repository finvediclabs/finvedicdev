import { boot } from 'quasar/wrappers'
import axios from 'axios'
import qs from "qs"

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const coreUrl =(process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/'

const api = axios.create({
  baseURL: coreUrl,
  paramsSerializer: function (params) {
    const a = qs.stringify(params, { arrayFormat: 'brackets' });
    return a;
  },
 })

 export function setToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api }

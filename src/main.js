import Vue from "vue";
import App from "./layouts/App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "./axios";

import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'mdi'
})

Vue.config.productionTip = false;

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {BootstrapVue} from "bootstrap-vue"
import ElementUI from 'element-ui';
import Plugin from './plugins'

import interceptorsSetup from "@/helpers/http-interceptor"
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;
interceptorsSetup();

// move to plugins file
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue)
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {BootstrapVue} from "bootstrap-vue"
import ElementUI from 'element-ui';
import VueECharts from "vue-echarts";

import interceptorsSetup from "@/helpers/http-interceptor"
import {faHome, faSignInAlt, faSignOutAlt, faUser, faUserPlus} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;
interceptorsSetup();

// move to plugins file
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component("v-chart", VueECharts);
Vue.use(BootstrapVue)
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

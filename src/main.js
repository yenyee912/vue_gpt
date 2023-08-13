import Vue from 'vue';
import App from './App.vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import BubbleChat from "vue-bubble-chat";

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(BubbleChat);


new Vue({
  render: (h) => h(App),
}).$mount('#app');


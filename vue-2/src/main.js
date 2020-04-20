import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
Vue.config.productionTip = false;
/* eslint-disable no-unused-vars */

var vm = new Vue({
  render: (h) => h(App),
}).$mount("#app");
/* eslint-enable no-unused-vars */

import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VeeValidatePlugin from "./includes/validation";
/*vue axios*/
import VueAxios from "vue-axios";
import axios from "./includes/axiosConfig";

/*bootstrap 5*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

/*custom css*/
import "./assets/main.css";

/*import fontawesome Library*/
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

/*sweet alert 2*/
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Vue3SimpleHtml2pdf from "vue3-simple-html2pdf";

/*check if the user is authenticated before vue initialize*/
if (localStorage.getItem("ss-token") != null) {
  store.dispatch("checkAuthenticated").then(() => {
    creatVueInctance();
  });
} else {
  creatVueInctance();
}

/*function to create a vue instance*/
function creatVueInctance() {
  const app = createApp(App);

  app.use(store);
  app.use(router);
  app.use(VeeValidatePlugin);
  app.use(VueAxios, axios);
  app.use(VueSweetalert2);
  app.use(Vue3SimpleHtml2pdf);

  app.mount("#app");
}

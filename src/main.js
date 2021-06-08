import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./routes";
import store from "@/store";

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");

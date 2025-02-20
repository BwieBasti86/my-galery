import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router.js";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
  data() {
    return {
      routes: "",
      config: null,
      toasterOptions: undefined,
    };
  },
  mounted() {
    this.getConfig();
    this.$on("toast", (options) => {
      console.log("toast", options);
      this.toasterOptions = options;
    });
  },
  methods: {
    async getConfig() {
      let configPromise = await fetch(window.location.origin + "/config.json");
      this.config = await configPromise.json();
    },
    loading(loaderData) {
      console.log(loaderData);
      this.$emit("loading-event", {
        active: loaderData.active,
        message: loaderData.message,
      });
    },
    toast(options) {
      this.$emit("toast", options);
    },
  },
  computed: {
    isMobile() {
      let regExp = /android|iphone|kindle|ipad|mac os/i;
      return regExp.test(navigator.userAgent);
    },
  },
}).$mount("#app");

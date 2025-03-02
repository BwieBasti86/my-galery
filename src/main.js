import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router.js";
import api from "./services/rest/index.js";

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
 async mounted() {
    await this.getConfig();
    api.init({configLocation:this.config.configLocation})
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
    async handleRequest(options){
      let result = undefined;
      this.loading({active:true,message:options.message})
      result = await options.callback()
      this.loading({active:false,message:null})
      return result;
    }
  },
  computed: {
    isMobile() {
      let regExp = /android|iphone|kindle|ipad|mac os/i;
      return regExp.test(navigator.userAgent);
    },
  },
}).$mount("#app");

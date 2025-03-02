<template>
  <v-app
    v-if="$root.config && Object.keys($root.config).length > 0"
    id="inspire"
  >
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense nav>
        <div v-for="(route, index) in navSelection" :key="index">
          <v-list-group
            v-if="route.meta.subRoutes"
            :value="false"
            :prepend-icon="route.icon"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="route.name"></v-list-item-title>
              </v-list-item-content>
              <!-- <v-list-item-title>{{ route.name }}</v-list-item-title> -->
            </template>

            <v-list-item
              v-for="(subTitle, index) in route.meta.subRoutes"
              :key="index"
              link
            >
              <v-list-item-content
                @click="
                  $router.push({
                    name: route.name,
                    params: { category: subTitle },
                  })
                "
              >
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize"
                    v-text="
                      route.name !== 'Gallerie'
                        ? subTitle
                        : $root.config.galleryTabCategorys.find(
                            (cat) => cat.category === subTitle
                          ).name
                    "
                  ></v-list-item-title>
                </v-list-item-content>
                <!-- <v-list-item-title>{{
                  route.name !== "Gallerie"
                    ? subTitle
                    : $root.config.galleryTabCategorys.find(
                        (cat) => cat.category === subTitle
                      ).name
                }}</v-list-item-title> -->
              </v-list-item-content>

              <!-- <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
              <v-list-item-title v-text="title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item> -->
            </v-list-item>
          </v-list-group>
          <v-list-item v-else @click="$router.push(route.path)" link>
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h8">
            <span class="d-none d-sm-inline-block">Sebastian Jacob |</span>
            Webentwicklung und Fotografie
          </v-list-item-title>

          <v-list-item-subtitle class="text-capitalize">
            <v-icon @click="dialog = !dialog">mdi-information-outline</v-icon>
            {{ routeName }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-app-bar-nav-icon
          style="background:white"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-list-item>
    </v-app-bar>

    <v-main>
      <!-- <v-progress-linear
        v-if="loading.active"
        class="text-center"
        height="16"
        fixed
        indeterminate
      >
        <template>
          <small style="color:white">{{ loading.message }}</small>
        </template></v-progress-linear
      > -->

      <router-view />
    </v-main>
    <modal
      v-on:close-dialog="closeDialog()"
      :inputDialog="dialog"
      :inputData="{
        title: routeName,
        textContent: route.meta.info,
      }"
    />
    <Toaster :toasterOptions="$root.toasterOptions" />
    <v-overlay style="z-index: 9999;" :value="loading.active">
        <v-progress-linear
          class="text-center"
          height="16"
          fixed
          indeterminate
        >
          <template>
            <small style="color:white">{{ loading.message }}</small>
          </template></v-progress-linear
        ></v-overlay
      >
  </v-app>
  <!-- <v-app id="inspire">
    <v-card height="400" width="256" class="mx-auto">
      <v-navigation-drawer v-model="drawer" app class="pt-3">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $route.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="route in $router.options.routes"
            :key="$router.options.routes.indexOf(route)"
            @click="$router.push(route.path)"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-main>
      <router-view />
    </v-main>
  </v-app> -->
</template>

<script>
import Modal from "./components/shared/Modal.vue";
import Toaster from "./components/Toaster.vue";
export default {
  name: "App",

  components: { Modal, Toaster },
  data: () => ({
    drawer: null,
    currentSecDesc: "Sebastian Jacob",
    dialog: false,
    loading: {
      active: false,
      message: null,
    },
  }),
  // const dummyToasts = [
  //     {
  //       text: "Mich muss man ertragen bis die Zeit rum ist",
  //       color: "error",
  //       timeout: 10000,
  //       noClose: true,
  //     },
  mounted() {
    this.$root.$on("loading-event", (e) => {
      if (!e.active) {
        setTimeout(() => {
          this.loading.active = e.active;
          this.loading.message = e.message;
        }, 2000);
      } else {
        this.loading.active = e.active;
        this.loading.message = e.message;
      }
    });

    console.log(this.$routes);
    console.log(this.$router);
    console.log("isMobile");
    console.log(this.$root.isMobile);

    if (this.$route.path === "/") {
      this.$router.push("/about/vita");
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    getEasterEgg() {
      const desc = [
        "Super Jaws",
        "Script Java",
        "Salty Jam",
        "Sinister Jedi",
        "Supreme Jellyfish",
      ];
      return desc[this.getRandomInt(0, desc.length - 1)];
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
  computed: {
    headerInfo() {
      return this.isMobile
        ? "Webentwicklung und Fotografie"
        : "Sebastian Jacob | Webentwicklung und Fotografie";
    },
    isMobile() {
      return this.$root.isMobile;
    },
    route() {
      return this.$route;
    },
    routeName() {
      return this.route.params.category !== undefined
        ? this.route.name + " / " + this.route.params.category
        : this.route.name;
    },

    navSelection() {
      return this.$router.options.routes.filter((route) =>
        this.$root.config.navLinks.includes(route.id)
      );
    },
  },
};
</script>

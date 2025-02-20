<template>
  <v-app>
    <v-main style="padding:25px">
      <!-- <v-tabs>
        <v-tab
          v-for="(category, index) in $router.options.routes.find(
            (route) => route.name === 'Gallerie'
          ).meta.subRoutes"
          :key="index"
          @click="selectedCategory = category"
          >{{
            $root.config.galleryTabCategorys.find(
              (cat) => cat.category === category
            ).name
          }}</v-tab
        >
      </v-tabs> -->

      <v-container v-if="imageSelection">
        <v-row>
          <v-col
            v-for="(img, index) in imageSelection"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
          >
            <image-card
              width="100"
              :image="img"
              v-on:openimagemodal="
                (selectedDialogImage = $event), (dialog = true)
              "
            />
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="dialog" fullscreen>
        <v-card>
          <v-img
            @click="dialog = false"
            :src="selectedDialogImage"
            :lazy-src="selectedDialogImage"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="auto"
          />

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Schließen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
  import ImageCard from "./../shared/ImageCard.vue";
  export default {
    name: "ImageGallery",

    components: { ImageCard },

    data: () => ({
      selectedCategory: "all",
      dialog: false,
      selectedDialogImage: null,
    }),
    mounted() {
      console.log(this.$route.params);
      if (this.$route.params.category.length > 0) {
        this.selectedCategory = this.$route.params.category;
      }
    },
    methods: {},
    computed: {
      imageCategory() {
        return this.$route.params.category.length > 0
          ? this.$route.params.category
          : "/all";
      },
      imageSelection() {
        return this.imageCategory === "all"
          ? this.$root.config.galleryImages
          : this.$root.config.galleryImages.filter((img) =>
              img.categorys.includes(this.imageCategory)
            );
      },
    },
  };
</script>

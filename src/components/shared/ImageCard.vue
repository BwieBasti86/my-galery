<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{ imageObject.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ imageObject.location }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <!-- <v-img
      :src="getImagePath(imageObject.sources)"
      :lazy-src="getImagePath(imageObject.sources)"
      aspect-ratio="1"
      class="grey lighten-2"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img> -->
    <v-carousel
      width="auto"
      height="300"
      :show-arrows="imageObject.sources.length > 1 ? true : false"
    >
      <v-carousel-item
        @click="openModal(getImagePath(imageSrc))"
        v-for="(imageSrc, index) in imageObject.sources"
        :key="index"
        :src="getImagePath(imageSrc)"
        :lazy-src="getImagePath(imageSrc)"
        reverse-transition="fade-transition"
        transition="fade-transition"
        aspect-ratio="1"
        class="grey lighten-2"
      >
        <!-- <v-img
        :src="getImagePath(imageSrc)"
        :lazy-src="getImagePath(imageSrc)"
        aspect-ratio="1"
        class="grey lighten-2"
      > -->
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <!-- </v-img> -->
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <v-row>
        <!-- <v-col>
 
        </v-col> -->
        <v-col>
          <v-chip
            style="margin:2px"
            x-small
            chip
            v-for="(category, index) in imageObject.categorys"
            :key="index"
            :color="getColor(category)"
          >
            {{ category }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-container
      ><v-chip v-for="(category, index) in imageObject.categorys" :key="index">
        {{ category }}
      </v-chip></v-container
    > -->

    <!-- <p>{{ imageObject.title }}</p> -->
  </v-card>
</template>

<script>
  export default {
    name: "ImageCard",

    components: {},
    props: {
      image: [Object] || {},
    },
    // data: () => ({
    //   imageObject: this.image || {},
    // }),
    data(){
      return{
        imageObject: this.image || {},
      }
    },
    methods: {
      openModal(img) {
        this.$emit("openimagemodal", img);
      },
      log(msg) {
        console.log(msg);
      },
      getImagePath(p) {
        return window.location.origin + "/" + p;
      },
      getColor(category) {
        let mapping = {
          wildlife: "red",
          macro: "blue",
          nature: "yellow",
          plants: "green",
          insects: "purple",
          aesthetic: "pink",
          pets: "orange",
          birds: "cyan",
        };
        return mapping[category];
      },
    },
    watch: {
      image(newValue) {
        this.imageObject = newValue;
      },
    },
    mounted() {

    },
  };
</script>

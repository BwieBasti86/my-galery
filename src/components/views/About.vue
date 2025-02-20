<template>
  <v-container>
    <!-- <v-row>
      <v-col>
        <v-img height="180px" :src="origin + pic">


          <v-card-title
            class="white--text mt-8"
            style="padding-top:0px;margin-top:20px!important"
          >
            <v-avatar size="145">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              />
            </v-avatar>
            <p class="ml-3">
              John Doe
            </p>

          </v-card-title>
        </v-img>
   
      </v-col>
    </v-row> -->

    <career />
  </v-container>
</template>

<script>
  import Career from "../Career.vue";

  export default {
    name: "About",

    components: {
      Career,
    },

    data: () => ({
      bannerPic: "",
      randomInt: 0,
    }),
    mounted() {
      // setInterval(() => {
      //   this.randomInt = this.getRandomInt(this.aestheticPics.length);
      // }, 10000);
    },
    methods: {
      getRandomInt(max) {
        return Math.floor(Math.random() * max);
      },
    },
    computed: {
      origin() {
        return window.location.origin + "/";
      },
      pic() {
        return this.aestheticPics[this.randomInt][0];
      },
      aestheticPics() {
        return this.$root.config.galleryImages
          .filter((img) => img.categorys.includes("aesthetic"))
          .map((img) => {
            return img.sources;
          });
      },
    },
  };
</script>

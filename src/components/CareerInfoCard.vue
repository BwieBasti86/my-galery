<template>
  <v-card>
    <v-img v-if="showImgHeader" :src="origin + pic" height="200px">
      <v-card-title class="white--text mt-8">
        <v-avatar size="140">
          <img alt="user" :src="profileImage" />
        </v-avatar>
        <p class="ml-3">{{ baseData.firstName }} {{ baseData.lastName }}</p>
      </v-card-title></v-img
    >

    <v-card-title>
      {{ baseData.jobTitle }}
    </v-card-title>

    <v-card-subtitle>
      {{ baseData.subTitle }}
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-subtitle class="info-secondary">
      <v-icon>mdi-map-marker</v-icon>
      {{`${isPdfView ? baseData.adress : `${baseData.city},${baseData.land},${baseData.country}`}`}}
    </v-card-subtitle>
    <v-card-subtitle class="info-secondary">
      <v-icon>mdi-cake-variant</v-icon>
      {{ baseData.dateOfBirth | dateFormatter }}
    </v-card-subtitle>
    <v-card-subtitle v-if="!isPdfView" class="info-secondary">
      <v-icon>mdi-comment</v-icon>
      {{ baseData.info }}
    </v-card-subtitle>
    <v-card-subtitle v-if="isPdfView" class="info-secondary">
      <v-icon>mdi-phone</v-icon>
      {{ baseData.phone }}
    </v-card-subtitle>
    <v-card-subtitle v-if="isPdfView" class="info-secondary">
      <v-icon>mdi-at</v-icon>
      {{ baseData.mail }}
    </v-card-subtitle>
    <v-divider v-if="showSpareTimeInfo" class="mx-4"></v-divider>
    <v-row v-if="showSpareTimeInfo">
      <v-col>
        <v-card-title class="d-flex justify-space-between">
          Hobby's & Freizeit<v-switch v-if="!isPdfView" v-model="hobbyItemsView"></v-switch>
        </v-card-title>
      </v-col>
    </v-row>

    <v-container v-if="showSpareTimeInfo">
      <v-row>
        <v-col class="d-flex justify-space-around pt-0" v-if="!hobbyItemsView">
          <v-icon
            large
            v-for="(item, index) in spareTimeData"
            :key="index"
            :color="item.color"
          >
            {{ item.icon }}
          </v-icon>
        </v-col>
        <v-col style="padding-top:0px" v-else>
          <v-chip
            :color="item.color"
            style="margin:3px;color:white"
            small
            chip
            v-for="(item, index) in spareTimeData"
            :key="index"
          >
            {{ item.name }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
//{{ baseData.city }}, {{ baseData.land }},
//{{ baseData.country }}
//:style="'margin-left:' + `${$root.isMobile ? '70px' : '55px'}`"
import moment from "moment";
export default {
  props:{
    showSpareTimeInfo:{
      type:Boolean,
      default:true
    },
    showImgHeader:{
      type:Boolean,
      default:true
    }
  },
  data: () => ({
    randomInt: 0,
    hobbyItemsView: false,
    bannerIndex:1,
  }),
  mounted() {
    setInterval(() => {
      this.randomInt = this.getRandomInt(this.aestheticPics.length);
    }, 10000);
  },

  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
  },
  computed: {
    profileImage() {
      return (
        window.location.origin + "/" + this.$root.config.personInfo.profilePic
      );
    },
    moment() {
      return moment();
    },
    origin() {
      return window.location.origin + "/";
    },
    pic() {
      return this.bannerIndex ? this.aestheticPics[this.bannerIndex][0] : this.aestheticPics[this.randomInt][0];
    },
    spareTimeData() {
      return this.$root.config.personInfo.spareTime;
    },
    baseData() {
      return this.$root.config.personInfo.baseData;
    },
    aestheticPics() {
      return this.$root.config.galleryImages
        .filter((img) => img.categorys.includes("aesthetic"))
        .map((img) => {
          return img.sources;
        });
    },
    isPdfView() {
      return [7, 8].includes(this.$route.meta.id);
    },
  },
  filters: {
    dateFormatter(val) {
      return moment(val)
        .locale("de")
        .format("LL");
    },
  },
};
</script>
<style scoped>
.info-secondary {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 20px;
}
</style>

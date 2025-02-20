<template>
    <v-card>
  
      <v-card-title>
        {{ jobAdd.company }}
      </v-card-title>
  
      <v-card-subtitle>
        {{ jobAdd.subinfo }}
      </v-card-subtitle>
      <v-divider class="mx-4"></v-divider>
      <v-card-subtitle class="info-secondary">
        <v-icon>mdi-map-marker</v-icon>
        {{`${jobAdd.street}, ${jobAdd.zip} ${jobAdd.city}`}}
      </v-card-subtitle>
      <v-card-subtitle v-if="isPdfView" class="info-secondary">
        <v-icon>mdi-phone</v-icon>
        {{ jobAdd.phone }}
      </v-card-subtitle>
      <v-card-subtitle v-if="isPdfView" class="info-secondary">
        <v-icon>mdi-at</v-icon>
        {{ jobAdd.mail }}
      </v-card-subtitle>
    </v-card>
  </template>
  
  <script>
  //{{ baseData.city }}, {{ baseData.land }},
  //{{ baseData.country }}
  //:style="'margin-left:' + `${$root.isMobile ? '70px' : '55px'}`"
  import moment from "moment";
  export default {
    props:{
      jobAddInput:{
        type:String,
      }
    },
    watch:{
      jobAddInput(val){
        this.jobAdd = val
      }
    },
    data: () => ({
      jobAdd:undefined,
      randomInt: 0,
      hobbyItemsView: false,
    }),
    mounted() {
      this.jobAdd = this.jobAddInput

    },
  
    methods: {

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
        return this.aestheticPics[this.randomInt][0];
      },
      spareTimeData() {
        return this.$root.config.personInfo.spareTime;
      },
      baseData() {
        return this.$root.config.personInfo.baseData;
      },
      jobApplicationData(){
        return this.$root.config.jobApplicationData;
      },
      currentJobAdd(){
        return this.jobApplicationData.companies[this.$root.config.jobApplicationData.current];
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
  
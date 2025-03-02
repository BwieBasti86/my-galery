<template>
  <JobApplicationEditorComponent @on-company-profile="saveProfile($event)" />
</template>
<script>
import JobApplicationEditorComponent from './JobApplicationEditorComponent.vue';
import api from '../services/rest';

export default {
  components: {JobApplicationEditorComponent},
  data: () => ({}),

  mounted() {},
  methods: {
    log(e) {
      console.log(e);
    },
    async saveProfile(companyProfile) {
      this.$root.handleRequest({
        callback: ()=> api.saveProfile(companyProfile),
        message: "Neues Anschreiben wird angelegt",
      });
      
    },
  },
  computed: {
    config() {
      return this.$root.config;
    },
  },
  filters: {},
};
</script>

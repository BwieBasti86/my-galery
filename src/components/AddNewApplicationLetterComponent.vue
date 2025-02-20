<template>
  <JobApplicationEditorComponent @on-company-profile="saveProfile($event)" />
</template>
<script>
import JobApplicationEditorComponent from './JobApplicationEditorComponent.vue';

export default {
  components: {JobApplicationEditorComponent},
  data: () => ({}),

  mounted() {},
  methods: {
    log(e) {
      console.log(e);
    },
    async saveProfile(companyProfile) {
      console.log(companyProfile)
      this.$root.loading({
        active: true,
        message: "Neues Anschreiben wird angelegt",
      });
      const url = "http://localhost:3000/addCompanyProfile";
      const options = {
        method: "POST",
        body: JSON.stringify(
          Object.assign(companyProfile, {
            filePath: this.config.configLocation,
          })
        ),
        headers: { "Content-Type": "application/json" },
      };
      await fetch(url, options);
      this.$root.loading({ active: false, message: null });
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

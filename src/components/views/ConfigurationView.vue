<template>
  <v-container id="configuration">
    <v-tabs v-model="tab"
      ><v-tab>Anschreiben Übersicht</v-tab>
      <v-tab>Anschreiben anlegen</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <JobApplicationsOverviewComponent />
      </v-tab-item>
      <v-tab-item>
        <AddNewApplicationLetterComponent />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
import AddNewApplicationLetterComponent from "../AddNewApplicationLetterComponent.vue";
import JobApplicationsOverviewComponent from "../JobApplicationsOverviewComponent.vue";

export default {
  components: {
    AddNewApplicationLetterComponent,
    JobApplicationsOverviewComponent,
  },
  data: () => ({
    file: undefined,
    tab: null,
    contactPerson: "",
    companyProfile: {
      companyId: "",
      company: "",
      subinfo: "",
      city: "",
      street: "",
      zip: "",
      phone: "",
      mail: "",
      jobdescription: "",
      applicationHeader: "",
      applicationLetter: "",
      applied: false,
      succeeded: false,
      current: false,
    },
  }),
  mounted() {},
  methods: {
    log(e) {
      console.log(e);
    },
    async saveProfile() {
      const url = "http://localhost:3000/addCompanyProfile";
      const options = {
        method: "POST",
        body: JSON.stringify(
          Object.assign(this.companyProfile, {
            filePath: this.config.configLocation,
          })
        ),
        headers: { "Content-Type": "application/json" },
      };
      await fetch(url, options);
    },
  },
  computed: {
    headerItems() {
      let result = ["Sehr geehrte Damen und Herren"];
      const genderSpecifics = ["Sehr geehrte Frau", "Sehr geehrter Herr"];

      if (this.companyProfile.company) {
        result.push(`Sehr geehrtes ${this.companyProfile.company} Team`);
      }
      if (this.contactPerson) {
        genderSpecifics.forEach((entry) => {
          result.push(`${entry} ${this.contactPerson}`);
        });
      }

      return result;
    },
    config() {
      return this.$root.config;
    },
  },
  filters: {},
};
</script>

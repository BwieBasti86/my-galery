<template>
  <v-container id="configuration">
    <h4>Firmeninformationen</h4>
    <v-row>
      <v-col>
        <v-text-field
          label="Kürzel/Schlüssel"
          v-model="companyProfile.companyId"
        />
      </v-col>
      <v-col>
        <v-text-field label="Firmenname" v-model="companyProfile.company" />
      </v-col>
      <v-col>
        <v-text-field
          label="Unterinformation"
          v-model="companyProfile.subinfo"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Straße" v-model="companyProfile.street" />
      </v-col>
      <v-col>
        <v-text-field label="PLZ" v-model="companyProfile.zip" />
      </v-col>
      <v-col>
        <v-text-field label="Stadt" v-model="companyProfile.city" />
      </v-col>
    </v-row>
    <v-divider />
    <h4 class="pt-15">Firmenkontakt</h4>
    <v-row>
      <v-col>
        <v-text-field label="Telefonnummer" v-model="companyProfile.phone" />
      </v-col>
      <v-col>
        <v-text-field label="E-Mail" v-model="companyProfile.mail" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          label="Ansprechpartner (Optional)"
          v-model="contactPerson"
        />
      </v-col>
    </v-row>
    <v-divider />
    <h4 class="pt-15">Anschreiben</h4>
    <v-row>
      <v-col>
        <v-text-field
          label="Jobbezeichnung"
          v-model="companyProfile.jobdescription"
        />
      </v-col>
      <v-col>
        <!-- <v-text-field label="Kopftitel" v-model="companyProfile.applicationHeader" /> -->
        <v-combobox
          v-model="companyProfile.applicationHeader"
          :items="headerItems"
          hide-selected
          label="Kopftitel"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-textarea
        class="pl-4"
        label="Bewerbungstext"
        v-model="companyProfile.applicationLetter"
      />
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="saveProfile()">
          Speichern
        </v-btn>
        <v-btn @click="loadTest()">
          Test
        </v-btn>
      </v-col>
      <v-col>
        <v-checkbox
          class="pb-10"
          label="Aktuelles Profil setzen"
          v-model="companyProfile.current"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  components: {},
  data: () => ({
    file: undefined,
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
    loadingTest:false,
  }),
  mounted() {},
  methods: {
    log(e) {
      console.log(e);
    },
    async saveProfile() {
      
      this.$root.loading({
        active: true,
        message: "Neues Anschreiben wird angelegt",
      });
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
      this.$root.loading({ active: false, message: null });
    },
    loadTest() {
      this.loadingTest = !this.loadingTest
      this.$root.loading({
        active: this.loadingTest,
        message: "Neues Anschreiben wird angelegt",
      });
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

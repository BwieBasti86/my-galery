<template>
  <v-container id="configuration">
    <h4>Firmeninformationen</h4>
    <v-row>
      <v-col>
        <v-text-field
          label="Kürzel/Schlüssel"
          v-model="companyProfile.companyId"
          :disabled="!keyEditable"
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
      <v-col>
        <v-menu
          v-model="datepickerMenu"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="formattedApplicationDate"
              clearable
              label="Datum der Bewerbung (Optional)"
              v-bind="attrs"
              v-on="on"
              @click:clear="companyProfile.applicationDate = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="companyProfile.applicationDate"
            @change="datepickerMenu = false"
          ></v-date-picker>
        </v-menu>
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
        <v-btn @click="emitProfile()">
          Speichern
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
import moment from "moment";
export default {
  components: {},
  props: {
    companyProfileInput: Object,
    keyEditable: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    companyProfileInput(newVal) {
      (this.companyProfile.companyId = newVal.companyId),
        (this.companyProfile.company = newVal.company),
        (this.companyProfile.subinfo = newVal.subinfo),
        (this.companyProfile.city = newVal.city),
        (this.companyProfile.street = newVal.street),
        (this.companyProfile.zip = newVal.zip),
        (this.companyProfile.phone = newVal.phone),
        (this.companyProfile.mail = newVal.mail),
        (this.companyProfile.jobdescription = newVal.jobdescription),
        (this.companyProfile.applicationHeader = newVal.applicationHeader),
        (this.companyProfile.applicationLetter = newVal.applicationLetter);
      (this.companyProfile.created = newVal.created),
        (this.companyProfile.updated = newVal.updated);
      this.companyProfile.applicationDate =
        newVal.applicationDate ? newVal.applicationDate : undefined;
    },
  },
  data: () => ({
    file: undefined,
    contactPerson: "",

    datepickerMenu: false,
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
      created: undefined,
      updated: undefined,
      applicationDate: undefined,
    },
    loadingTest: false,
  }),
  mounted() {
    if (this.companyProfileInput) {
      (this.companyProfile.companyId = this.companyProfileInput.companyId),
        (this.companyProfile.company = this.companyProfileInput.company),
        (this.companyProfile.subinfo = this.companyProfileInput.subinfo),
        (this.companyProfile.city = this.companyProfileInput.city),
        (this.companyProfile.street = this.companyProfileInput.street),
        (this.companyProfile.zip = this.companyProfileInput.zip),
        (this.companyProfile.phone = this.companyProfileInput.phone),
        (this.companyProfile.mail = this.companyProfileInput.mail),
        (this.companyProfile.jobdescription = this.companyProfileInput.jobdescription),
        (this.companyProfile.applicationHeader = this.companyProfileInput.applicationHeader),
        (this.companyProfile.applicationLetter = this.companyProfileInput.applicationLetter),
        (this.companyProfile.created = this.companyProfileInput.created),
        (this.companyProfile.updated = this.companyProfileInput.updated);
      this.companyProfile.applicationDate = this.companyProfileInput.applicationDate ? this.companyProfileInput.applicationDate : undefined;
    }
  },
  methods: {
    log(e) {
      console.log(e);
    },
    emitProfile() {
      const result = this.applicationDate
        ? Object.assign(this.companyProfile, {
            applicationDate: this.applicationDate,
          })
        : this.companyProfile;
      this.$emit("on-company-profile", result);
    },
  },
  computed: {
    headerItems() {
      let result = ["Sehr geehrte Damen und Herren,"];
      const genderSpecifics = ["Sehr geehrte Frau", "Sehr geehrter Herr"];

      if (this.companyProfile.company) {
        result.push(`Sehr geehrtes ${this.companyProfile.company}-Team,`);
      }
      if (this.contactPerson) {
        genderSpecifics.forEach((entry) => {
          result.push(`${entry} ${this.contactPerson},`);
        });
      }

      return result;
    },
    formattedApplicationDate() {
      return this.companyProfile.applicationDate
        ? moment(this.companyProfile.applicationDate)
            .locale("de")
            .format("LL")
        : undefined;
    },
    config() {
      return this.$root.config;
    },
  },
  filters: {},
};
</script>

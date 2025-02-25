<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in companies.reverse()"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="d-flex flex-column" height="330" max-width="344">
          <v-card-title>{{ item.company }}</v-card-title>
          <v-card-subtitle>{{ item.subinfo }}</v-card-subtitle>
          <v-card-subtitle class="pt-5">{{
            item.jobdescription
          }}</v-card-subtitle>
          <v-card-subtitle class="pt-0"
            >erstellt: {{ item.created | dateFormatter }}</v-card-subtitle
          >
          <v-card-subtitle class="flex-grow-1 pt-0"
            >geändert: {{ item.updated | dateFormatter }}</v-card-subtitle
          >
          <!-- <v-card-text class="flex-grow-1">{{ item.text }}</v-card-text> -->
          <v-card-actions>
            <!-- <v-icon @click="handleEditClick(item)"
              >mdi-text-box-edit-outline</v-icon
            > -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  :color="statusVisualizadtion(item).applied.color"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ statusVisualizadtion(item).applied.icon }}
                </v-icon>
              </template>
              <span>Eingereicht:{{ item.applied }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  :color="statusVisualizadtion(item).succeeded.color"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ statusVisualizadtion(item).succeeded.icon }}
                </v-icon>
              </template>
              <span>Zusage:{{ item.succeeded }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="pl-10"
                  @click="handleEditClick(item)"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-text-box-edit-outline</v-icon
                >
              </template>
              <span>{{ item.companyId }} bearbeiten</span>
            </v-tooltip>
            <!-- <v-btn color="primary" @click="handleEditClick(item)"
              >Bearbeiten</v-btn
            > -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon @click="handleCopyClick(item)" v-bind="attrs" v-on="on"
                  >mdi-content-copy</v-icon
                >
              </template>
              <span>{{ item.companyId }} kopieren</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  @click="handleDeleteClick(item)"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-trash-can-outline</v-icon
                >
              </template>
              <span>{{ item.companyId }} löschen</span>
            </v-tooltip>
            <v-checkbox
              @change="updateCurrent(item)"
              label="Aktuell gesetzt"
              v-model="item.current"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog.active">
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{ dialog.title }}
            </v-card-title>

            <JobApplicationEditorComponent
              :companyProfileInput="dialog.content"
              @on-company-profile="saveProfile($event)"
              :keyEditable="false"
            />

            <v-divider></v-divider>

            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog.active = false">
                Schließen
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-container>
</template>

<script>
import JobApplicationEditorComponent from "./JobApplicationEditorComponent.vue";
import api from "../services/rest";
import moment from "moment";
export default {
  components: { JobApplicationEditorComponent },
  data() {
    return {
      dialog: {
        active: false,
        title: null,
        content: null,
      },

      items: [
        {
          title: "Card 1",
          subtitle: "Untertitel 1",
          text: "Ein kurzer Beschreibungstext.",
          image: "https://source.unsplash.com/random/300x200?sig=1",
        },
        {
          title: "Card 2",
          subtitle: "Untertitel 2",
          text: "Noch ein kurzer Beschreibungstext.",
          image: "https://source.unsplash.com/random/300x200?sig=2",
        },
        {
          title: "Card 3",
          subtitle: "Untertitel 3",
          text: "Etwas mehr Text für diese Karte.",
          image: "https://source.unsplash.com/random/300x200?sig=3",
        },
        {
          title: "Card 4",
          subtitle: "Untertitel 4",
          text: "Letzte Karte mit Infos.",
          image: "https://source.unsplash.com/random/300x200?sig=4",
        },
      ],
    };
  },
  mounted() {
    // this.$root.toast({
    //   text: "Mich muss man ertragen bis die Zeit rum ist",
    //   color: "error",
    //   noClose: true,
    //   timeout: 100000,
    //   callback: () => alert("test"),
    // });
  },

  methods: {
    async handleCopyClick(item) {
      this.$root.toast({
        text: `Soll wirklich eine Kopie von ${item.companyId} erstellt werden?`,
        color: "error",
        callback: async () => {
          await this.saveProfileCopy(item);
        },
      });
    },
    async saveProfileCopy(item) {
      const keyorigin = item.companyId;
      let copyKey = `${keyorigin}_copy${count}`;
      let count = 0;
      do {
        count++;
        copyKey = `${keyorigin}_copy${count}`;
      } while (this.companyKeys.includes(copyKey));
      item.companyId = copyKey;
      await this.saveProfile(item, true);
    },
    handleDeleteClick(item) {
      this.$root.toast({
        text: `Soll der Eintrag für "${item.companyId}" wirklich gelöscht werden? `,
        color: "error",
        callback: () => this.deleteProfile(item),
      });
    },
    statusVisualizadtion(item) {
      return {
        applied: {
          icon: item.applied
            ? "mdi-email-arrow-right-outline"
            : "mdi-email-remove-outline",
          color: item.applied ? "success" : "error",
        },
        succeeded: {
          icon: item.succeeded
            ? "mdi-account-check-outline"
            : "mdi-account-remove-outline",
          color: item.succeeded ? "success" : "error",
        },
      };
    },
    handleEditClick(item) {
      this.dialog.content = item;
      this.dialog.title = item.company;
      this.dialog.active = true;
    },
    async updateCurrent(item) {
      this.$root.loading({
        active: true,
        message: "Setze aktuelles Anschreiben: " + item.company,
      });

      await api.updateCurrent(item.companyId)

      this.$root.loading({ active: false, message: null });
    },
    async deleteProfile(item) {
      console.log(item);
      this.$root.loading({
        active: true,
        message: "Lösche Anschreiben: " + item.company,
      });
      await api.deleteProfile(item.companyId)

      this.$root.loading({ active: false, message: null });
    },
    async saveProfile(item, isCopy) {
      this.$root.loading({
        active: true,
        message:
          `${
            isCopy ? "Erstelle Kopie von: " : "Änderungen werden gespeichert: "
          }` + item.company,
      });
      await api.saveProfile(item)
      this.$root.loading({ active: false, message: null });
    },
  },
  computed: {
    moment() {
      return moment();
    },
    companyKeys() {
      const comps = this.$root.config.jobApplicationData.companies;
      return Object.keys(comps);
    },
    companies() {
      const comps = this.$root.config.jobApplicationData.companies;
      const current = this.$root.config.jobApplicationData.current;
      return Object.entries(comps).map((company) => {
        const companyName = company[0];
        const companyProps = company[1];

        return Object.assign(companyProps, {
          current: companyName === current,
          companyId: companyName,
        });
      });
    },
    config() {
      return this.$root.config;
    },
  },
  filters: {
    dateFormatter(val) {
      return moment(val)
        .locale("de")
        .format("lll");
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
}
/* .v-card:hover {
  transform: scale(1.05);
} */
.v-card-text {
  flex-grow: 1;
}
</style>

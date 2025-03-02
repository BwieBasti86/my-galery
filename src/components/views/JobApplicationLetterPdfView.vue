<template>
  <div>
    <v-container height="1000%" id="pdf-view">
      <v-row
        ><v-col>
          <v-img :src="origin + pic" height="200px">
            <v-card-title class="white--text mt-8">
              <v-avatar size="140">
                <img alt="user" :src="profileImage" />
              </v-avatar>
              <p class="ml-4">
                {{ baseData.firstName }} {{ baseData.lastName }}
              </p>
            </v-card-title></v-img
          >
        </v-col></v-row
      >
      <v-row>
        <v-col class="col-md-4">
          <template>
            <career-info-card
              :showImgHeader="!isAppLetter"
              :showSpareTimeInfo="false"
            />
            <br /><br />
            <application-receiver-info-card :jobAddInput="currentJobAdd" />
          </template>
        </v-col>
        <v-col class="pt-0">
          <v-container>
            <v-row>
              <v-col>
                <!-- <v-img :src="origin + pic" height="200px" max-width="auto">
                <v-card-title class="white--text mt-8">
                  <p class="ml-3">
                    MayBe my Topheader
                  </p>
                </v-card-title></v-img
              > -->
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pt-0">
                <h2>Bewerbung als {{ currentJobAdd.jobdescription }}</h2>
              </v-col>
              <v-col class="text-right">
                <span>{{
                  currentJobAdd.applicationDate || today | dateFormatter
                }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h3 style="color:rgba(0, 0, 0, 0.6)">
                  {{ currentJobAdd.applicationHeader }}
                </h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div
                  style="color:rgba(0, 0, 0, 0.6)"
                  v-html="formattedLetter"
                ></div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span style="color:rgba(0, 0, 0, 0.6)">{{
                  currentJobAdd.footer
                }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <img alt="sig" :src="sig" height="40px" width="120px" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay :value="true" absolute opacity="0.0">
      <!-- <v-icon color="primary" class="fixed-button" @click="dialog = true">
        mdi-cog-outline
      </v-icon> -->
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="primary"
              class="fixed-button"
              v-bind="attrs"
              v-on="on"
            >
              mdi-cog-outline
            </v-icon>
            <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn> -->
          </template>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Einstellungen</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-list three-line subheader>
              <!-- <v-subheader>Einstellungen</v-subheader> -->
              <v-list-item>
                <v-list-item-content>
                  <v-select
                    :items="companies"
                    item-value="key"
                    item-text="label"
                    v-model="current"
                    label="Anschreiben nach Firmen"
                  ></v-select>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list-item>
              <v-list-item-content>
                <v-expansion-panels flat v-model="panel">
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Aktuelle Anschreiben bearbeiten</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <JobApplicationEditorComponent
                        :keyEditable="false"
                        :companyProfileInput="
                          Object.assign(currentJobAdd, { companyId: current })
                        "
                        @on-company-profile="saveProfile($event)"
                      />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn @click="generatePDF()">PDF-Downloaden</v-btn>
              </v-list-item-content>
            </v-list-item>

            <!-- <v-list three-line subheader>
              <v-subheader>User Controls</v-subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Content filtering</v-list-item-title>
                  <v-list-item-subtitle
                    >Set the content filtering level to restrict apps that can
                    be downloaded</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Password</v-list-item-title>
                  <v-list-item-subtitle
                    >Require password for purchase or use password to restrict
                    purchase</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list> -->
            <!-- <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="notifications"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Notifications</v-list-item-title>
                  <v-list-item-subtitle
                    >Notify me about updates to apps or games that I
                    downloaded</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="sound"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Sound</v-list-item-title>
                  <v-list-item-subtitle
                    >Auto-update apps at any time. Data charges may
                    apply</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="widgets"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Auto-add widgets</v-list-item-title>
                  <v-list-item-subtitle
                    >Automatically add home screen widgets</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list> -->
          </v-card>
        </v-dialog>
      </v-row>
    </v-overlay>
  </div>
</template>
<script>
import CareerInfoCard from "../../components/CareerInfoCard.vue";
import ApplicationReceiverInfoCard from "../ApplicationReceiverInfoCard.vue";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import JobApplicationEditorComponent from "../JobApplicationEditorComponent.vue";
import api from "../../services/rest";

export default {
  components: {
    CareerInfoCard,
    ApplicationReceiverInfoCard,
    JobApplicationEditorComponent,
  },
  data: () => ({
    current: undefined,
    dialog: false,
    panel: [0],
    randomInt: 0,
    today: moment(new Date()).format("YYYY-MM-DD"),
    bannerIndex: 3,
  }),
  mounted() {
    this.current = this.$root.config.jobApplicationData.current;
    this.$root.toast({
      text: `Zum Pdf-Download hier bestätigen`,
      color: "primary",
      callback: () => {
        this.generatePDF();
      },
    });
    // setTimeout(() => {
    //   var elementHTML = document.querySelector("#pdf-view");
    //   this.generatePDF(elementHTML);
    // }, 3000);
  },
  methods: {
    generatePDF() {
      //   const element = document.getElementById(elementId);
      const elementId = document.querySelector("#pdf-view");
      html2canvas(elementId).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        let fileName = this.currentJobAdd.applicationDate
          ? this.currentJobAdd.applicationDate
          : this.today;
        fileName += "_" + this.currentJobAdd.company + "_Anschreiben.pdf";
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        pdf.save(fileName);
      });
    },
    async saveProfile(companyProfile) {
      this.$root.proccess({
        callback: api.saveProfile(companyProfile),
        message: "Änderungen werden gespeichert",
      });
    },
  },
  computed: {
    profileImage() {
      return (
        window.location.origin + "/" + this.$root.config.personInfo.profilePic
      );
    },
    randomColor() {
      let map = {
        0: "red",
        1: "blue",
        2: "green",
        3: "orange",
      };
      return map[Math.floor(Math.random() * Object.keys(map).length)];
    },
    //// new /////

    origin() {
      return window.location.origin + "/";
    },
    pic() {
      return this.bannerIndex
        ? this.aestheticPics[this.bannerIndex]
        : this.aestheticPics[this.randomInt][0];
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
    isAppLetter() {
      return [8].includes(this.$route.meta.id);
    },
    jobApplicationData() {
      return this.$root.config.jobApplicationData;
    },
    companies() {
      return Object.entries(this.jobApplicationData.companies).map((entry) => {
        return { key: entry[0], label: entry[1].company };
      });
    },
    currentJobAdd() {
      return this.jobApplicationData.companies[this.current];
    },
    formattedLetter() {
      return this.currentJobAdd.applicationLetter.replace(/\n/g, "<br><br>");
    },
    sig() {
      return window.location.origin + "/" + this.$root.config.personInfo.sig;
    },
    config() {
      return this.$root.config;
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
/* .overlay-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
} */
.fixed-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1050; /* Stellt sicher, dass der Button über dem Overlay bleibt */
}
</style>

<template>
  <v-container id="pdf-view">
    <v-row>
      <v-col class="col-md-4">
        <template>
          <career-info-card />

          <skills-card />
        </template>
      </v-col>
      <v-col class="pa-0">
        <time-line style="padding:20px" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CareerInfoCard from "../../components/CareerInfoCard.vue";
import TimeLine from "../../components/TimeLine.vue";
import SkillsCard from "../../components/SkillsCard.vue";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
export default {
  components: {
    CareerInfoCard,
    SkillsCard,
    TimeLine,
  },
  data: () => ({ today: moment(new Date()).format("YYYY-MM-DD") }),
  mounted() {
    this.$root.toast({
      text: `Zum Pdf-Download hier bestätigen`,
      color: "primary",
      callback: () => {
        var elementHTML = document.querySelector("#pdf-view");
        this.generatePDF(elementHTML);
      },
    });
    // setTimeout(() => {

    //   var elementHTML = document.querySelector("#pdf-view");
    //     this.generatePDF(elementHTML)
    // }, 3000);
  },
  methods: {
    async generatePDF(elementId) {
      //   const element = document.getElementById(elementId);

      html2canvas(elementId).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        let fileName = this.currentJobAdd.applicationDate
          ? this.currentJobAdd.applicationDate
          : this.today;
        fileName += "_" + this.currentJobAdd.company + "_Lebenslauf.pdf";

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(fileName);
      });
    },
  },
  computed: {
    jobApplicationData() {
      return this.$root.config.jobApplicationData;
    },
    currentJobAdd() {
      return this.jobApplicationData.companies[
        this.$root.config.jobApplicationData.current
      ];
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
  },
};
</script>

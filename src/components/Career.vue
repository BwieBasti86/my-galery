<template>
  <v-container>
    <v-row>
      <v-col class="col-md-4">
        <template>
          <career-info-card />

          <skills-card />
        </template>
      </v-col>
      <v-col>
        <v-card class="mx-auto">
          <v-tabs color="light-blue accent-4" left>
            <v-tab>Werdengang</v-tab>
            <v-tab>Begrüßung</v-tab>

            <v-tab-item>
              <time-line style="padding:20px" />
            </v-tab-item>
            <v-tab-item>
              <v-card>
                <v-card-title
                  :class="'text-h5' + ` ${randomColor} ` + 'lighten-2'"
                >
                  <span class="text-no-wrap">Lieber Besucher,&nbsp;</span>
                  liebe Besucherin,
                </v-card-title>

                <v-card-text>
                  Ich freue mich dass du auf meiner Seite vorbei schaust und
                  hoffe du findest alles, was dich interessiert. Ich lade dich
                  herzlich dazu ein auch meine Fotogalerie zu bewundern und
                  hoffe es lohnt sich für dich. Viel Spaß! Und solltest du noch
                  weitere Fragen zu meiner Person, zur Webentwicklung, der
                  Fotografie oder sonstigen Themen haben, so zögere nicht mich
                  zu kontaktieren, ich werde mich so schnell es mir möglich ist
                  bei dir melden und stehe mit Rat und Antwort zur Seite.
                  <br /><br />
                  Beste Grüße
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CareerInfoCard from "../components/CareerInfoCard.vue";
import TimeLine from "../components/TimeLine.vue";
import SkillsCard from "../components/SkillsCard.vue";
export default {
  components: {
    CareerInfoCard,
    SkillsCard,
    TimeLine,
  },
  data: () => ({}),
  computed: {
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

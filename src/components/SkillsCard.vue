<template>
  <v-card :loading="loading" style="margin-top:30px">
    <!-- <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img> -->

    <v-card-title>Skills & Fertigkeiten</v-card-title>

    <template>
      <v-expansion-panels v-model="openPanels" multiple>
        <v-expansion-panel
          v-for="(skillCategory, i) in skillCategorys"
          :key="i"
        >
          <v-expansion-panel-header class="pt-0" :hide-actions="isPdfView">
            <v-card-text class="pl-0">
              {{
                `${skillCategory.name} ${
                  !isPdfView ? `(${skillCategory.subCategorys.length})` : ""
                }`
              }}
            </v-card-text>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row
              v-for="(subCategory, j) in skillCategory.subCategorys"
              :key="j"
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="subCategory.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="20"
              ></v-rating>
              <div class="grey--text ms-4" style="margin-right:30px">
                {{ subCategory.name }}
              </div>
            </v-row></v-expansion-panel-content
          >
        </v-expansion-panel>
      </v-expansion-panels>
    </template>

    <!-- <v-card-title>Tonight's availability</v-card-title> -->

    <!-- <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
    openPanels: [],
  }),
  mounted() {
    if (this.isPdfView) {
      this.openPanels = [
        ...this.skillCategorys.map((category, index) => {
          return index;
        }),
      ];
    }
  },

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
  computed: {
    skillCategorys() {
      return this.$root.config.skillCategorys;
    },
    isPdfView() {
      return [7, 8].includes(this.$route.meta.id);
    },
  },
};
</script>

<template>
  <!-- <v-container> -->
  <v-row>
    <v-col>
      <!----------- Select Start ------------->

      <v-row v-if="!isPdfView" align="center">
        <v-col cols="4">
          <h4 style="color:grey">
            <span class="text-no-wrap">Stationen</span>
            filtern
          </h4>
        </v-col>
        <v-col cols="4">
          <v-icon
            @mouseover="filterDirectionHovered = true"
            @mouseleave="filterDirectionHovered = false"
            @click="filterDownwards = !filterDownwards"
            style="float:right"
            >{{ filterDirectionVisualizer }}</v-icon
          >
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="selectedCategory"
            :items="mappedTypeLabels"
            :hint="`${selectedCategory.info}`"
            item-text="label"
            item-value="value"
            label="Select"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </v-col>
      </v-row>

      <!----------- Select End --------------->
      <v-row>
        <v-col>
          <template
            v-if="!separatedTimeLineMode"
            style="position:absolute;overflow-y: scroll"
          >
            <v-timeline class="pt-0 d-flex flex-column mb-6" :dense="true">
              <v-timeline-item
                v-for="item in filteredItems"
                :key="item.id"
                :color="getColorStyle(item.type)"
                small
                style="min-width:240px"
              >
                <template v-slot:opposite>
                  <span
                    :class="
                      `headline font-weight-bold ${getColorStyle(
                        item.type
                      )}--text`
                    "
                    v-text="item.dates.from"
                  ></span>
                </template>
                <v-card
                  :width="!isPdfView ? '420' : null"
                  style="cursor:pointer"
                  @click="selected = item"
                  class="blue-grey lighten-5"
                >
                  <v-card-title
                    :class="`${getColorStyle(item.type)} lighten-2 pa-2`"
                  >
                    <v-icon dark :size="isMobile ? '15' : '25'" class="mr-4">
                      {{ item.type | iconFormatter }}
                    </v-icon>
                    <h2
                      v-if="isMobile"
                      style="font-size:12px !important"
                      class="white--text font-weight-light"
                    >
                      ({{ item.dates.from }})&nbsp;
                    </h2>
                    <h5
                      v-if="isMobile"
                      style="font-size:12px !important"
                      class="white--text font-weight-light"
                    >
                      {{
                        `${item.title} ${
                          isPdfView
                            ? `(${item.dates.from} bis ${item.dates.to})`
                            : ""
                        }`
                      }}
                    </h5>
                    <h5 v-else class="text-7 white--text font-weight-light">
                      {{
                        `${item.title} ${
                          isPdfView
                            ? `(${item.dates.from} bis ${item.dates.to})`
                            : ""
                        }`
                      }}
                    </h5>
                  </v-card-title>
                  <v-container>
                    <v-row>
                      <v-col
                        :class="isPdfView ? 'pa-0' : null"
                        cols="12"
                        md="10"
                        style="font-size:small"
                      >
                        <v-list-item>
                          <v-list-item-content color="lightgrey">
                            <v-list-item-title class="text-h8">
                              {{ item.institution }}
                            </v-list-item-title>

                            <v-list-item-subtitle>
                              {{ item.city }}, {{ item.country }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions v-if="!isPdfView">
                    <v-spacer></v-spacer>

                    <v-btn icon @click="show(item.id, !item.show)">
                      <v-icon>{{
                        item.show ? "mdi-chevron-up" : "mdi-chevron-down"
                      }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-expand-transition v-if="!isPdfView">
                    <div v-show="item.show">
                      <v-divider></v-divider>

                      <v-card-text>
                        <v-row>
                          <v-col cols="20" md="14" style="font-size:small">
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title class="text-h9">
                                  {{ item.title }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  {{ item.dates.from }} bis
                                  {{ item.dates.to }}
                                </v-list-item-subtitle>
                                <v-spacer></v-spacer>
                                <v-textarea
                                  row-height="12"
                                  solo
                                  name="info"
                                  label=""
                                  :value="item.info"
                                  disabled
                                  auto-grow
                                  no-resize
                                  flat
                                ></v-textarea>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </template>
          <template v-else style="position:absolute;overflow-y: scroll">
            <v-timeline
              v-for="(itemByCategory, index) in separatedTimeLineItems"
              :key="index"
              class="pt-0 d-flex flex-column mb-6"
              :dense="true"
            >
              <v-card-title class="pl-15 ml-10" style="display:block;">{{
                mappedTypeLabels.find(
                  (typeLabel) => typeLabel.value === categories[index]
                ).info
              }}</v-card-title>
              <v-timeline-item
                v-for="item in itemByCategory"
                :key="item.id"
                :color="getColorStyle(item.type)"
                small
                style="min-width:240px"
              >
                <template v-slot:opposite>
                  <span
                    :class="
                      `headline font-weight-bold ${getColorStyle(
                        item.type
                      )}--text`
                    "
                    v-text="item.dates.from"
                  ></span>
                </template>
                <v-card
                  flat
                  :width="!isPdfView ? '420' : null"
                  style="cursor:pointer"
                  @click="selected = item"
                  class="blue-grey lighten-5"
                >
                  <v-card-title
                    :class="`${getColorStyle(item.type)} lighten-2 pa-2`"
                  >
                    <v-icon dark :size="isMobile ? '15' : '25'" class="mr-4">
                      {{ item.type | iconFormatter }}
                    </v-icon>
                    <h2
                      v-if="isMobile"
                      style="font-size:12px !important"
                      class="white--text font-weight-light"
                    >
                      ({{ item.dates.from }})&nbsp;
                    </h2>
                    <h5
                      v-if="isMobile"
                      style="font-size:12px !important"
                      class="white--text font-weight-light"
                    >
                      {{
                        `${item.title} ${
                          isPdfView
                            ? `(${item.dates.from} bis ${item.dates.to})`
                            : ""
                        }`
                      }}
                    </h5>
                    <h5 v-else class="text-7 white--text font-weight-light">
                      {{
                        `${item.title} ${
                          isPdfView
                            ? `(${item.dates.from} bis ${item.dates.to})`
                            : ""
                        }`
                      }}
                    </h5>
                  </v-card-title>
                  <v-container>
                    <v-row>
                      <v-col
                        :class="isPdfView ? 'pa-0' : null"
                        cols="12"
                        md="10"
                        style="font-size:small"
                      >
                        <v-list-item>
                          <v-list-item-content color="lightgrey">
                            <v-list-item-title class="text-h8">
                              {{ item.institution }}
                            </v-list-item-title>

                            <v-list-item-subtitle>
                              {{ item.city }}, {{ item.country }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions v-if="!isPdfView">
                    <v-spacer></v-spacer>

                    <v-btn icon @click="show(item.id, !item.show)">
                      <v-icon>{{
                        item.show ? "mdi-chevron-up" : "mdi-chevron-down"
                      }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-expand-transition v-if="!isPdfView">
                    <div v-show="item.show">
                      <v-divider></v-divider>

                      <v-card-text>
                        <v-row>
                          <v-col cols="20" md="14" style="font-size:small">
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title class="text-h9">
                                  {{ item.title }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  {{ item.dates.from }} bis
                                  {{ item.dates.to }}
                                </v-list-item-subtitle>
                                <v-spacer></v-spacer>
                                <v-textarea
                                  row-height="12"
                                  solo
                                  name="info"
                                  label=""
                                  :value="item.info"
                                  disabled
                                  auto-grow
                                  no-resize
                                  flat
                                ></v-textarea>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </template>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>
<script>
export default {
  data: () => ({
    selectedCategory: {
      value: "all",
      label: "Alle",
      info: "Alle Karriereschritte",
    },
    selected: null,
    items: [],
    filterDirectionHovered: false,
    filterDownwards: true,
    separated: true,
  }),
  mounted() {
    this.items = this.careerStepItems.map((item) => {
      let show = {
        show: false,
      };
      return Object.assign(show, item);
    });
    console.log(this.items);
    this.items.reverse();
    this.selected = this.items[0];
    console.log(this.selectedCategory);
    console.log(this.mappedTypeLabels);
  },
  methods: {
    show(id, val) {
      this.items.forEach((item) => {
        if (item.id === id) {
          item.show = val;
        } else {
          item.show = false;
        }
      });
    },
    sortedCareerSteps() {
      return this.careerStepItems.sort((a, b) => {
        a.dates.from - b.dates.from;
      });
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getColorStyle(val) {
      let colorMapping = {
        school: "purple",
        work: "green",
        experience: "orange",
      };
      return colorMapping[val];
    },
    selectLabelSubInfo(val) {
      let labelMapping = {
        all: "Alle Karriereschritte",
        school: "Schule, Studium, Lernaufenthalte",
        work: "Erfahrungen im Arbeitsleben",
        experience: "Sonstige Erfahrungen",
      };

      return labelMapping[val];
    },
    selectLabelFormatter(val) {
      let labelMapping = {
        all: "Alle",
        school: "Schule",
        work: "Arbeit",
        experience: "Erfahrungen",
      };

      return labelMapping[val];
    },
  },
  computed: {
    categories() {
      return Array.from(
        new Set(
          this.items.map((item) => {
            return item.type;
          })
        )
      );
    },
    separatedTimeLineItems() {
      return this.categories.map((category) => {
        return this.filteredItems.filter((item) => item.type === category);
      });
    },
    separatedTimeLineMode() {
      return this.isPdfView && this.separated;
    },
    filterDirectionVisualizer() {
      return this.filterDirectionHovered
        ? this.filterDownwards
          ? "mdi-arrow-down-thick"
          : "mdi-arrow-up-thick"
        : this.filterDownwards
        ? "mdi-arrow-down-thin"
        : "mdi-arrow-up-thin";
    },
    isMobile() {
      return this.$root.isMobile;
    },
    activeItems(){
      return this.items.filter(item => !item.disabled)
    },
    filteredItems() {
      let items =
        this.selectedCategory.value === "all"
          ? [...this.activeItems]
          : this.activeItems.filter(
              (item) => item.type === this.selectedCategory.value
            );
      return this.filterDownwards ? items : items.reverse();
    },

    careerStepItems() {
      return this.$root.config.careerSteps;
    },
    mappedTypeLabels() {
      return Object.values(
        this.typeLabels.map((item) => {
          let selectObj = {
            value: item,
            info: this.selectLabelSubInfo(item),
          };
          console.log(selectObj);
          return Object.assign(selectObj, {
            label: this.selectLabelFormatter(item),
          });
        })
      );
    },
    typeLabels() {
      let values = Object.values(
        this.careerStepItems.map((item) => {
          return item.type;
        })
      );
      let set = new Set(["all", ...values]);
      return Array.from(set);
    },
    color() {
      return this.$root.config.colors[
        this.getRandomInt(this.$root.config.colors.length)
      ];
    },
    isPdfView() {
      return [7, 8].includes(this.$route.meta.id);
    },
  },
  filters: {
    iconFormatter(val) {
      let iconMapping = {
        school: "mdi-school",
        work: "mdi-briefcase",
        experience: "mdi-toolbox",
      };

      return iconMapping[val];
    },
    titleFormatter(val) {
      return val.length > 9 ? val.substring(0, 10) + ".." : val;
    },
  },
};
</script>
<style></style>

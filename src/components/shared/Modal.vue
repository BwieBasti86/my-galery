<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="text-capitalize text-h5">
          {{ data.title }}
        </v-card-title>
        <v-card-text>{{ data.textContent }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('close-dialog')">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-dialog
      v-if="mode === 'image'"
      v-model="dialog"
      persistent
      max-width="auto"
      max-height="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          {{ data.title }}
        </v-card-title>
        <v-img
          :src="data.imagepath"
          :lazy-src="data.imagepath"
          aspect-ratio="1"
          class="grey lighten-2"
        ></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('close-dialog')">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-row>
</template>

<script>
export default {
  name: "Modal",

  components: {},

  props: {
    inputDialog: [Boolean] || false,
    inputData: [Object] || null,
  },
  data() {
    return {
      dialog: this.inputDialog || false,
      data: this.inputData || {},
    };
  },
  mounted() {
    console.log(this.data);
  },
  watch: {
    inputDialog(newVal) {
      this.dialog = newVal;
    },
    inputData(newVal) {
      this.data = newVal;
    },
  },
};
</script>

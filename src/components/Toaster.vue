<template>
    <div>
      <v-snackbar
        id="toast"
        v-for="(option, index) in options"
        :key="option.id"
        :ref="'toast-' + option.id"
        :style="`top: -${index * (toastHeights[option.id] + 10)}px`"
        min-width="98vw"
        min-height="60px"
        v-model="option.active"
        timeout="-1"
        :color="option.color || 'black'"
      >
        <v-row dense align-center>
          <!-- Countdown -->
          <v-col
            v-if="option.timeout"
            cols="1"
            class="pr-2 d-flex align-center justify-center"
            style="max-width: 50px"
          >
            <circular-countdown
              justify-center
              align-stretch
              @on-rerrender-toasterstack="log($event)"
              @option-cleared="onClearOption($event)"
              :milliseconds="option.timeout"
              :id="option.id"
            />
          </v-col>
  
          <!-- Text -->
          <v-col cols="11" class="pl-2">
            <!-- Titel -->
            <div v-if="option.title" class="text-h6 font-weight-bold mb-1">
              {{ option.title }}
            </div>
            <!-- Nachricht -->
            <div class="text-body-2">{{ option.text }}</div>
          </v-col>
        </v-row>
  
        <!-- Aktionen -->
        <template v-slot:action="{ attrs }">
          <v-icon
            v-if="option.callback"
            color="#EEEEEE"
            text
            v-bind="attrs"
            @click="handleCallback(option.callback, index)"
          >
            mdi-check-circle-outline
          </v-icon>
          <v-icon
            v-if="!option.noClose"
            color="#EEEEEE"
            text
            v-bind="attrs"
            @click="() => options.splice(index, 1)"
          >
            mdi-close-circle-outline
          </v-icon>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import CircularCountdown from "./CircularCountdown.vue";
  
  export default {
    components: { CircularCountdown },
    props: {
      toasterOptions: Object,
    },
    data() {
      return {
        test: -150,
        toasterStackPosition: 0,
        nextToastId: 0,
        options: [],
        sizes: { small: 65, large: 95 },
        toastHeights: {},
      };
    },
    watch: {
      toasterOptions: {
        handler(options) {
          this.handleIncomingToast(options);
        },
        deep: true,
      },
      options: {
        handler() {
          this.calculateToastHeights();
        },
        deep: true,
      },
    },
    mounted() {
      this.calculateToastHeights();
    },
    updated() {
      this.calculateToastHeights();
    },
    methods: {
      log(e) {
        console.log(e);
      },
      calculateToastHeights() {
        this.$nextTick(() => {
          this.options.forEach((option) => {
            const toast = this.$refs["toast-" + option.id];
            if (toast && toast[0] && toast[0].$el) {
              this.toastHeights[option.id] = toast[0].$el.childNodes[0].offsetHeight;
            }
          });
        });
      },
      async handleCallback(callback, index) {
        await callback();
        this.options.splice(index, 1);
      },
      handleIncomingToast(toasterOptions) {
        if (toasterOptions) {
          toasterOptions.active = true;
          toasterOptions.id = this.nextToastId;
          this.options.push(toasterOptions);
          this.nextToastId++;
        }
      },
      onClearOption(id) {
        this.options = this.options.filter(option => option.id !== id);
        delete this.toastHeights[id];
      },
    },
    computed: {
      activeToasts() {
        return this.options.filter(option => option.active);
      },
    },
  };
  </script>
  
  <style>
  /* Eigene Styles hier */
  </style>
  
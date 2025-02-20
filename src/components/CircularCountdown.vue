<template>
    <div class="circular-countdown">
      <svg viewBox="0 0 100 100">
        <circle
          class="background"
          cx="50"
          cy="50"
          r="45"
        />
        <circle
          class="progress"
          cx="50"
          cy="50"
          r="45"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="progressOffset"
        />
        <text x="50" y="55" text-anchor="middle" class="countdown-text">
          {{ remainingTime }}
        </text>
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      milliseconds: Number,
      id: Number
    },
    data() {
      return {
        remainingTime: Math.ceil(this.milliseconds / 1000),
        interval: null,
        circumference: 2 * Math.PI * 45
      };
    },
    computed: {
      progressOffset() {
        return this.circumference * (1 - this.remainingTime / (this.milliseconds / 1000));
      }
    },
    mounted() {
      this.startCountdown();
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    methods: {
      startCountdown() {
        this.interval = setInterval(() => {
          if (this.remainingTime > 0) {
            this.remainingTime--;
          } else {
            this.$emit("option-cleared", this.id);
            clearInterval(this.interval);
          }
        }, 1000);
      }
    }
  };
  </script>
  
  <style scoped>
  .circular-countdown {
    width: 50px;
    height: 50px;
  }
  svg {
    transform: rotate(-90deg);
  }
  .background {
    fill: none;
    stroke: #ddd;
    stroke-width: 5;
  }
  .progress {
    fill: none;
    stroke: #4caf50;
    stroke-width: 5;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s linear;
  }
  .countdown-text {
    font-size: 18px;
    font-weight: bold;
    fill: #333;
  }
  </style>

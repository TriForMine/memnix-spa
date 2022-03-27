<template>
  <v-progress-linear
    class="mt-15"
    :value="(progress * 100) / total"
    :buffer-value="(progressBuffer * 100) / total"
    stream
    height="20"
    background-color="red"
    color="green"
    background-opacity="0.5"
  >
    <strong>{{ progress }} / {{total }}</strong>
  </v-progress-linear>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TodayProgressLinear",
  props: {
    progress: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    progressBuffer: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style scoped>

</style>

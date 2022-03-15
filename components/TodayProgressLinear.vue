<template>
  <v-progress-linear
    class="mt-15"
    :value="(progress * 100) / total"
    :buffer-value="(progress_buffer * 100) / total"
    stream
    height="20"
    background-color="red"
    color="green"
    background-opacity="0.5"
  >
    <strong>{{ progress }} / {{total }}</strong>
  </v-progress-linear>
</template>

<script>
export default {
  name: "TodayProgressLinear",
  props: {
    progress: {},
    total: {},
    progress_buffer: {}
  }
}
</script>

<style scoped>

</style>

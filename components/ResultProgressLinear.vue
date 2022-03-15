<template>
  <v-progress-linear
    class="mt-auto"
    :value="dialogValue"
    color="secondary"
    height="5">
  </v-progress-linear>
</template>

<script>
export default {
  name: "ResultProgressLinear",
  props: {
  },
  data() {
    return {
      dialogValue: 0,
      interval: 0
    }
  },

  methods: {
    closeResultDialog() {
      this.$emit('closeResultDialog')
    },

    startDialogInterval(delay) {
      this.dialogValue = 0

      clearInterval(this.interval)
      this.interval = setInterval(()=> {
        this.dialogValue += 1
        if (this.dialogValue > 100) {
          clearInterval(this.interval)
          this.closeResultDialog()
        }
      }, delay)
    },
  },

}
</script>

<style scoped>

</style>

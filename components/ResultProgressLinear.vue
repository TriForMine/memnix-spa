<template>
  <v-progress-linear
    class="mt-auto"
    :value="dialogValue"
    color="secondary"
    height="5">
  </v-progress-linear>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ResultProgressLinear",
  props: {
  },
  data(): {
    dialogValue: number,
    interval?: NodeJS.Timeout
  } {
    return {
      dialogValue: 0,
      interval: undefined
    }
  },

  methods: {
    closeResultDialog() {
      this.$emit('closeResultDialog')
    },

    startDialogInterval(delay: number) {
      this.dialogValue = 0

      if (this.interval)
        clearInterval(this.interval)
      this.interval = setInterval(()=> {
        this.dialogValue += 1
        if (this.dialogValue > 100) {
          if (this.interval)
            clearInterval(this.interval)
          this.closeResultDialog()
        }
      }, delay)
    },
  },

})
</script>

<style scoped>

</style>

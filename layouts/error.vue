<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data(): {
    pageNotFound: string,
    otherError: string
  } {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
  },
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

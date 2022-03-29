<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
    name: "Login",
    computed: {
      theme() {
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      },
    }
  }
)
</script>

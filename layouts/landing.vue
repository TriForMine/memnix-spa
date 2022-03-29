<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        <v-card
          class="flex transparent"
          flat
          tile
        >
          <v-card-text class="">
            <v-btn class="mx-2" small fab href="https://www.instagram.com/memnix.app/">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn class="mx-2" small fab href="https://github.com/memnix/">
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn class="mx-2" small fab href="https://twitter.com/MemnixApp">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn class="mx-2" small fab href="https://www.youtube.com/channel/UCCF8LVU77iNt-4Lq8QTw5wA">
              <v-icon>mdi-youtube</v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="py-2 white--text text-center">
            {{ new Date().getFullYear() }} — <strong>Memnix</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-footer>
  </v-app>
</template>


<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "Landing",
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
  }
}
)
</script>

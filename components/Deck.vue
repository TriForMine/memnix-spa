<template>
  <v-card class="mx-auto" max-width="auto">
    <v-img v-if="deck.deck_banner !== ''" :src="deck.deck_banner" height="450">
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row> </template
    ></v-img>

    <v-card-title> {{ name }}</v-card-title>

    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="openDialog"> Play </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ deck.deck_description }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="unsubToDeck">
            <v-icon>{{ 'mdi-trash-can' }}</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    deck: [],
  },
  data() {
    return {
      show: false,
    }
  },

  computed: {
    name() {
      if (this.deck.deck_status === 3) {
        return this.deck.deck_name + ' · public'
      }
      return this.deck.deck_name
    },
  },

  methods: {
    openDialog() {
      this.$emit('openDialog')
    },

    unsubToDeck() {
      this.$emit('unsubToDeck')
    },
  },
}
</script>
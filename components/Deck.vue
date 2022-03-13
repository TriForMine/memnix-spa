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

    <v-card-title> {{ deck.deck_name }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      {{ deck.deck_description }}
    </v-card-text>
    <v-chip v-if="deck.deck_status === 3"
            class="ma-2"
            color="primary"
            text-color="white"
    >
      <v-icon left>
        mdi-lock-open
      </v-icon>
      Public
    </v-chip>
    <v-chip v-if="deck.ID === 13"
      class="ma-2"
      color="accent"
      text-color="white"
    >
      <v-icon left>
        mdi-star
      </v-icon>
      Sponsored
    </v-chip>
    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="openDialog"> Practice </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="unsubToDeck">
        <v-icon>{{ 'mdi-trash-can' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    deck: {
      type: Object,
      default() {},
    },
  },
  data() {
    return {
      show: false,
    }
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

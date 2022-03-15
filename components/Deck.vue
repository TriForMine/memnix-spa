<template>
  <v-card class="mx-auto" flat max-width="500">
    <v-img :src="deck.deck_banner" height="200px">
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row> </template
    ></v-img>

    <v-card-title class="font-weight-bold d-inline-block text-truncate" style="max-width: 50vw">
      <v-tooltip bottom color="indigo">
        <template #activator="{ on, attrs }">
          <span class="mb-1" v-bind="attrs" v-on="on">
            {{ deck.deck_name }}
          </span>
        </template>
        <span> {{ deck.deck_name }}</span>
      </v-tooltip></v-card-title>
    <v-card-text style="height: 60px; max-width: 400px">
      <v-tooltip bottom color="indigo">
        <template #activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <p v-snip:js="2">{{ deck.deck_description }}</p>
          </span>
        </template>
        <span> {{ deck.deck_description }}</span>
      </v-tooltip>
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
    <v-divider></v-divider>

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

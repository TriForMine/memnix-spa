<template>
  <v-card class="mx-auto" flat max-width="500">
    <v-img :src="deckObject.deck_banner" height="200px">
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title
      class="font-weight-bold d-inline-block text-truncate"
      style="max-width: 50vw"
    >
      <v-tooltip bottom color="indigo">
        <template #activator="{ on, attrs }">
          <span class="mb-1" v-bind="attrs" v-on="on">
            {{ deckObject.deck_name }}
          </span>
        </template>
        <span> {{ deckObject.deck_name }}</span>
      </v-tooltip></v-card-title
    >
    <v-card-text style="height: 60px; max-width: 400px">
      <v-tooltip bottom color="indigo">
        <template #activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <p v-snip:js="2">{{ deckObject.deck_description }}</p>
          </span>
        </template>
        <span> {{ deckObject.deck_description }}</span>
      </v-tooltip>
    </v-card-text>

    <v-chip
      v-if="deckObject.deck_status === 3"
      class="ma-2"
      color="primary"
      text-color="white"
    >
      <v-icon left> mdi-lock-open </v-icon>
      Public
    </v-chip>
    <v-chip
      v-if="deckObject.ID === 13"
      class="ma-2"
      color="accent"
      text-color="white"
    >
      <v-icon left> mdi-star </v-icon>
      Sponsored
    </v-chip>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text color='info' @click="editDeck">
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DeckEditor',
  props: {
    deckObject: {
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

    editDeck() {
      this.$emit('editDeck')
    },
  },
}
</script>

<template>
  <v-card class="mx-auto" flat max-width="500" color="surface">
    <v-img :src="deckObject.deck_banner" lazy-src="moutmout.png" height="200px">
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
      color="outline"
      outlined
      text-color="onbackground"
    >
      <v-icon left> mdi-lock-open </v-icon>
      {{ $t('public') }}
    </v-chip>
    <v-chip
      v-if="deckObject.deck_status === 1"
      class="ma-2"
      color="outline"
      outlined
      text-color="onbackground"
    >
      <v-icon left> mdi-lock </v-icon>
      {{ $t('private') }}
    </v-chip>
    <v-chip
      v-if="deckObject.deck_status === 2"
      class="ma-2"
      color="error"
      outlined
      text-color="onbackground"
    >
      <v-icon left> mdi-clock-alert </v-icon>
      {{ $t('waiting_approval') }}
    </v-chip>
    <v-chip
      v-if="deckObject.ID === 13"
      class="ma-2"
      color="accent"
      outlined
      text-color="onbackground"
    >
      <v-icon left> mdi-star </v-icon>
      {{ $t('sponsored') }}
    </v-chip>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text color="primary" @click="editDeck"> {{ $t('edit') }} </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DeckEditor',
  props: {
    deckObject: {
      type: Object,
      default() {},
    },
  },
  data(): {
    show: boolean
  } {
    return {
      show: false,
    }
  },

  methods: {
    editDeck() {
      this.$emit('editDeck')
    },
  },
})
</script>

<template>
  <v-card class="mx-auto" flat max-width="500" color="surface">
    <v-img :src="deckObject.deck.deck_banner" lazy-src="moutmout.png" height="200px">
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
            {{ deckObject.deck.deck_name }}
          </span>
        </template>
        <span> {{ deckObject.deck.deck_name }}</span>
      </v-tooltip></v-card-title
    >
    <v-card-text style="height: 60px; max-width: 400px">
      <v-tooltip bottom color="indigo">
        <template #activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <p v-snip:js="2">{{ deckObject.deck.deck_description }}</p>
          </span>
        </template>
        <span> {{ deckObject.deck.deck_description }}</span>
      </v-tooltip>
    </v-card-text>

    <v-chip
      v-if="deckObject.deck.deck_status === 3"
      class="ma-2"
      color="outline"
      outlined
      text-color="onbackground"
    >
      <v-icon left> mdi-lock-open </v-icon>
      {{ $t('public') }}
    </v-chip>
    <v-chip
      v-if="deckObject.deck.deck_status === 1"
      class="ma-2"
      color="outline"
      outlined
      text-color="onbackground"
    >
      <v-icon left> mdi-lock </v-icon>
      {{ $t('private') }}
    </v-chip>
    <v-chip
      v-if="deckObject.deck.deck_status === 2"
      class="ma-2"
      color="error"
      outlined
      text-color="onbackground"
    >
      <v-icon left> mdi-clock-alert </v-icon>
      {{ $t('waiting_approval') }}
    </v-chip>
    <v-chip
      v-if="deckObject.deck.ID === 13"
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
      <v-btn color="primary" text @click="openDialog">
        {{ $t('practice') }}
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn v-if="!isOwner" color="onbackground" icon @click="unsubToDeck">
        <v-icon>{{ 'mdi-trash-can' }}</v-icon>
      </v-btn>
      <DeckConfigMenu :today="deckObject.today" @setTodaySettings="setTodaySettings($event)"/>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import {setSettingsAPI} from "~/api/deck.api";

export default Vue.extend({
  name: 'Deck',
  props: {
    deckObject: {
      type: Object,
      default() {},
    },
    isOwner: {
      type: Boolean,
    }
  },
  data(): {
    show: boolean,
    error: string,
    menu: boolean
  } {
    return {
      show: false,
      error: '',
      menu: false
    }
  },

  methods: {
    openDialog() {
      this.$emit('openDialog')
    },

    async setTodaySettings(daily: boolean) {
      const [error] = await setSettingsAPI(this.deckObject?.deck.ID, daily)
      if (error) this.error = error.response.data.message
      else {
        this.menu = false
      }
    },

    unsubToDeck() {
      this.$emit('unsubToDeck')
    },
  },
})
</script>

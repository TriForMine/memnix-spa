<template>
  <v-container>
    <v-row v-if="decks.length !== 0">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <PracticeDialog
          :selected-deck="selectedDeck"
          @closePracticeDialog="closePracticeDialog"
        />
      </v-dialog>
      <v-dialog
        v-model="dialogConfirmation"
        hide-overlay
        max-width="600px"
        transition="dialog-bottom-transition"
      >
        <UnsubDialog
          @unsubToDeck="unsubToDeck"
          @closeDialogConfirmation="closeDialogConfirmation"
        />
      </v-dialog>

      <v-col
        v-for="(n, index) in decks"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        lg="6"
        xl="4"
      >
        <Deck
          :deck-object="n"
          :is-owner="isOwner(n)"
          @openDialog="openDialog(n)"
          @unsubToDeck="unsubToDeckConfirmation(n)"
        />
      </v-col>
    </v-row>
    <v-row v-else-if="loaderOverlay">
      <v-overlay :value="loaderOverlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-row>
    <v-row v-else align="center" justify="center" no-gutters>
      <h1> {{ $t('not_sub') }}</h1>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import {Card, CardResponseValidation, DeckWithOwner} from "~/types/types";
import {getSubAPI, unsubToDeckAPI} from "~/api/deck.api";

export default Vue.extend({
  middleware: 'authentificated',

  data(): {
    decks: DeckWithOwner[],
    dialog: boolean,
    dialogConfirmation: boolean,
    selectedDeck?: DeckWithOwner,
    resDialog: boolean,
    card?: Card,
    cards: {Card: Card, Answers: string}[],
    cardIndex: number,
    items: string,
    res?: CardResponseValidation,
    loaderOverlay: boolean,
    userID: string,
    error: string
  }
  {
    return {
      decks: [],
      dialog: false,
      dialogConfirmation: false,
      selectedDeck: undefined,
      resDialog: false,
      card: undefined,
      cards: [],
      cardIndex: 0,
      items: '',
      res: undefined,
      loaderOverlay: false,
      userID: '',
      error: ''
    }
  },

  beforeMount() {
    this.getSubDeck()
  },

  mounted() {
    if (localStorage.userID) {
      this.userID = localStorage.userID
    }
  },

  methods: {
    isOwner(n: DeckWithOwner) {
      return parseInt(n.owner) === parseInt(this.userID)
    },

    openDialog(value: DeckWithOwner) {
      this.selectedDeck = value
      this.dialog = true
    },

    closeDialogConfirmation() {
      this.dialogConfirmation = false
    },

    unsubToDeckConfirmation(n: DeckWithOwner) {
      this.selectedDeck = n
      this.dialogConfirmation = true
    },

    closePracticeDialog() {
      this.dialog = false;
    },

    async unsubToDeck() {
      const [error] = await unsubToDeckAPI(this.selectedDeck?.deck.ID)
      if (error) this.error = error.response.data.message
      else {
        if (!this.selectedDeck)
          return
        this.decks.splice(this.decks.indexOf(this.selectedDeck), 1)
        this.dialogConfirmation = false
      }
    },

    async getSubDeck() {
      this.loaderOverlay = true
      const [error, data] = await getSubAPI()
      if (error) this.error = error.response.data.message
      else {
          for (let i = 0; i < data.count; i++) {
            this.decks.push({
              deck: data.data[i].Deck,
              owner: data.data[i].owner_id,
              today: data.data[i].settings_today,
            })
          }
      }
      this.loaderOverlay = false

    },
  },
})
</script>

<style>
html {
  overflow: auto !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

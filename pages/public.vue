<!--suppress ALL, HtmlUnknownTag -->
<template>
  <v-row>
    <v-col>
      <v-dialog
        v-model="dialogConfirmation"
        hide-overlay
        max-width="600px"
        transition="dialog-bottom-transition"
      >
        <SubDialog
          @subToDeck="subToDeck"
          @closeDialogConfirmation="closeDialogConfirmation"
        />
      </v-dialog>
      <PublicDeckIterator
        :decks="decks"
        @subToDeckConfirmation="subToDeckConfirmation($event)"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import {Deck} from "~/types/types";
import {getAvailableAPI, subToDeckAPI} from "~/api/deck.api";
export default Vue.extend({
  middleware: 'authentificated',

  data(): {decks: Deck[], dialogConfirmation: boolean, selectedDeck?: Deck, res: Array<Object>, error: ''} {
    return {
      decks: [],
      dialogConfirmation: false,
      selectedDeck: undefined,
      res: [],
      error: ''
    }
  },

  beforeMount() {
    this.getAvailableDeck()
  },

  methods: {
    subToDeckConfirmation(n: Deck) {
      this.selectedDeck = n
      this.dialogConfirmation = true
    },

    closeDialogConfirmation() {
      this.dialogConfirmation = false
    },

    async subToDeck() {
      const [error] = await subToDeckAPI(this.selectedDeck?.ID)
      if (error) this.error = error.response.data.message
      else {
        if(!this.selectedDeck)
          return;
        this.decks.splice(this.decks.indexOf(this.selectedDeck), 1)
        this.dialogConfirmation = false
      }
    },

    async getAvailableDeck() {
      const [error, data] = await getAvailableAPI()
      if (error) this.error = error.response.data.message
      else {
        for (let i = 0; i < data.count; i++) {
          this.decks.push(data.data[i].Deck)
        }
      }
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

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
export default Vue.extend({
  middleware: 'authentificated',

  data(): {decks: any[], dialogConfirmation: boolean, selectedDeck: any, res: any[], error: ''} {
    return {
      decks: [],
      dialogConfirmation: false,
      selectedDeck: [],
      res: [],
      error: ''
    }
  },

  beforeMount() {
    this.getAvailableDeck()
  },

  methods: {
    subToDeckConfirmation(n: []) {
      this.selectedDeck = n
      this.dialogConfirmation = true
    },

    closeDialogConfirmation() {
      this.dialogConfirmation = false
    },

    async subToDeck() {
      try {
        await this.$axios
          .post(
            `https://api.memnix.app/api/v1/decks/` +
              this.selectedDeck.ID +
              `/subscribe`,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          )
          .then(() => {
            this.decks.splice(this.decks.indexOf(this.selectedDeck), 1)
            this.dialogConfirmation = false
          })
      } catch (e: any) {
        this.error = e.response.data.message
      }
    },

    async getAvailableDeck() {
      try {
        await this.$axios
          .get(`https://api.memnix.app/api/v1/decks/available`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then((res) => {
            for (let i = 0; i < res.data.count; i++) {
              this.decks.push(res.data.data[i].Deck)
            }
          })
      } catch (e: any) {
        this.error = e.response.data.message
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

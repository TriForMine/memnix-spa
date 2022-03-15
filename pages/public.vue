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

<script>
export default {
  data() {
    return {
      decks: [],
      dialogConfirmation: false,
      selectedDeck: [],
      res: [],
    }
  },

  beforeMount() {
    this.getAvailableDeck()
  },

  methods: {
    subToDeckConfirmation(n) {
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
            `https://api-memnix.yumenetwork.net/api/v1/decks/` +
              this.selectedDeck.ID +
              `/subscribe`,
            {},
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => {
            this.decks.splice(this.decks.indexOf(this.selectedDeck), 1)
            this.dialogConfirmation = false
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },

    async getAvailableDeck() {
      try {
        await this.$axios
          .get(`https://api-memnix.yumenetwork.net/api/v1/decks/available`, {
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
          })
          .then((res) => {
            for (let i = 0; i < res.data.count; i++) {
              this.decks.push(res.data.data[i].Deck)
            }
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
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

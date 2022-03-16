<template>
  <v-container>
    <v-row v-if="decks.length !== 0">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <PracticeDialog ref="practiceDialog" :selected-deck="selectedDeck" @closePracticeDialog="closePracticeDialog"/>
      </v-dialog>
      <v-dialog
        v-model="dialogConfirmation"
        hide-overlay
        max-width="600px"
        transition="dialog-bottom-transition">
        <UnsubDialog @unsubToDeck="unsubToDeck" @closeDialogConfirmation="closeDialogConfirmation"/>
      </v-dialog>

      <v-col v-for="(n, index) in decks" :key="index"   cols="12"
             sm="12"
             md="6"
             lg="6"
             xl="4">
        <Deck
          :deck="n"
          @openDialog="openDialog(n)"
          @unsubToDeck="unsubToDeckConfirmation(n)"
        />
      </v-col>
    </v-row>
    <v-row v-else align="center" justify="center" no-gutters>
      <h1>You are not sub to any deck yet!</h1>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      decks: [],
      dialog: false,
      dialogConfirmation: false,
      selectedDeck: [],
      resDialog: false,
      card: {},
      cards: [{
        "Card": {},
        "Answers": []
      }],
      cardIndex: 0,
      items: {},
      res: [],
    }
  },
  beforeMount() {
    this.getSubDeck()
  },

  methods: {
    async openDialog(value) {
      this.selectedDeck = value
      this.dialog = true
      while (!this.$refs.practiceDialog) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      await this.$refs.practiceDialog.getCards(value.ID)
    },

    closeDialogConfirmation() {
      this.dialogConfirmation = false
    },

    unsubToDeckConfirmation(n) {
      this.selectedDeck = n
      this.dialogConfirmation = true
    },


    closePracticeDialog() {
      this.dialog = false
    },

    async unsubToDeck() {
      try {
        await this.$axios
          .post(
            `https://api-memnix.yumenetwork.net/api/v1/decks/` +
            this.selectedDeck.ID +
            `/unsubscribe`,
            {},
            {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true,
            }
          )
          .then((_) => {
            this.decks.splice(this.decks.indexOf(this.selectedDeck), 1)
            this.dialogConfirmation = false
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },

    async getSubDeck() {
      try {
        await this.$axios
          .get(`https://api-memnix.yumenetwork.net/api/v1/decks/sub`, {
            headers: {
              'Content-Type': 'application/json'
            },
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

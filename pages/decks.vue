<template>
  <v-container>
    <v-row v-if="decks.length !== 0">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>{{ selectedDeck.deck_name }}</v-toolbar-title>
            </v-toolbar>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-dialog
                v-model="resDialog"
                max-width="600px"
                @keydown.enter="closeResultDialog"
              >
                <ResultDialog
                  :res="res"
                  @closeResultDialog="closeResultDialog"
                />
                <v-progress-linear
                  class="mt-auto"
                  :value="dialogValue"
                  color="secondary"
                  height="5">
                </v-progress-linear>
              </v-dialog>
              <v-container>
                <Card
                  :card="card"
                  :items="items"
                  @postAnswer="postAnswer($event)"
                />
              </v-container>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogConfirmation"
        hide-overlay
        max-width="600px"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title class="text-h5">
            Unsubscribe to this deck ?
          </v-card-title>
          <v-card-text> Your progression won't be deleted.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red darken-1"
              text
              @click="dialogConfirmation = false"
            >
              No
            </v-btn>

            <v-btn color="green darken-1" text @click="unsubToDeck">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog
      >

      <v-col v-for="(n, index) in decks" :key="index" cols="12" sm="4">
        <Deck
          :deck="n"
          @openDialog="openDialog(n)"
          @unsubToDeck="unsubToDeckConfirmation(n)"
        />
      </v-col>
    </v-row>
    <v-row v-else no-gutters align="center" justify="center">
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

      dialogValue: 0,
      dialogInterval: 0
    }
  },
  beforeMount() {
    this.getSubDeck()
  },

  methods: {
    openDialog(value) {
      this.selectedDeck = value
      this.dialog = true
      this.getCards()
    },

    unsubToDeckConfirmation(n) {
      this.selectedDeck = n
      this.dialogConfirmation = true
    },

    closeResultDialog() {
      if (this.resDialog) {
        this.resDialog = false
        this.updateIndex()
        this.getCard()
      }
    },
    startDialogInterval(delay) {
      clearInterval(this.interval)

      this.interval = setInterval(()=> {
        this.dialogValue += 1
        if (this.dialogValue > 100) {
          clearInterval(this.interval)
          this.closeResultDialog()
        }
      }, delay)
    },
    getCard() {
      this.card = this.cards[this.cardIndex].Card
      if (this.card.card_type === 2) {
        this.items = this.cards[this.cardIndex].Answers
      }
    },
    updateIndex() {
      if (this.cardIndex === this.cards.length - 1) {
        this.cardIndex = 0
      } else {
        this.cardIndex += 1
      }
    },

    async getCards() {
      try {
        await this.$axios
          .get(
            `https://api-memnix.yumenetwork.net/api/v1/cards/` +
            this.selectedDeck.ID +
            `/training`,
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => {
            this.cards = res.data.data
            this.getCard()
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },

    async postAnswer(answer) {
      try {
        await this.$axios
          .post(
            `https://api-memnix.yumenetwork.net/api/v1/cards/response`,
            {
              card_id: this.card.ID,
              response: answer,
              training: true
            },
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => {
            let delay = 50

            this.res = res.data.data
            this.resDialog = true
            this.dialogValue = 0
            if (this.res.validate) {
              delay = 30
            }
            this.startDialogInterval(delay)
          })
      } catch (e) {
        this.error = e.response.data.message
      }
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
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
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

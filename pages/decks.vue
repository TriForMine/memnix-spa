<template>
  <v-container>
    <v-row>
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
              <v-dialog v-model="resDialog" persistent max-width="600px">
                <ResultDialog
                  :res="res"
                  @closeResultDialog="closeResultDialog"
                />
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
          <v-card-text> Your progression won't be deleted. </v-card-text>
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
        </v-card></v-dialog
      >
      <v-col v-for="(n, index) in decks" :key="index" cols="12" sm="4">
        <Deck
          :deck="n"
          @openDialog="openDialog(n)"
          @unsubToDeck="unsubToDeckConfirmation(n)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

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

<script>
export default {
  beforeMount() {
    this.getSubDeck()
  },

  data() {
    return {
      decks: [],
      dialog: false,
      dialogConfirmation: false,
      selectedDeck: [],
      resDialog: false,
      card: [],
      items: [],
      res: [],
    }
  },

  methods: {
    openDialog(value) {
      this.selectedDeck = value
      this.dialog = true
      this.getCard()
    },

    unsubToDeckConfirmation(n) {
      this.selectedDeck = n
      this.dialogConfirmation = true
    },

    closeResultDialog() {
      this.resDialog = false
    },
    async getCard() {
      try {
        await this.$axios
          .get(
            `https://api-memnix.yumenetwork.net/api/v1/cards/` +
              this.selectedDeck.ID +
              `/next`,
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => {
            this.card = res.data.data.Card
            if (res.data.data.Card.card_type === 2) {
              this.items = res.data.data.Answers
            }
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
            },
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => {
            this.getCard()
            this.res = res.data.data
            this.resDialog = true
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
          .then((res) => {
            this.decks.splice(this.decks.indexOf(this.selectedDeck))
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
              this.decks.push(res.data.data[i])
            }
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>
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
            <v-toolbar dark color="primary" >
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
      <v-col v-for="(n, index) in decks" :key="index" cols="12" sm="4">
        <Deck :deck="n" @openDialog="openDialog(n)" />
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
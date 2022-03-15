<template>
  <v-card>
    <v-card-title>
      <v-toolbar color="primary" dark>
        <v-btn dark icon @click="closePracticeDialog">
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
          persistent
          @keydown.enter="closeResultDialog"
        >
          <ResultDialog
            :res="res"
            @closeResultDialog="closeResultDialog"
          />
          <ResultProgressLinear ref="resultProgressLinear" @closeResultDialog="closeResultDialog"/>
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
</template>

<script>
export default {
  name: "PracticeDialog",
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    }
  },
  data() {
    return {
      resDialog: false,
      card: {},
      cards: [{
        "Card": {},
        "Answers": []
      }],
      cardIndex: 0,
      items: [],
      res: [],
    }
  },
  methods: {
    closeResultDialog() {
      if (this.resDialog) {
        this.resDialog = false
        this.updateIndex()
        this.getCard()
      }
    },
    closePracticeDialog() {
      this.$emit("closePracticeDialog")
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

    async getCards(ID) {
      try {
        await this.$axios
          .get(
            `https://api-memnix.yumenetwork.net/api/v1/cards/` +
            ID +
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
          .then(async (res) => {
            let delay = 50

            this.res = res.data.data
            this.resDialog = true

            this.dialogValue = 0
            if (this.res.validate) {
              delay = 30
            }

            while (!this.$refs.resultProgressLinear) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            this.$refs.resultProgressLinear.startDialogInterval(delay)
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  }
}
</script>

<style scoped>

</style>

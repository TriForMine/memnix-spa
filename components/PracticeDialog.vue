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
        <v-dialog
          v-model="completeDialog"
          max-width="600px"
          persistent>
          <v-card>
            <v-card-title class="text-h5">
              Practice session is finished !
            </v-card-title>
            <v-card-text> Correct answers : {{progress}} <br> Incorrect answers : {{total-progress}}</v-card-text>
            <v-rating
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half"
              color="yellow darken-3"
              background-color="grey darken-1"
              length="5"
              readonly
              size="32"
              :value="progress * 5 / total"
            ></v-rating>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="red darken-1"
                text
                @click="closePracticeDialog"
              >
                Quit
              </v-btn>

              <v-btn color="green darken-1" text @click="keepPracticing"> Keep practicing</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-container>
          <Card
            :card="card"
            :items="items"
            @postAnswer="postAnswer($event)"
          />
          <TodayProgressLinear
            :progress="progress"
            :progressBuffer="progressBuffer"
            :total="total"
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
      completeDialog: false,
      card: {},
      cards: [{
        "Card": {},
        "Answers": []
      }],
      cardIndex: 0,
      items: [],
      res: [],
      progress: 0,
      total: 0,
      progressBuffer: 0,
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
    keepPracticing() {
      this.progressBuffer = 0
      this.progress = 0
      this.cardIndex = 0
      this.completeDialog = false
    },

    closePracticeDialog() {
      this.total = 0
      this.progressBuffer = 0
      this.progress = 0
      this.completeDialog = false
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
        this.completeDialog = true
      } else {
        this.cardIndex += 1
      }
    },

    async getCards(ID) {
      try {
        await this.$axios
          .get(
            `https://api.memnix.app/api/v1/cards/` +
            ID +
            `/training`,
            {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true,
            }
          )
          .then((res) => {
            this.cards = res.data.data
            this.total = this.cards.length

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
            `https://api.memnix.app/api/v1/cards/response`,
            {
              card_id: this.card.ID,
              response: answer,
              training: true
            },
            {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true,
            }
          )
          .then(async (res) => {
            let delay = 50

            this.res = res.data.data
            this.resDialog = true

            this.dialogValue = 0
            if (this.res.validate) {
              this.progress += 1
              delay = 30
            }
            this.progressBuffer += 1

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

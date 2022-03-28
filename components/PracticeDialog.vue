<template>
  <v-card>
    <v-card-title>
      <v-toolbar color="primary" dark>
        <v-btn dark icon @click="closePracticeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ selectedDeck.deck.deck_name }}</v-toolbar-title>
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
          <ResultDialog :res="res" @closeResultDialog="closeResultDialog" />
          <ResultProgressLinear
            ref="resultProgressLinear"
            @closeResultDialog="closeResultDialog"
          />
        </v-dialog>
        <v-dialog v-model="completeDialog" max-width="600px" persistent>
          <v-card>
            <v-card-title class="text-h5">
              Practice session is finished !
            </v-card-title>
            <v-card-text>
              Correct answers : {{ progress }} <br />
              Incorrect answers : {{ total - progress }}</v-card-text
            >
            <v-rating
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half"
              color="yellow darken-3"
              background-color="grey darken-1"
              length="5"
              readonly
              size="32"
              :value="(progress * 5) / total"
            ></v-rating>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="red darken-1" text @click="closePracticeDialog">
                Quit
              </v-btn>

              <v-btn color="green darken-1" text @click="keepPracticing">
                Keep practicing</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-container>
          <Card v-if="!!card" :card="card" :items="items" @postAnswer="postAnswer($event)" />
          <TodayProgressLinear
            :progress="progress"
            :progress-buffer="progressBuffer"
            :total="total"
          />
        </v-container>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {Card, CardResponseValidation, DeckWithOwner} from "~/types/types";
import {getTrainingAPI, postAnswerAPI} from "~/api/card.api";

export default Vue.extend({
  name: 'PracticeDialog',
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    } as PropOptions<DeckWithOwner>,
  },
  data(): {
    resDialog: boolean,
    completeDialog: boolean,
    card?: Card,
    cards: {Card: Card, Answers: string}[]
    cardIndex : number,
    items?: string,
    res?: CardResponseValidation,
    progress: number,
    total: number,
    progressBuffer: number,
    error: string
  } {
    return {
      resDialog: false,
      completeDialog: false,
      card: undefined,
      cards: [],
      cardIndex: 0,
      items: undefined,
      res: undefined,
      progress: 0,
      total: 0,
      progressBuffer: 0,
      error: ''
    }
  },

  watch: {
    selectedDeck (newValue) {
      this.getCards(newValue.deck.ID)
    }
  },

  beforeMount () {
    this.getCards(this.selectedDeck.deck.ID)
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
      this.$emit('closePracticeDialog')
      this.total = 0
      this.progressBuffer = 0
      this.progress = 0
      this.cardIndex = 0
      this.completeDialog = false
    },
    getCard() {
      this.card = this.cards[this.cardIndex].Card
      if (this.card.card_type === 2) {
        this.items = this.cards[this.cardIndex].Answers
      }
    },
    updateIndex() {
      if (this.cards && this.cardIndex === this.cards.length - 1) {
        this.completeDialog = true
      } else {
        this.cardIndex += 1
      }
    },

    async getCards(ID: number) {
      const [error, data] = await getTrainingAPI(ID)
      if (error) this.error = error.res.data.message
      else {
        this.cards = data.data
        if (!this.cards)
          return;
        this.total = this.cards.length
        this.getCard()
      }

    },
    async postAnswer(answer: string) {
      const [error, data] = await postAnswerAPI(this.card?.ID, answer, true);
      if (error) this.error = error.res.data.message
      else {
        let delay = 50

        this.res = data.data
        this.resDialog = true

        // @ts-ignore
        this.dialogValue = 0
        if (this.res?.validate) {
          this.progress += 1
          delay = 30
        }
        this.progressBuffer += 1

        while (!this.$refs.resultProgressLinear) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
        // @ts-ignore
        this.$refs.resultProgressLinear.startDialogInterval(delay)
      }
    },
  },
})
</script>

<style scoped></style>

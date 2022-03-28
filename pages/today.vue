<template>
  <v-row v-if="total !== 0">
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
    <v-container>
      <Card :card="card" :items="items" @postAnswer="postAnswer($event)" />
      <TodayProgressLinear
        :progress="progress"
        :progress-buffer="progressBuffer"
        :total="total"
      />
    </v-container>
  </v-row>
  <v-row v-else-if="loaderOverlay">
    <v-overlay :value="loaderOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
  <v-row v-else align="center" justify="center" no-gutters>
    <v-container mt-10>
      <h1>{{ $t('no_more_cards') }}</h1>
      <v-container mt-5>
        <v-btn color="info" class="mx-auto" nuxt :to="this.localePath('/public')">
          {{ $t('discover_decks') }}</v-btn
        >
        <v-btn color="primary" nuxt :to="this.localePath('/decks')"> {{ $t('practice') }} </v-btn>
      </v-container>
    </v-container>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card, CardResponseValidation } from '~/types/types'
import { getTodayAPI, postAnswerAPI } from '~/api/card.api'

export default Vue.extend({
  middleware: 'authentificated',
  data(): {
    card?: Card
    cards: { Card: Card; Answers: string }[]
    answer: string
    cardIndex: number

    items?: string
    resDialog: boolean
    res?: CardResponseValidation

    delay: number
    progress: number
    total: number
    progressBuffer: number
    loaderOverlay: boolean
    error: string
  } {
    return {
      card: undefined,
      cards: [],
      answer: '',
      cardIndex: 0,

      items: undefined,
      resDialog: false,
      res: undefined,

      delay: 0,
      progress: 0,
      total: 0,
      progressBuffer: 0,
      loaderOverlay: false,
      error: '',
    }
  },

  beforeMount() {
    this.getToday()
  },

  methods: {
    closeResultDialog() {
      if (this.resDialog) {
        const result = this.updateIndex()
        if (result) {
          this.getCard()
        }
        this.resDialog = false
      }
    },
    clearMessage() {
      this.answer = ''
    },

    async postAnswer(answer: string) {
      const [error, data] = await postAnswerAPI(this.card?.ID, answer, false)
      if (error) this.error = error.res.data.message
      else {
        this.res = data.data
        this.delay = 50
        if (this.res?.validate) {
          this.progress += 1
          this.delay = 30
        }
        this.progressBuffer += 1
        this.resDialog = true

        while (!this.$refs.resultProgressLinear) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
        // @ts-ignore
        this.$refs.resultProgressLinear.startDialogInterval(this.delay)
      }
    },
    getCard() {
      this.card = this.cards[this.cardIndex].Card
      if (this.card.card_type === 2) {
        this.items = this.cards[this.cardIndex].Answers
      }
    },
    updateIndex() {
      if (this.cardIndex >= this.cards.length - 1) {
        this.cardIndex = 0
        this.cards = []
        this.getToday()
        return false
      } else {
        this.cardIndex += 1
        return true
      }
    },

    async getToday() {
      this.loaderOverlay = true
      const [error, data] = await getTodayAPI()
      if (error) this.error = error.res.data.message
      else {
        this.cards = data.data ?? []
        this.cardIndex = 0
        if (this.total === 0) {
          this.total = this.cards.length
        }
        if (data.data === null) {
          this.total = 0
          this.progress = 0
        } else {
          this.getCard()
        }
        this.loaderOverlay = false
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

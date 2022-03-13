<template>
  <v-row v-if="total !== 0">
    <v-dialog
      v-model="resDialog"
      max-width="600px"
      @keydown.enter="closeResultDialog"
    >
      <ResultDialog :res="res" @closeResultDialog="closeResultDialog" />
      <v-progress-linear
        class="mt-auto"
        :value="dialogValue"
        color="secondary"
        height="5">
      </v-progress-linear>
    </v-dialog>
    <v-container>
      <Card :card="card" :items="items" @postAnswer="postAnswer($event)" />
      <v-progress-linear
        class="mt-15"
        :value="(progress * 100) / total"
        :buffer-value="(progress_buffer * 100) / total"
        stream
        height="20"
        background-color="red"
        color="green"
        background-opacity="0.5"
      >
          <strong>{{ progress }} / {{total }}</strong>
      </v-progress-linear>
    </v-container>
  </v-row>
  <v-row v-else no-gutters align="center" justify="center">
    <h1>You don't have more cards to play today !</h1>
  </v-row>
</template>

<script>
export default {
  middleware: 'authentificated',
  data() {
    return {
      card: {},
      cards: [
        {
          Card: {},
          Answers: [],
        },
      ],
      answer: '',
      cardIndex: 0,

      items: [],
      resDialog: false,
      res: [],

      progress: 0,
      total: 0,
      progress_buffer: 0,
      dialogValue: 0,
      dialogInterval: 0
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

    async postAnswer(answer) {
      try {
        await this.$axios
          .post(
            `https://api-memnix.yumenetwork.net/api/v1/cards/response`,
            {
              card_id: this.card.ID,
              response: answer,
              training: false,
            },
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => {
            this.res = res.data.data
            let delay = 50
            if (this.res.validate) {
              this.progress += 1
              delay = 30
            }
            this.progress_buffer += 1
            this.resDialog = true
            this.dialogValue = 0
            this.startDialogInterval(delay)
          })
      } catch (e) {
        this.error = e.res.data.message
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
      try {
        await this.$axios
          .get(`https://api-memnix.yumenetwork.net/api/v1/cards/today`, {
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
          })
          .then((res) => {
            this.cards = res.data.data
            this.cardIndex = 0
            if (this.total === 0) {
              this.total = this.cards.length
            }
            if (res.data.data === null) {
              this.total = 0
              this.progress = 0
            } else {
              this.getCard()
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

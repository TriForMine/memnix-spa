<template>
  <v-row v-if="card.ID !== 0">
    <v-dialog
      v-model="resDialog"
      max-width="600px"
      @keydown.enter="closeResultDialog"
    >
      <ResultDialog :res="res" @closeResultDialog="closeResultDialog" />
    </v-dialog>
    <v-container>
      <Card :card="card" :items="items" @postAnswer="postAnswer($event)" />
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
      card: [],
      answer: '',
      items: [],
      resDialog: false,
      res: [],
    }
  },

  beforeMount() {
    this.getToday()
  },

  methods: {
    closeResultDialog() {
      this.resDialog = false
    },
    clearMessage() {
      this.answer = ''
    },

    async postAnswer(answer) {
      try {
        await this.$axios
          .post(
            `https://api-memnix.yumenetwork.net/api/v1/cards/response`,
            {
              card_id: this.card.ID,
              response: answer,
              training: false
            },
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => {
            this.getToday()
            this.res = res.data.data
            this.resDialog = true
          })
      } catch (e) {
        this.error = e.response.data.message
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
            this.card = res.data.data.Card
            if (res.data.data.Card.card_type === 2) {
              this.items = res.data.data.Answers
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

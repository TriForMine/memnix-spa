<template>
  <v-container v-if="decks.length > 0">
    <v-row>
      <v-dialog
        v-model="dialogConfirmation"
        hide-overlay
        max-width="600px"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title class="text-h5">
            Subscribe to this deck ?
          </v-card-title>
          <v-card-text> You will be able to play it. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red darken-1"
              text
              @click="dialogConfirmation = false"
            >
              No
            </v-btn>

            <v-btn color="green darken-1" text @click="subToDeck"> Yes </v-btn>
          </v-card-actions>
        </v-card></v-dialog
      >
      <v-col v-for="(n, index) in decks" :key="index" cols="12" sm="4">
        <PublicDeck :deck="n" @subToDeck="subToDeckConfirmation(n)" />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row no-gutters align="center" justify="center">
      <h1>You don't have any deck available for subscription.</h1>
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
    this.getAvailableDeck()
  },

  data() {
    return {
      decks: [],
      dialogConfirmation: false,
      selectedDeck: [],
      resDialog: false,
      card: [],
      items: [],
      res: [],
    }
  },

  methods: {
    subToDeckConfirmation(n) {
      this.selectedDeck = n
      this.dialogConfirmation = true
    },

    async subToDeck() {
      try {
        await this.$axios
          .post(
            `https://api-memnix.yumenetwork.net/api/v1/decks/` +
              this.selectedDeck.ID +
              `/subscribe`,
            {},
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => {
            this.decks.splice(this.decks.indexOf(this.selectedDeck), 1)
            this.dialogConfirmation = false
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },

    async getAvailableDeck() {
      try {
        await this.$axios
          .get(`https://api-memnix.yumenetwork.net/api/v1/decks/available`, {
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
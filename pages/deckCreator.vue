<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(n, index) in decks"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        lg="6"
        xl="4"
      >
        <Deck
          :deck-object="n"
          @openDialog="openDialog(n)"
          @unsubToDeck="unsubToDeckConfirmation(n)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'authentificated',
  data() {
    return {
      decks: [],
    }
  },

  beforeMount() {
    this.getSubDeck()
  },

  methods: {
    async getSubDeck() {
      try {
        await this.$axios
          .get(`https://api.memnix.app/api/v1/decks/sub`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then((res) => {
            for (let i = 0; i < res.data.count; i++) {
              this.decks.push({
                deck: res.data.data[i].Deck,
                today: res.data.data[i].settings_today,
              })
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

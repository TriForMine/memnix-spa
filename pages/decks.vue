<template>
  <v-container>
    <v-row>
      <v-col v-for="(n, index) in decks" :key="index" cols="12" sm="4">
        <Deck :deck="n"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  beforeMount() {
    this.getSubDeck()
  },

  data() {
    return {
      decks: [],
    }
  },

  methods: {

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
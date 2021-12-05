<template>
  <v-row>
    <v-col class="text-center">
      <v-card
        class="overflow-auto mx-auto mt-5 mb-10 rounded-xl"
        dark
        max-width="100%"
        max-height="450"
      >
        <v-img v-bind:src="result.card_image"
          max-height="350"
          class="mb-2"
          dark
        ></v-img>

        <v-card-text class="font-weight-bold text-h4">
          {{result.card_question}}
        </v-card-text>
      </v-card>
      <v-text-field
        class="rounded-lg"
        v-bind:label="result.card_format"
        placeholder="your answer"
        filled
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'authentificated',
  beforeMount() {
    this.getToday()
  },
  data() {
    return {
      result: []
    }
  },
  methods: {
    getImgUrl(result){
      return require(result.card_url)
    },
    async getToday() {
      try {
        await this.$axios.get(
          `https://api-memnix.yumenetwork.net/api/v1/cards/today`,
          {
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
          }
        ).then(res => {
            this.result = res.data.data.Card
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>

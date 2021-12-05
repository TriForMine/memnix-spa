<template>
  <v-row>
    <v-col class="text-center">
      <v-card
        class="overflow-auto mx-auto mt-5 mb-10 rounded-xl"
        dark
        max-width="100%"
        max-height="550"
      >
        <v-img
          v-bind:src="result.card_image"
          max-height="450"
          class="mb-2"
          dark
          contain
        ></v-img>

        <v-card-text class="font-weight-bold text-h4">
          {{ result.card_question }}
        </v-card-text>
      </v-card>
      <v-form @submit.prevent="postAnswer">
        <v-text-field
          class="rounded-lg"
          v-bind:label="result.card_format"
          placeholder="your answer"
          v-model="answer"
          name="answer"
          filled
        ></v-text-field>
      </v-form>
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
      result: [],
      answer: '',
    }
  },
  methods: {
    async postAnswer() {
      try {
        await this.$axios
          .post(
            `https://api-memnix.yumenetwork.net/api/v1/cards/response`,
            {
              card_id: this.result.ID,
              response: this.answer,
            },
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => this.getToday(), (this.answer = ''))

        this.$router.push('/today')
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
            this.result = res.data.data.Card
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>

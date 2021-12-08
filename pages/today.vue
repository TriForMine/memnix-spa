<template>
  <v-row v-if="result.ID !== 0">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card v-if="res.validate">
        <v-card-title class="text-h5 green"> Correct ! </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-spacer></v-spacer>
                <h2>Expected answer: {{ res.correct_answer }}</h2>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Ok</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="text-h5 red"> Incorrect ! </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-spacer></v-spacer>
                <h2>Expected answer: {{ res.correct_answer }}</h2>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

      <v-form v-if="result.card_type < 2" @submit.prevent="validateAnswer">
        <v-col cols="12">
          <v-text-field 
            required
            counter
            maxlength="30"
            @input="$v.answer.$touch()"
            @blur="$v.answer.$touch()"
            class="rounded-lg"
            v-bind:label="result.card_format"
            placeholder="your answer"
            v-model="answer"
            :error-messages="answerErrors"

            :append-outer-icon="answer ? 'mdi-send' : ''"
            clear-icon="mdi-close-circle"
            clearable
            name="answer"
            @click:append-outer="validateAnswer"
            @click:clear="clearMessage"
            filled
          ></v-text-field>
        </v-col>
      </v-form>
      <v-container v-else>
        <v-row>
          <v-col v-for="(n, index) in items" :key="index" cols="12" sm="6">
            <v-btn
              color="primary"
              @click="buttonAnswer(n)"
              x-large
              dark
              block
              >{{ n }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
  <v-row v-else no-gutters align="center" justify="center">
    <h1>You don't have more cards to play today !</h1>
  </v-row>
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
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  middleware: 'authentificated',
  mixins: [validationMixin],

  validations: {
    answer: { required, maxLength: maxLength(30) },
  },

  computed: {
    answerErrors() {
      const errors = []
      if (!this.$v.answer.$dirty) return errors
      !this.$v.answer.maxLength &&
        errors.push('Answer must be at most 30 characters long')
      !this.$v.answer.required && errors.push('Answer is required.')
      return errors
    },
  },

  beforeMount() {
    this.getToday()
  },
  data() {
    return {
      result: [],
      answer: '',
      item: [],
      dialog: false,
      res: [],
    }
  },
  methods: {
    clearMessage() {
      this.answer = ''
    },

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
          .then((res) => {
            this.getToday()
            this.res = res.data.data
            this.dialog = true
            this.answer = ''
          })

        this.$router.push('/today')
      } catch (e) {
        this.error = e.response.data.message
      }
    },
    async buttonAnswer(n) {
      this.answer = n
      await this.postAnswer()
    },

    async validateAnswer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        await this.postAnswer()
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

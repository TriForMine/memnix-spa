<template>
  <v-col class="text-center">
    <v-card
      class="overflow-auto mx-auto mt-5 mb-10 rounded-xl"
      dark
      max-width="100%"
      max-height="550"
    >
      <v-img
        v-bind:src="card.card_image"
        max-height="450"
        class="mb-2"
        dark
        contain
      ></v-img>

      <v-card-text class="font-weight-bold text-h4">
        {{ card.card_question }}
      </v-card-text>
    </v-card>

    <v-form v-if="card.card_type < 2" @submit.prevent="validateAnswer">
      <v-col cols="12">
        <v-text-field
          required
          counter
          maxlength="30"
          @input="$v.answer.$touch()"
          @blur="$v.answer.$touch()"
          class="rounded-lg"
          v-bind:label="card.card_format"
          placeholder="your answer"
          v-model="answer"
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
          <v-btn color="primary" @click="buttonAnswer(n)" x-large dark block>{{
            n
          }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    answer: { required, maxLength: maxLength(30) },
  },

  data() {
    return {
      answer: '',
    }
  },
  props: {
    card: [],
    items: [],
  },

  methods: {
    clearMessage() {
      this.answer = ''
    },

    postAnswer() {
      this.$emit('postAnswer', this.answer)
      this.clearMessage()
    },

    buttonAnswer(n) {
      this.answer = n
      this.postAnswer()
    },

    validateAnswer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.postAnswer()
      }
    },
  },
}
</script>
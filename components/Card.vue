/* eslint-disable vue/require-default-prop */
<template>
  <v-col class="text-center">
    <v-card
      class="overflow-auto mx-auto mt-5 mb-10 rounded-xl"
      dark
      max-width="100%"
      max-height="550"
    >
      <v-img
        v-if="card.card_image !== ''"
        :src="card.card_image"
        max-height="450"
        class="mb-2"
        dark
        contain
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>

      <v-card-text class="font-weight-bold text-h4">
        {{ card.card_question }}
      </v-card-text>
    </v-card>

    <v-form v-if="card.card_type < 2" @submit.prevent="validateAnswer">
      <v-col cols="12">
        <v-text-field
          v-model="answer"
          required
          counter
          maxlength="30"
          class="rounded-lg"
          :label="card.card_format"
          placeholder="your answer"
          :append-outer-icon="answer ? 'mdi-send' : ''"
          clear-icon="mdi-close-circle"
          clearable
          name="answer"
          filled
          @input="$v.answer.$touch()"
          @blur="$v.answer.$touch()"
          @click:append-outer="validateAnswer"
          @click:clear="clearMessage"
        ></v-text-field>
      </v-col>
    </v-form>
    <v-container v-else>
      <v-row>
        <v-col v-for="(n, index) in items" :key="index" cols="12" sm="6">
          <v-btn color="primary" x-large dark block @click="buttonAnswer(n)">{{
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
  props: {
    card: {
      type: Object,
      default() {},
    },
    items: {
      type: Array,
      default() {},
    },
  },

  data() {
    return {
      answer: '',
    }
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

<style>
.v-btn {
  text-transform: none !important;
}
</style>

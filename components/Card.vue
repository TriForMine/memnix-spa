<template>
  <v-col class="text-center">
    <v-card
      class="overflow-auto mx-auto mt-5 mb-10 rounded-xl"
      max-width="100%"
      max-height="550"
      color="surface"
    >
      <v-img
        v-if="card.card_image !== ''"
        :src="card.card_image"
        max-height="450"
        class="mb-2"
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
    <v-container v-if="card.card_type < 2">
      <v-form @submit.prevent="validateAnswer">
        <v-col cols="12">
          <v-text-field
            v-model="answer"
            required
            counter
            shaped
            outlined
            maxlength="100"
            :label="card.card_format"
            color="secondary"
            placeholder="your answer"
            :append-outer-icon="answer ? 'mdi-send' : ''"
            clear-icon="mdi-close-circle"
            clearable
            name="answer"
            @input="$v.answer.$touch()"
            @blur="$v.answer.$touch()"
            @click:append-outer="validateAnswer"
            @click:clear="clearMessage"
          ></v-text-field>
        </v-col>
        <div class="text-center">

          <v-chip
            v-if="card.card_case"
            class="ma-2"
            color="warning"
            text-color="onbackground"
            outlined
          >
            <v-avatar left>
              <v-icon>mdi-alert-circle</v-icon>
            </v-avatar>
            Case sensitive
          </v-chip>
          <v-chip
            v-if="card.card_spaces"
            class="ma-2"
            color="error"
            text-color="onbackground"
            outlined
          >
            <v-avatar left>
              <v-icon>mdi-alert-octagram</v-icon>
            </v-avatar>
            Space sensitive
          </v-chip>
        </div>
      </v-form>
    </v-container>

    <v-container v-else>
      <v-row>
        <v-col v-for="(n, index) in items" :key="index" cols="12" sm="6">
          <v-btn color="secondary" x-large block @click="buttonAnswer(n)">{{
              n
            }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import {validationMixin} from "vuelidate";
import { required, maxLength } from 'vuelidate/lib/validators'

export default Vue.extend({
  mixins: [validationMixin],

  validations: {
      answer: { required, maxLength: maxLength(100) }
  },

  props: {
    card: {
      type: Object,
      default() {},
    },
    items: {
      type: Array,
      default: () => [],
    },
  },

  data(): {
    answer: string,
  } {
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

    buttonAnswer(n: string) {
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
})
</script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>

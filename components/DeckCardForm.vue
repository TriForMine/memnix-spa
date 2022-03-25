<template>
  <v-card flat>
    <v-card-text>
      <v-form @submit.prevent="validateAnswer">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="cardQuestion"
              name="cardQuestion"
              :error-messages="questionErrors"
              label="Question *"
              required
              outlined
              shaped
              counter
              maxlength="200"
              @input="$v.cardQuestion.$touch()"
              @blur="$v.cardQuestion.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-select
              v-model="cardType"
              label="Type"
              outlined
              shaped
              :items="cardTypes"
              item-text="name"
              item-value="value"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-select
              v-model="cardMCQId"
              label="MCQ"
              outlined
              shaped
              :items="mcqs"
              item-text="mcq_name"
              item-value="ID"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="cardAnswer"
              name="cardQuestion"
              :error-messages="answerErrors"
              :type="answerFieldType"
              label="Answer *"
              required
              outlined
              shaped
              counter
              maxlength="200"
              @input="$v.cardAnswer.$touch()"
              @blur="$v.cardAnswer.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-switch
              v-model="cardCase"
              name="cardCase"
              label="Case Sensitive"
            ></v-switch>
          </v-col>
          <v-col cols="6">
            <v-switch
              v-model="cardSpaces"
              name="cardSpaces"
              label="Spaces Sensitive"
            ></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="cardFormat"
              name="cardFormat"
              :error-messages="formatErrors"
              label="Format *"
              required
              outlined
              shaped
              counter
              maxlength="200"
              @input="$v.cardFormat.$touch()"
              @blur="$v.cardFormat.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="cardImage"
              name="cardFormat"
              :error-messages="imageErrors"
              label="Image"
              outlined
              shaped
              maxlength="200"
              @input="$v.cardImage.$touch()"
              @blur="$v.cardImage.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>

      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info" text @click="closeCardDialog"> Close </v-btn>
      <v-btn color="warning" text x-large @click="validateAnswer">
        {{ confirmButtonText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'DeckCardForm',
  mixins: [validationMixin],

  props: {
    card: {
      type: Object,
      default() {}
    },
    deckId: {
      type: Number,
      default: 0
    },
    mcqs: {
      type: Array,
      default: () => []
    }
  },
  validations: {
    cardQuestion: { required, maxLength: maxLength(200), minLength: minLength(5) },
    cardAnswer: { required, maxLength: maxLength(200), minLength: minLength(1) },
    cardImage: { maxLength: maxLength(200), minLength: minLength(1) },
    cardFormat: { required, maxLength: maxLength(50), minLength: minLength(1) },
  },
  data() {
    return {
      cardTypes: [
        {name: 'String', value: 0},
        {name: 'Number', value: 1},
        {name: 'MCQ', value: 2}
      ],

      cardQuestion: this.card?.card_question ?? '',
      cardAnswer: this.card?.card_answer ?? '',
      cardFormat: this.card?.card_format ?? '',
      cardImage: this.card?.card_image ?? '',
      cardType: this.card?.card_type ?? -1,
      cardMCQId: this.card?.mcq_id?.Int32 ?? -1,
      cardCase: this.card?.card_case ?? false,
      cardSpaces: this.card?.card_spaces ?? false,
      error: 'An error occurred !',
    }
  },
  computed: {
    answerFieldType() {
      if (this.cardType === 1)
        return 'number'
      else
        return 'string'
    },
    confirmButtonText() {
      if (this.card) {
        return 'Edit'
      } else {
        return 'Create'
      }
    },
    questionErrors() {
      const errors = []
      if (!this.$v.cardQuestion.$dirty) return errors
      !this.$v.cardQuestion.maxLength &&
      errors.push('Question must be at most 200 characters long')
      !this.$v.cardQuestion.minLength &&
      errors.push('Question must be at least 5 character long')
      !this.$v.cardQuestion.required && errors.push('Question is required.')
      return errors
    },
    answerErrors() {
      const errors = []
      if (!this.$v.cardAnswer.$dirty) return errors
      !this.$v.cardAnswer.maxLength &&
      errors.push('Answer must be at most 200 characters long')
      !this.$v.cardAnswer.minLength &&
      errors.push('Answer must be at least 1 character long')
      !this.$v.cardAnswer.required && errors.push('Answer is required.')
      return errors
    },
    formatErrors() {
      const errors = []
      if (!this.$v.cardFormat.$dirty) return errors
      !this.$v.cardFormat.maxLength &&
      errors.push('Format must be at most 50 characters long')
      !this.$v.cardFormat.minLength &&
      errors.push('Format must be at least 1 character long')
      !this.$v.cardFormat.required && errors.push('Format is required.')
      return errors
    },
    imageErrors() {
      const errors = []
      if (!this.$v.cardImage.$dirty) return errors
      !this.$v.cardImage.maxLength &&
      errors.push('Image must be at most 200 characters long')
      !this.$v.cardImage.minLength &&
      errors.push('Image must be at least 1 character long')
      return errors
    },
  },
  watch: {
    card(newVal) {
      this.cardQuestion = newVal.card_question ?? ''
      this.cardAnswer = newVal.card_answer ?? ''
      this.cardFormat = newVal.card_format ?? ''
      this.cardImage = newVal.card_image ?? ''
      this.cardType = newVal.card_type ?? -1
      this.cardMCQId = newVal.mcq_id?.Int32 ?? -1
      this.cardCase = newVal.card_case ?? false
      this.cardSpaces = newVal.card_spaces ?? false
    }
  },
  methods: {
    async createCard() {
      const data = {
        card_question: this.cardQuestion,
        card_answer: this.cardAnswer,
        card_format: this.cardFormat,
        card_image: this.cardImage,
        card_type: this.cardType,
        deck_id: this.deckId,
        mcq_id: {
          "Int32": this.cardMCQId,
          "Valid": this.cardMCQId !== 0
        },
        card_case: this.cardCase,
        card_spaces: this.cardSpaces
      }

      try {
        if (this.card) {
          await this.$axios
            .put(
              `https://api.memnix.app/api/v1/cards/${this.card.ID}/edit`,
              data,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              }
            )
            .then(() => {
              this.createCardSave()
            })
        } else {
          await this.$axios
            .post(
              `https://api.memnix.app/api/v1/cards/new`,
              data,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              }
            )
            .then(() => {
              this.createCardSave()
            })
        }
      } catch (e) {
        this.error = e.res.data.message
      }
    },

    validateAnswer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.createCard()
      }
    },
    closeCardDialog() {
      this.$emit('closeCardDialog')
    },
    createCardSave() {
      this.$emit('createCardSave')
    }
  },
}
</script>

<style scoped></style>

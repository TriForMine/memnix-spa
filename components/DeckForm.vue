<template>
  <v-card flat>
    <v-card-text>
      <v-form @submit.prevent="validateAnswer">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="deckName"
              name="deckName"
              :error-messages="nameErrors"
              @input="$v.deckName.$touch()"
              @blur="$v.deckName.$touch()"
              label="Name *"
              required
              outlined
              shaped
              counter
              maxlength="42"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="deckDescription"
              @input="$v.deckDescription.$touch()"
              @blur="$v.deckDescription.$touch()"
              :error-messages="descriptionErrors"
              label="Description *"
              no-resize
              outlined
              rows="3"
              row-height="25"
              counter
              maxlength="120"
              shaped
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="deckImageUrl"
              @input="$v.deckImageUrl.$touch()"
              @blur="$v.deckImageUrl.$touch()"
              label="Image url"
              outlined
              shaped
              maxlength="120"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>

      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info" text @click="closeEditDeck"> Close </v-btn>
      <v-btn color="warning" text x-large @click="validateAnswer">
        Create
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    deckName: { required, maxLength: maxLength(42), minLength: minLength(5) },
    deckDescription: {
      required,
      maxLength: maxLength(120),
      minLength: minLength(5),
    },
    deckImageUrl: { maxLength: maxLength(120) },
  },
  name: 'DeckForm',
  data() {
    return {
      deckName: '',
      deckDescription: '',
      deckImageUrl: '',
      error: 'An error occurred !',
    }
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.deckName.$dirty) return errors
      !this.$v.deckName.maxLength &&
        errors.push('Deck name must be at most 42 characters long')
      !this.$v.deckName.minLength &&
        errors.push('Deck name must be at least 5 characters long')
      !this.$v.deckName.required && errors.push('Deck name is required.')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.deckDescription.$dirty) return errors
      !this.$v.deckName.maxLength &&
        errors.push('Deck description must be at most 120 characters long')
      !this.$v.deckName.minLength &&
        errors.push('Deck description must be at least 5 characters long')
      !this.$v.deckName.required && errors.push('Deck name is required.')
      return errors
    },
  },
  methods: {
    async createDeck() {
      try {
        await this.$axios
          .post(
            `https://api.memnix.app/api/v1/decks/new`,
            {
              "deck_name": this.deckName,
              "deck_description": this.deckDescription,
              "deck_banner": this.deckImageUrl
            },
            {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true,
            }
          )
          .then(() => {
            this.createDeckSave()
          })
      } catch (e) {
        this.error = e.res.data.message
      }
    },
    validateAnswer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.createDeck()
      }
    },
    closeEditDeck() {
      this.$emit('closeEditDeck')
    },

    createDeckSave() {
      this.$emit("createDeckSave")
    }
  },
}
</script>

<style scoped></style>

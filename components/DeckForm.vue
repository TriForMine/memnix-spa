<template>
  <v-card flat>
    <v-dialog
      v-model="errorDialog"
    >
      <v-card>
        <v-card-title class="text-h5 error lighten-2">
          {{error}}
        </v-card-title>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="errorDialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>


    </v-dialog>
    <v-card-text>
      <v-form @submit.prevent="validateAnswer">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="deckName"
              name="deckName"
              :error-messages="nameErrors"
              label="Name *"
              required
              outlined
              shaped
              counter
              maxlength="42"
              @input="$v.deckName.$touch()"
              @blur="$v.deckName.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="deckDescription"
              :error-messages="descriptionErrors"
              label="Description *"
              no-resize
              outlined
              rows="3"
              row-height="25"
              counter
              maxlength="120"
              shaped
              @input="$v.deckDescription.$touch()"
              @blur="$v.deckDescription.$touch()"
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="deckImageUrl"
              label="Image url"
              outlined
              shaped
              maxlength="120"
              @input="$v.deckImageUrl.$touch()"
              @blur="$v.deckImageUrl.$touch()"
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
        {{ confirmButtonText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { validationMixin } from 'vuelidate'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import {Deck} from "~/types/types";
import {createDeckAPI, editDeckAPI} from "~/api/deck.api";

export default Vue.extend({
  name: 'DeckForm',

  mixins: [validationMixin],

  props: {
    selectedDeck: {
      type: Object,
      default(){},
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  validations: {
    deckName: { required, maxLength: maxLength(42), minLength: minLength(5) },
    deckDescription: {
      required,
      maxLength: maxLength(200),
      minLength: minLength(5),
    },
    deckImageUrl: { maxLength: maxLength(200) },
  },
  data(): {
    deckName: Deck['deck_name'],
    deckDescription: Deck['deck_description'],
    deckImageUrl: Deck['deck_banner'],
    error: string,
    errorDialog: boolean
  } {
    return {
      deckName: this.selectedDeck?.deck_name ?? '',
      deckDescription: this.selectedDeck?.deck_description ?? '',
      deckImageUrl: this.selectedDeck?.deck_banner ?? '',
      error: 'An error occurred !',
      errorDialog: false,
    }
  },
  computed: {
    nameErrors() {
      const errors: string[] = []
      if (!this.$v.deckName.$dirty) return errors
      !this.$v.deckName.maxLength &&
        errors.push('Deck name must be at most 42 characters long')
      !this.$v.deckName.minLength &&
        errors.push('Deck name must be at least 5 characters long')
      !this.$v.deckName.required && errors.push('Deck name is required.')
      return errors
    },
    descriptionErrors() {
      const errors: string[] = []
      if (!this.$v.deckDescription.$dirty) return errors
      !this.$v.deckName.maxLength &&
        errors.push('Deck description must be at most 120 characters long')
      !this.$v.deckName.minLength &&
        errors.push('Deck description must be at least 5 characters long')
      !this.$v.deckName.required && errors.push('Deck name is required.')
      return errors
    },
    confirmButtonText() {
      if (this.isEdit) {
        return 'Edit'
      } else {
        return 'Create'
      }
    },
  },
  watch: {
    selectedDeck(newVal) {
      this.deckName = newVal.deck_name ?? ''
      this.deckDescription = newVal.deck_description ?? ''
      this.deckImageUrl = newVal.deck_banner ?? ''
    }
  },
  methods: {
    async createDeck() {
      const data = {
        deck_name: this.deckName,
        deck_description: this.deckDescription,
        deck_banner: this.deckImageUrl
      }

      if (this.isEdit) {
          const [error] = await editDeckAPI(data, this.selectedDeck?.ID)
          if (error) {
            this.error = error.response.data.message
            this.errorDialog = true
          }
          else  this.createDeckSave()
      } else {
        const [error] = await createDeckAPI(data)
        if (error) {
          this.error = error.response.data.message
          this.errorDialog = true
        } else this.createDeckSave()
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
})
</script>

<style scoped></style>

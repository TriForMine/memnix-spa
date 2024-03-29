<template>
  <v-card color="background">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      shaped
      elevation="24"
      outlined
      color="warning"
    >
      {{ snackbarText }}

      <template #action="{ attrs }">
        <v-btn color="warning" icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="errorDialog">
      <v-card>
        <v-card-title class="text-h5 error">
          {{ error }}
        </v-card-title>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="errorDialog = false">
            {{ $t('ok') }}
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
              :label="$t('name') + '*'"
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
              :label="$t('description') + '*'"
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
              :label="$t('image_url')"
              outlined
              shaped
              maxlength="120"
              @input="$v.deckImageUrl.$touch()"
              @blur="$v.deckImageUrl.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-switch
              v-model="deckShare"
              class="ml-3"
              :label="$t('allow_sharing_deck')"
            ></v-switch>
          </v-col>
          <v-col v-if="deckShare" cols="12">
            <v-text-field
              v-model="deckKey"
              :error-messages="keyErrors"
              :label="$t('private_key')"
              class="ml-3"
              :suffix="deckCode ? '#' + deckCode : ''"
              outlined
              counter
              shaped
              maxlength="4"
              :append-outer-icon="deckCode ? 'mdi-content-copy' : ''"
              @click:append-outer="copyKey"
              @keyup="uppercase"
              @input="$v.deckImageUrl.$touch()"
              @blur="$v.deckImageUrl.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>

      <small>{{ $t('required_field') }}</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="onbackground" text @click="closeEditDeck">
        {{ $t('close') }}
      </v-btn>
      <v-btn color="primary" text x-large @click="validateAnswer">
        {{ confirmButtonText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import { Deck } from '~/types/types'
import { createDeckAPI, editDeckAPI } from '~/api/deck.api'

export default Vue.extend({
  name: 'DeckForm',

  mixins: [validationMixin],

  props: {
    selectedDeck: {
      type: Object,
      default() {},
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  validations: {
    deckName: { required, maxLength: maxLength(42), minLength: minLength(5) },
    deckDescription: {
      required,
      maxLength: maxLength(200),
      minLength: minLength(5),
    },
    deckImageUrl: { maxLength: maxLength(200) },
    deckKey: { required, minLength: minLength(4), maxLength: maxLength(4) },
  },
  data(): {
    deckName: Deck['deck_name']
    deckDescription: Deck['deck_description']
    deckImageUrl: Deck['deck_banner']
    deckCode: Deck['deck_code']
    deckKey: Deck['deck_key']
    deckShare: Deck['deck_share']
    error: string
    errorDialog: boolean
    snackbar: boolean
    snackbarText: string
    timeout: number
  } {
    return {
      deckName: this.selectedDeck?.deck_name ?? '',
      deckDescription: this.selectedDeck?.deck_description ?? '',
      deckImageUrl: this.selectedDeck?.deck_banner ?? '',
      deckCode: this.selectedDeck?.deck_code ?? '',
      deckKey: this.selectedDeck?.deck_key ?? '',
      deckShare: this.selectedDeck?.deck_share ?? false,
      error: 'An error occurred !',
      errorDialog: false,
      snackbar: false,
      snackbarText: '',
      timeout: 2000,
    }
  },
  computed: {
    nameErrors() {
      const errors: string[] = []
      if (!this.$v.deckName.$dirty) return errors
      !this.$v.deckName.maxLength &&
        errors.push(this.$i18n.t('deck_name_max_len'))
      !this.$v.deckName.minLength &&
        errors.push(this.$i18n.t('deck_name_min_len'))
      !this.$v.deckName.required &&
        errors.push(this.$i18n.t('deck_name_required'))
      return errors
    },
    descriptionErrors() {
      const errors: string[] = []
      if (!this.$v.deckDescription.$dirty) return errors
      !this.$v.deckName.maxLength &&
        errors.push(this.$i18n.t('deck_description_max_len'))
      !this.$v.deckName.minLength &&
        errors.push(this.$i18n.t('deck_description_min_len'))
      !this.$v.deckName.required &&
        errors.push(this.$i18n.t('deck_description_required'))
      return errors
    },
    keyErrors() {
      const errors: string[] = []
      if (!this.$v.deckKey.$dirty) return errors
      !this.$v.deckKey.maxLength &&
        errors.push(this.$i18n.t('deck_key_min_len'))
      !this.$v.deckKey.minLength &&
        errors.push(this.$i18n.t('deck_key_min_len'))
      !this.$v.deckKey.required &&
        errors.push(this.$i18n.t('deck_key_required'))
      return errors
    },

    confirmButtonText() {
      return this.isEdit ? this.$i18n.t('edit') : this.$i18n.t('create');
    },
  },
  watch: {
    selectedDeck(newVal) {
      this.deckName = newVal?.deck_name ?? ''
      this.deckDescription = newVal?.deck_description ?? ''
      this.deckImageUrl = newVal?.deck_banner ?? ''
      this.deckCode = newVal?.deck_code ?? ''
      this.deckKey = newVal?.deck_key ?? ''
      this.deckShare = newVal?.deck_share ?? false
    },
  },
  methods: {
    uppercase() {
      this.deckKey = this.deckKey.toUpperCase()
    },
    copyKey() {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(this.deckKey + '#' + this.deckCode)
      } else {
        const el = document.createElement('textArea') as HTMLInputElement
        el.value = this.deckKey + '#' + this.deckCode
        // make the textarea out of viewport
        el.style.position = 'fixed'
        el.style.left = '-999999px'
        el.style.top = '-999999px'
        document.body.appendChild(el)
        el.focus()
        el.select()
        document.execCommand('copy')
        el.remove()
      }
      this.snackbarText = this.$i18n.t('copied_content_to_clipboard')
      this.snackbar = true
    },
    async createDeck() {
      const data = {
        deck_name: this.deckName,
        deck_description: this.deckDescription,
        deck_banner: this.deckImageUrl,
        deck_key: this.deckKey,
        deck_share: this.deckShare,
      }

      if (this.isEdit) {
        const [error] = await editDeckAPI(data, this.selectedDeck?.ID)
        if (error) {
          this.error = error.response.data.message
          this.errorDialog = true
        } else this.createDeckSave()
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
      this.$emit('createDeckSave')
    },
  },
})
</script>

<style scoped></style>

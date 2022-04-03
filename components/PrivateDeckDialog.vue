<template>
  <v-card color="surface">
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
    <v-toolbar color="primary-container">
      <v-btn icon @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t("subscribe_now") }} !</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="mt-5">
      <v-form @submit.prevent="validateAnswer">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="deckSecret"
              maxlength="11"
              color="primary"
              outlined
              shaped
              counter
              :label="$t('secret_code')"
              background-color="surface"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="onbackground" text @click="closeDialog">
        {{ $t('close') }}
      </v-btn>
      <v-btn color="primary" text x-large @click="validateAnswer">
        {{ $t('ok') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { subscribePrivateDeckAPI } from '~/api/deck.api'

export default {
  name: 'PrivateDeckDialog',

  props: {},
  data(): {
    deckSecret: string
    snackbar: boolean
    snackbarText: string
    timeout: number
  } {
    return {
      deckSecret: '',
      snackbar: false,
      snackbarText: '',
      timeout: 2000,
    }
  },
  methods: {
    validateAnswer() {
      if (this.deckSecret.includes('#')) {
        this.subscribeToPrivateDeck(this.deckSecret.replace('#', '/'))
      } else {
        this.snackbarText = this.$i18n.t('not_valid_code')
        this.snackbar = true
      }
    },
    async subscribeToPrivateDeck(secret: string) {
      const [error] = await subscribePrivateDeckAPI(secret)
      if (error) {
        this.error = error.response.data.message
        this.snackbarText = this.$i18n.t('not_valid_code')
        this.snackbar = true
      } else {
        this.subscribeDeckOk()
      }
    },
    subscribeDeckOk() {
      this.$emit('subscribeDeckOk')
    },

    closeDialog() {
      this.$emit('closePrivateSubscribe')
    },
  },
}
</script>

<style scoped></style>

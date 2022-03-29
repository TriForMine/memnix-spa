<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ $t('subscribe_deck_question') }}
    </v-card-title>
    <v-card-text> {{ $t('able_to_play') }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="error" text @click="closeDialogConfirmation">
        {{ $t('no') }}
      </v-btn>

      <v-btn color="success" text @click="subToDeck">
        {{ $t('yes') }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SubDialog',
  methods: {
    closeDialogConfirmation() {
      this.$emit('closeDialogConfirmation')
    },
    subToDeck() {
      this.$emit('subToDeck')
    },
  },
})
</script>

<style scoped></style>

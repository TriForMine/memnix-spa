<template>
  <v-card>
    <v-toolbar color="primarycontainer">
      <v-btn icon @click="closeDialog">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t('create_mcq') }}</v-toolbar-title>
    </v-toolbar>
    <v-item>
      <DeckMCQForm
        :deck-id="getDeckId"
        @closeMCQDialog="closeDialog"
        @createMCQSave="createMCQSave"
      />
    </v-item>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Deck } from '~/types/types'
export default Vue.extend({
  name: 'DeckEditorMCQDialog',
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    },
  },
  computed: {
    getDeckId() {
      return (this.selectedDeck as Deck)?.ID
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeMCQCreatorDialog')
    },
    createMCQSave() {
      this.$emit('createMCQSave')
    },
  },
})
</script>

<style scoped></style>

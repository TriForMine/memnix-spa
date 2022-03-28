<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-btn dark icon @click="closeDialog">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t('edit_mcq') }}</v-toolbar-title>
    </v-toolbar>
    <v-item>
      <DeckMCQForm
        :deck-id="getDeckId"
        :mcq="mcq"
        @closeMCQDialog="closeDialog"
        @createMCQSave="editMCQSave"
      />
    </v-item>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Deck } from '~/types/types'

export default Vue.extend({
  name: 'DeckEditorEditMCQDialog',
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    },
    mcq: {
      type: Object,
      default() {},
    },
  },
  computed: {
    getDeckId() {
      return (this.selectedDeck as Deck).ID
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeMCQCreatorDialog')
    },
    editMCQSave() {
      this.$emit('editMCQSave')
    },
  },
})
</script>

<style scoped></style>

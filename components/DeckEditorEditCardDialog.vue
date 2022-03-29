<template>
  <v-card>
    <v-toolbar color="primarycontainer">
      <v-btn icon @click="closeDialog">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t('edit_card') }}</v-toolbar-title>
    </v-toolbar>
    <v-item>
      <DeckCardForm
        :deck-id="getDeckId"
        :card="card"
        :mcqs="mcqs"
        @closeCardDialog="closeDialog"
        @createCardSave="editCardSave"
      />
    </v-item>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Deck } from '~/types/types'
export default Vue.extend({
  name: 'DeckEditorEditCardDialog',
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    },
    card: {
      type: Object,
      default() {},
    },
    mcqs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    getDeckId() {
      return (this.selectedDeck as Deck).ID
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeCardEditDialog')
    },
    editCardSave() {
      this.$emit('editCardSave')
    },
  },
})
</script>

<style scoped></style>

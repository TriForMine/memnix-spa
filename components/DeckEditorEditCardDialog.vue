<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-btn dark icon @click="closeDialog">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Edit a Card</v-toolbar-title>
    </v-toolbar>
    <v-item>
      <DeckCardForm
        :deck-id="getDeckId"
        :card="card"
        :mcqs="mcqs"
        @closeCardDialog="closeDialog"
        @createCardSave="createCardSave"
      />
    </v-item>
  </v-card>
</template>

<script>
export default {
  name: 'DeckEditorEditCardDialog',
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    },
    card: {
      type: Object,
      default() {}
    },
    mcqs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getDeckId() {
      return this.selectedDeck.ID
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeCardCreatorDialog')
    },
    createCardSave() {
      this.$emit('createCardSave')
    }
  },
}
</script>

<style scoped></style>

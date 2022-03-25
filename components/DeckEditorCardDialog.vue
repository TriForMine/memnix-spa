<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-btn dark icon @click="closeDialog">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Create a new Card</v-toolbar-title>
    </v-toolbar>
    <v-item>
      <DeckCardForm
        :deck-id="getDeckId"
        :mcqs="mcqs"
        @closeCardDialog="closeDialog"
        @createCardSave="createCardSave"
      />
    </v-item>
  </v-card>
</template>

<script>
export default {
  name: 'DeckEditorCardDialog',
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    },
    mcqs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getDeckId() {
      return this.selectedDeck.ID
    }
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

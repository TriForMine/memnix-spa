<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-btn dark icon @click="closeDialog">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Create a new MCQ</v-toolbar-title>
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

<script>
export default {
  name: 'DeckEditorMCQDialog',
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    },
  },
  computed: {
    getDeckId() {
      return this.selectedDeck.ID
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeMCQCreatorDialog')
    },
    createMCQSave() {
      this.$emit('createMCQSave')
    }
  },
}
</script>

<style scoped></style>

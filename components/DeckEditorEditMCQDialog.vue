<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-btn dark icon @click="closeDialog">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Edit a MCQ</v-toolbar-title>
    </v-toolbar>
    <v-item>
      <DeckMCQForm
        :deck-id="getDeckId"
        :mcq.sync="mcq"
        @closeMCQDialog="closeDialog"
        @createMCQSave="editMCQSave"
      />
    </v-item>
  </v-card>
</template>

<script>
export default {
  name: 'DeckEditorEditMCQDialog',
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    },
    mcq: {
      type: Object,
      default() {}
    },

  },
  computed: {
    getDeckId() {
      return this.selectedDeck.ID
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeMCQCreatorDialog')
    },
    editMCQSave() {
      this.$emit('editMCQSave')
    }
  },
}
</script>

<style scoped></style>

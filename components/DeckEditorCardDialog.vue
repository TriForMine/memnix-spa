<template>
  <v-card color="background">
    <v-toolbar color="primarycontainer" >
      <v-btn icon @click="closeDialog">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{  $t('create_card') }}</v-toolbar-title>
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

<script lang="ts">
import Vue from "vue";
import {Deck} from "~/types/types";

export default Vue.extend({
  name: 'DeckEditorCardDialog',
  props: {
    selectedDeck: {
      type: Object as () => Deck,
      required: true,
      default() {},
    },
    mcqs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getDeckId() {
      return (this.selectedDeck as Deck).ID
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
})
</script>

<style scoped></style>

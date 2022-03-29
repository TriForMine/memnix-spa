<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ $t('unsubscribe_deck_question') }}
    </v-card-title>
    <v-card-text> {{ $t('progression_not_deleted') }} </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="error" text @click="closeDialogConfirmation">
        {{ $t('no') }}
      </v-btn>

      <v-btn color="success" text @click="unsubToDeck">
        {{ $t('yes') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'UnsubDialog',
  data() {
    return {}
  },
  methods: {
    closeDialogConfirmation() {
      this.$emit('closeDialogConfirmation')
    },
    unsubToDeck() {
      this.$emit('unsubToDeck')
    },
  },
})
</script>

<style scoped></style>

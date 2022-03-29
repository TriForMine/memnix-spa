<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ $t('delete_card_confirmation') }}
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="error" text @click="closeDialogConfirmation">
        {{ $t('no') }}
      </v-btn>

      <v-btn color="success" text @click="deleteCard">
        {{ $t('yes') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DeleteCardDialog',
  methods: {
    closeDialogConfirmation() {
      this.$emit('closeDialogConfirmation')
    },
    deleteCard() {
      this.$emit('deleteCard')
    },
  },
})
</script>

<style scoped></style>

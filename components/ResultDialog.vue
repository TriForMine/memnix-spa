<template>
  <v-card v-if="res.validate">
    <v-card-title class="text-h5 success onsuccess--text"> {{ $t('correct') }} ! </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" class="mt-5">
            <h2>{{ $t('expected_answer') }}: {{ res.correct_answer }}</h2>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="secondary" text @click="closeDialog">
        <strong>Ok</strong></v-btn
      >
    </v-card-actions>
  </v-card>
  <v-card v-else>
    <v-card-title class="text-h5 error oncolor--text"> {{ $t('incorrect') }} ! </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" class="mt-5">
            <h2>{{ $t('expected_answer') }}: {{ res.correct_answer }}</h2>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="secondary" text @click="closeDialog">
        <strong>{{ $t('ok') }}</strong></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    res: {
      type: Object,
      default() {},
    },
  },
  data(): {
    value: number
  } {
    return {
      value: 0,
    }
  },

  methods: {
    closeDialog() {
      this.$emit('closeResultDialog')
    },
  },
})
</script>

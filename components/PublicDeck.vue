<template>
  <v-card class="mx-auto pa-1 " color="surface" flat max-width="500">
    <v-img :src="item.deck_banner" height="200px"> </v-img>
    <v-card-title
      class="font-weight-bold d-inline-block text-truncate"
      style="max-width: 50vw"
    >
      <v-tooltip bottom color="indigo">
        <template #activator="{ on, attrs }">
          <span class="mb-1" v-bind="attrs" v-on="on">
            {{ item.deck_name }}
          </span>
        </template>
        <span> {{ item.deck_name }}</span>
      </v-tooltip>
    </v-card-title>

    <v-card-text style="height: 60px; max-width: 400px">
      <v-tooltip bottom color="indigo">
        <template #activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <p v-snip:js="2">{{ item.deck_description }}</p>
          </span>
        </template>
        <span> {{ item.deck_description }}</span>
      </v-tooltip>
    </v-card-text>
    <v-chip
      v-if="item.ID === 13"
      class="ma-2"
      color="accent"
      outlined
      text-color="onbackground"
    >
      <v-icon left>
        mdi-star
      </v-icon>
      {{ $t("sponsored") }}
    </v-chip>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        class="ml-2 mt-5"
        outlined
        rounded
        small
        color="primary"
        @click="subToDeckConfirmation(item)"
      >
        {{ $t("subscribe_now") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import {Deck} from "~/types/types";

export default Vue.extend({
  name: 'PublicDeck',
  props: {
    item: {
      type: Object,
      default() {},
    },
  },
  methods: {
    subToDeckConfirmation(n: Deck) {
      this.$emit('subToDeckConfirmation', n)
    },
  },
})
</script>

<style scoped></style>

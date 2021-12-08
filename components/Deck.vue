<template>
  <v-card class="mx-auto" max-width=auto>
    <v-img v-bind:src="deck.deck_banner" height="450"></v-img>

    <v-card-title> {{ deck.deck_name }}</v-card-title>

    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="openDialog"> Play </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ deck.deck_description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  props: {
      deck: [],
  },

  methods: {
      openDialog() {
          this.$emit("openDialog")
      },

      getImageWidth(src){
          const img = new Image();
          img.src = src;
          return img.width;
      },
      getImageHeight(src){
          const img = new Image();
          img.src = src;
          console.log(img.height)
          return img.height;
      },

  }
}
</script>
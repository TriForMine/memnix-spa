<template>
    <v-card v-if="res.validate">
      <v-card-title class="text-h5 green"> Correct ! </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-spacer></v-spacer>
              <h2>Expected answer: {{ res.correct_answer }}</h2>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog"> Ok</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title class="text-h5 red"> Incorrect ! </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-spacer></v-spacer>
              <h2>Expected answer: {{ res.correct_answer }}</h2>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog"> Ok</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    res: [],
  },

  methods: {
    closeDialog() {
      this.$emit('closeResultDialog')
    },
  },
}
</script>
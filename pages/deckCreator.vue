<template>
  <v-container>

  <v-row>
    <v-col cols="12" md="4"> </v-col>
    <v-col cols="12" md="6"> </v-col>
  </v-row>
    </v-container>

</template>

<script>
export default {
  middleware: 'authentificated',
  methods: {
  },
}
</script>

<style>
html {
  overflow: auto !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

<template>
  <v-row>
    <v-col class="text-center">
      <v-img src="moutmout.png" alt="Memnix" contain height="300" />
      <blockquote class="blockquote">
        Welcome to the memnix website!<br />The web version of memnix is not yet
        available. You can use the android version (only on whitelist).
        <footer>
          <small>
            <em>&mdash;Corentin GS</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'authentificated',
}
</script>

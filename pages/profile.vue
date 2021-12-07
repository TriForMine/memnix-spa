<template>
  <v-row>
    <v-col class="text-center">
      <v-img src="moutmout.png" alt="Memnix" contain height="300" />
      <blockquote class="blockquote">
        Welcome to the memnix website!<br />The web version of memnix is not yet
        fully available. You can use the android version (only on whitelist).
        <footer>
          <small>
            <em>&mdash;Corentin GS</em>
          </small>
        </footer>
      </blockquote>
      <v-spacer></v-spacer>

      <v-btn color="secondary" @click="logout" x-large dark>Logout</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'authentificated',
  methods: {
    async logout() {
      try {
        await this.$axios.post(
          `https://api-memnix.yumenetwork.net/api/logout`,
          {},
          {
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
          }
        )
        this.$router.push('/login')
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>

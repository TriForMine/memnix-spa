<template>
  <v-row>
    <v-col class="text-center">
      <User :user="user" />
      <v-spacer></v-spacer>
      <v-btn color="secondary" class="px-14 mt-15" x-large @click="logout"
        >Logout</v-btn
      >
    </v-col>
  </v-row>
</template>



<script>
export default {
  middleware: 'authentificated',
  data() {
    return {
      user: [],
    }
  },
  beforeMount() {
    this.getUser()
  },
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
        await this.$router.push('/login')
      } catch (e) {
        this.error = e.response.data.message
      }
    },

    async getUser() {
      try {
        await this.$axios
          .get(`https://api-memnix.yumenetwork.net/api/user/`, {
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
          })
          .then((res) => {
            this.user = res.data
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },
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

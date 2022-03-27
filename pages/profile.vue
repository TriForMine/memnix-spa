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



<script lang="ts">
import Vue from 'vue'
import {User} from "~/types/types";

export default Vue.extend({
  middleware: 'authentificated',
  data(): {user?: User, error: string} {
    return {
      user: undefined,
      error: ''
    }
  },
  beforeMount() {
    this.getUser()
  },
  methods: {
    async logout() {
      try {
        await this.$axios.post(
          `https://api.memnix.app/api/logout`,
          {},
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true,
          }
        )
        await this.$router.push('/login')
      } catch (e: any) {
        this.error = e.response.data.message
      }
    },

    async getUser() {
      try {
        await this.$axios
          .get(`https://api.memnix.app/api/user/`, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true,
          })
          .then((res: any) => {
            this.user = res.data
          })
      } catch (e: any) {
        this.error = e.response.data.message
      }
    },
  },
})
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

<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      color="surface"
    >
      <template #prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="url" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="user">{{
              user.user_name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('logged_in') }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn small icon @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            ><v-icon>mdi-weather-night</v-icon>
          </v-btn>
        </v-list-item>
      </template>
      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn block class="oncolor--text" color="accent" @click="logout">
            {{ $t('logout') }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="surface">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer padless color="surface">
      <v-col class="text-center" cols="12">
        <v-card class="flex transparent" flat tile>
          <v-card-text class="">
            <v-btn
              class="mx-2"
              small
              fab
              href="https://www.instagram.com/memnix.app/"
            >
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn class="mx-2" small fab href="https://github.com/memnix/">
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn class="mx-2" small fab href="https://twitter.com/MemnixApp">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              small
              fab
              href="https://www.youtube.com/channel/UCCF8LVU77iNt-4Lq8QTw5wA"
            >
              <v-icon>mdi-youtube</v-icon>
            </v-btn>
            <v-btn class="mx-2" small fab href="https://discord.gg/de4hY4VEkJ">
              <v-icon>mdi-discord</v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="py-2 onbackground--text text-center">
            {{ new Date().getFullYear() }} — <strong>Memnix</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/types/types'

export default Vue.extend({
  data(): {
    clipped: boolean
    drawer: boolean
    fixed: boolean
    user?: User
    items: { icon: string; title: string; to: string }[]
    title: string
    error: string
  } {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      user: undefined,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: this.$i18n.t('today').toString(),
          to: '/today',
        },

        {
          icon: 'mdi-view-list',
          title: this.$i18n.t('my_decks').toString(),
          to: '/decks',
        },
        {
          icon: 'mdi-plus-circle',
          title: this.$i18n.t('public_decks').toString(),
          to: '/public',
        },
        {
          icon: 'mdi-pencil',
          title: this.$i18n.t('deck_creator').toString(),
          to: '/creator',
        },
      ],

      title: 'Memnix',
      error: '',
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
    url() {
      return (
        'https://source.boringavatars.com/beam/120/' +
        this.user?.user_name +
        '?colors=070705,3E4B51,6F737E,89A09A,C1C0AE'
      )
    },
  },
  beforeMount() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        await this.$axios
          .get(`https://api.memnix.app/api/user/`, {
            headers: {
              'Content-Type': 'application/json',
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
    async logout() {
      try {
        await this.$axios.post(
          `https://api.memnix.app/api/logout`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        await this.$router.push(this.localePath('/login'))
      } catch (e: any) {
        this.error = e.response.data.message
      }
    },
  },
})
</script>

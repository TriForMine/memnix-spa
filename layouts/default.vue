<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
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

        <v-divider></v-divider>
     

          <v-list-item
          v-for="(deck, j) in decks"
          :key="j"
          :to="deck.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ deck.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="deck.title" />
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      decks: [
        {
          icon: 'mdi-airplane',
          title: 'Deck 1',
          to: ''
        },
             {
          icon: 'mdi-baguette',
          title: 'Deck 2',
          to: ''
        },
             {
          icon: 'mdi-food-apple',
          title: 'Deck 3',
          to: ''
        }
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Today',
          to: '/today',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Profile',
          to: '/profile',
        },
      ],

      title: 'Memnix',
    }
  },
}
</script>

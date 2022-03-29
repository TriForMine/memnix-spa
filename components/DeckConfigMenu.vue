<template>
  <v-menu
    v-model="menu"
    bottom
    offset-x
    rounded="lg"
    :close-on-content-click="false"
    :nudge-width="200"
  >
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" color="onbackground">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="daily" color="accent"></v-switch>
          </v-list-item-action>
          <v-list-item-title>{{ $t('enable_daily') }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text color="onbackground" @click="menu = false"> {{ $t('cancel') }} </v-btn>
        <v-btn color="accent" text @click="setTodaySettings">
          {{ $t('save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
export default {
  name: 'DeckConfigMenu',
  props: {
    today: {
      type: Boolean,
      default() {},
    },
  },
  data(): {
    menu: boolean
    daily: boolean
  } {
    return {
      menu: false,
      daily: this.today,
    }
  },
  methods: {
    setTodaySettings() {
      this.menu = false
      this.$emit('setTodaySettings', this.daily)
    },
  },
}
</script>

<style scoped></style>

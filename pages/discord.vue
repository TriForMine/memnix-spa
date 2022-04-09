<template>
  <v-container justify="center" align="center">
    <v-container my-10>
      <h1 class="text-center mb-7">{{ $t('discord_contribution') }}</h1>
    </v-container>
    <v-row justify="center" align="center">
    <v-col cols="5">
      <v-card class="pa-2 mr-3" elevation='20' color="surface" outlined>
        <v-card-title> {{ $t('translate_memnix') }} </v-card-title>
      </v-card>
    </v-col>
    <v-divider
      vertical
    ></v-divider>
    <v-col cols="5">
      <v-card class="pa-2 mr-3" elevation='20' color="surface" outlined>
        <v-card-text text-color="oncolor">{{ $t('translate_content') }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center" align="center">
    <v-col cols="5">
      <v-card class="pa-2 mr-3 mt-10" elevation='20' color="surface" outlined >
        <v-card-title> {{ $t('discord_meet_team') }} </v-card-title>
      </v-card>
    </v-col>
    <v-divider
      vertical
    ></v-divider>
    <v-col cols="5">
      <v-card class="pa-2 mr-3 mt-10" elevation='20' color="surface" outlined>
        <v-card-text text-color="oncolor">{{ $t('meet_team_content') }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
    <v-row justify="center" align="center">
      <v-col cols="5">
        <v-card class="pa-2 mr-3 mt-10" elevation='20' color="surface" outlined >
          <v-card-title> {{ $t('write_code') }} </v-card-title>
        </v-card>
      </v-col>
      <v-divider
        vertical
      ></v-divider>
      <v-col cols="5">
        <v-card class="pa-2 mr-3 mt-10" elevation='20' color="surface" outlined>
          <v-card-text text-color="oncolor">{{ $t('write_code_content') }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row  justify="center" align="center">
        <v-btn class="mt-12" color="primary" x-large  href="https://discord.gg/de4hY4VEkJ" target="_blank">{{ $t('community_contrib') }}</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "Discord",
  layout: 'landing',
  middleware: 'guest'
})
</script>


<style scoped></style>

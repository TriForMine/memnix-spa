<template>
  <v-row justify="center" align="center">
    <v-container mt-10>
      <h1 class="text-center mb-7">{{ $t('welcome_index') }}</h1>

      <p>
        {{ $t('presentation_index') }}
      </p>
      <p>
        {{ $t('more_info_index') }}
        <a
          href="https://github.com/memnix"
          target="_blank"
          rel="noopener noreferrer"
        >
          github</a
        >.
      </p>

      <p>
        {{ $t('thx_index') }}
      </p>
      <div class="text-xs-right">
        <em
          ><small>&mdash; {{ $t('memnix_team') }}</small></em
        >
      </div>
      <v-container mt-10>
        <v-card-actions>
          <v-spacer />
          <v-btn x-large color="primary" nuxt :to="localePath('/today')">
            {{ $t('getting_started') }}
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-container>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'landing',
  middleware: 'guest',
})
</script>

<template>
  <v-row justify="center" align="center">
    <v-container mt-10>
      <h1 class="text-center mb-7">Welcome to the Memnix beta !</h1>
      <p>
        The scope of this beta is to test the functionality and algorithmic
        features.
        <br />The existing decks have been pre-established and aren't currently
        open to edit.
      </p>
      <p>
        For more information on Memnix, check out the
        <a
          href="https://github.com/memnix"
          target="_blank"
          rel="noopener noreferrer"
          >github</a
        >.
      </p>

      <p>
        Find a bug? Fill
        <a
          href="https://github.com/memnix/memnix-spa/issues"
          target="_blank"
          rel="noopener noreferrer"
          title="contribute"
          >a form</a
        >.
      </p>
      <p>
        Thank you for contributing to Memnix. A number of updates are to be
        implemented in the next few weeks. We will keep you updated on this
        matter.
      </p>
      <div class="text-xs-right">
        <em><small>&mdash; Memnix's team</small></em>
      </div>
      <v-container mt-10>
        <v-card-actions>
          <v-spacer />
          <v-btn x-large color="primary" nuxt to="/today"> Getting Started </v-btn>
        </v-card-actions>
      </v-container>
    </v-container>
  </v-row>
</template>

<script>
export default {
  layout: 'landing',
  middleware: 'guest'
}
</script>

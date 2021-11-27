<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Welcome to the Memnix beta !
        </v-card-title>
         <v-card-text>
          <p>
            The scope of this beta is to test the functionality and algorithmic
            features.
            <br />The existing decks have been pre-established and aren't
            currently open to edit.
          </p>
          <p>
            For more information on Memnix, check out the
            <a
              href="https://github.com/memnix"
              target="_blank"
              rel="noopener noreferrer"
            >
              github </a
            >.
          </p> 
          
          <!--<p>
            If you have questions, please contact us on the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>  -->
          <p>
            Find a bug? Fill

            <a
              href="https://github.com/memnix/memnix-spa/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              a form </a
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
          <hr class="my-3" />
          <a
            href="https://github.com/memnix/community-guidelines"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <br />
          <a
            href="https://github.com/memnix"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/profile"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
export default {
  layout: 'login',
}
</script>
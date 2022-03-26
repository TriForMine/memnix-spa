<template>
  <v-container>
    <v-overlay :value="loaderOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      shaped
      elevation="24"
      outlined
      color="info"
    >
      {{ snackbarText }}

      <template #action="{ attrs }">
        <v-btn color="warning" icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="editor"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <DeckEditorDialog
        ref="deckEditorDialog"
        :create="createMode"
        :selected-deck="selectedDeck"
        @closeEditDeck="closeEditDeck"
        @createDeckSave="createDeckSave"
      />
    </v-dialog>

    <v-toolbar color="primary" dark flat mb-10>
      <v-spacer></v-spacer>
      <v-btn text x-large @click="createDeck"> Create a deck </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(n, index) in decks"
          :key="index"
          cols="12"
          sm="12"
          md="6"
          lg="6"
          xl="4"
        >
          <DeckEditor
            :deck-object="n"
            @editDeck="editDeck(n)"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-container>
</template>

<script>
export default {
  middleware: 'authentificated',
  data() {
    return {
      decks: [],
      dialog: false,
      selectedDeck: undefined,
      editor: false,
      createMode: false,
      snackbar: false,
      snackbarText: "",
      loaderOverlay: false,
      timeout: 2000,
    }
  },

  beforeMount() {
    this.getEditorsDeck()
  },

  methods: {
    createDeck() {
      this.selectedDeck = {
        deck_name: '',
        deck_description: '',
        deck_banner: '',
      }
      this.createMode = true

      this.editor = true
    },
    async editDeck(value) {
      this.selectedDeck = value
      this.createMode = false
      this.editor = true

      while (!this.$refs.deckEditorDialog) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      await this.$refs.deckEditorDialog.getCards(value.ID)
      await this.$refs.deckEditorDialog.getMCQS(value.ID)

    },
    closeEditDeck() {
      this.editor = false
    },

    async createDeckSave() {
      this.editor = false
      this.snackbarText = 'Success creating a new deck !'
      this.snackbar = true
      await this.getEditorsDeck()
    },

    async getEditorsDeck() {
      this.loaderOverlay = true
      this.decks = []

      try {
        await this.$axios
          .get(`https://api.memnix.app/api/v1/decks/editor`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then((res) => {
            for (let i = 0; i < res.data.count; i++) {
              this.decks.push(res.data.data[i].Deck)
            }
          })
      } catch (e) {
        this.error = e.response.data.message
      }
      this.loaderOverlay = false
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
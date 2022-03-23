<template>
  <v-card>
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
    <v-toolbar color="primary" dark>
      <v-btn dark icon @click="closeEditDeck">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ getDeckName }}</v-toolbar-title>
    </v-toolbar>
    <v-card-title> </v-card-title>
    <v-tabs :value="isCreateMode ? 0 : 1">
      <v-tab :disabled="!isCreateMode">
        <v-icon left> mdi-cog </v-icon>
        Deck
      </v-tab>
      <v-tab :disabled="!!isCreateMode">
        <v-icon left> mdi-cards </v-icon>
        Cards
      </v-tab>
      <v-tab :disabled="!!isCreateMode">
        <v-icon left> mdi-checkbox-multiple-marked </v-icon>
        MCQ
      </v-tab>

      <v-tab-item>
        <DeckForm
          @closeEditDeck="closeEditDeck"
          @createDeckSave="createDeckSave"
        />
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn text outlined color="warning" x-large>
                  Create new card
                </v-btn>
              </v-card-title>
              <v-data-table :headers="headers" :items="cards" :search="search">
                <template #[`item.card_case`]="{ item }">
                  <v-simple-checkbox
                    v-model="item.card_case"
                    disabled
                  ></v-simple-checkbox>
                </template>
                <template #[`item.card_spaces`]="{ item }">
                  <v-simple-checkbox
                    v-model="item.card_spaces"
                    disabled
                  ></v-simple-checkbox>
                </template>
                <template #[`item.actions`]="{}">
                  <v-icon small class="mr-2"> mdi-pencil </v-icon>
                  <v-icon small> mdi-delete </v-icon>
                </template>
                <template #no-data>
                  <v-btn color="primary" @click="initialize"> Reset </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn text outlined color="warning" x-large>
                  Create new MCQ
                </v-btn>
              </v-card-title>
              <v-data-table
                :headers="headersMCQ"
                :items="mcqs"
                :search="search"
              >
                <template #[`item.mcq_answers`]="{ item }">
                  <p
                    class="font-weight-bold d-inline-block text-truncate"
                    style="max-width: 50vw"
                  >
                    <v-tooltip bottom color="indigo">
                      <template #activator="{ on, attrs }">
                        <span class="mb-1" v-bind="attrs" v-on="on">
                          {{ item.mcq_answers }}
                        </span>
                      </template>
                      <span> {{ item.mcq_answers }}</span>
                    </v-tooltip>
                  </p>
                </template>
                <template #[`item.actions`]="{}">
                  <v-icon small class="mr-2"> mdi-pencil </v-icon>
                  <v-icon small> mdi-delete </v-icon>
                </template>
                <template #no-data>
                  <v-btn color="primary" @click="initialize"> Reset </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: 'DeckEditorDialog',
  props: {
    selectedDeck: {
      type: Object,
      default() {},
    },
    create: {
      type: Boolean,
    },
  },
  data() {
    return {
      loaderOverlay: false,
      snackbar: false,
      snackbarText: ' ',
      timeout: 2000,

      createMode: true,
      cards: [],
      mcqs: [],
      total: 0,
      search: '',
      headersMCQ: [
        { text: 'Name', align: 'start', value: 'mcq_name' },
        { text: 'Answer', value: 'mcq_answers' },
        { text: 'Type', value: 'mcq_type' },
      ],
      headers: [
        { text: 'Question', align: 'start', value: 'card_question' },
        { text: 'Answer', value: 'card_answer' },
        { text: 'Type', value: 'card_type' },
        { text: 'Format', value: 'card_format' },
        { text: 'Case', value: 'card_case' },
        { text: 'Spaces', value: 'card_spaces' },
        { text: 'MCQ', value: 'Mcq.mcq_name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  computed: {
    getDeckName() {
      if (this.isCreateMode) {
        return 'New deck'
      }
      return this.selectedDeck.deck_name
    },
    isCreateMode() {
      return this.create & this.createMode
    },
  },
  methods: {
    closeEditDeck() {
      this.createMode = true
      this.$emit('closeEditDeck')
    },

    async initialize() {
      await this.getCards(this.selectedDeck.ID)
      await this.getMCQS(this.selectedDeck.ID)
    },

    createDeckSave() {
      this.createDeck = false
      this.loaderOverlay = true
      this.snackbarText = 'Success creating a new deck !'
      setTimeout(() => {
        this.loaderOverlay = false
        this.snackbar = true
        this.createMode = false
      }, 2000)
    },

    async getCards(ID) {
      try {
        await this.$axios
          .get(`https://api.memnix.app/api/v1/cards/deck/` + ID, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then((res) => {
            this.cards = res.data.data
            this.total = this.cards.length
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },

    async getMCQS(ID) {
      try {
        await this.$axios
          .get(`https://api.memnix.app/api/v1/mcqs/` + ID, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then((res) => {
            this.mcqs = res.data.data
            this.total = this.cards.length
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>

<style scoped></style>

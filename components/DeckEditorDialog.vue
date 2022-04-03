<template>
  <v-card color="background">
    <v-dialog
      v-model="createCardDialog"
      max-width="600px"
      persistent
      @keydown.enter="closeCardCreatorDialog"
    >
      <DeckEditorCardDialog
        :mcqs="mcqs"
        :selected-deck="selectedDeck"
        @closeCardCreatorDialog="closeCardCreatorDialog"
        @createCardSave="createCardSave"
      />
    </v-dialog>
    <v-dialog
      v-model="editCardDialog"
      max-width="600px"
      persistent
      @keydown.enter="closeCardEditDialog"
    >
      <DeckEditorEditCardDialog
        :mcqs="mcqs"
        :selected-deck="selectedDeck"
        :card="selectedCard"
        @closeCardEditDialog="closeCardEditDialog"
        @editCardSave="editCardSave"
      />
    </v-dialog>
    <v-dialog
      v-model="editMCQDialog"
      max-width="600px"
      persistent
      @keydown.enter="closeMCQEditDialog"
    >
      <DeckEditorEditMCQDialog
        :selected-deck="selectedDeck"
        :mcq="selectedMCQ"
        @closeMCQCreatorDialog="closeMCQEditDialog"
        @editMCQSave="editMCQSave"
      />
    </v-dialog>
    <v-dialog
      v-model="createMCQDialog"
      max-width="600px"
      persistent
      @keydown.enter="closeMCQCreatorDialog"
    >
      <DeckEditorMCQDialog
        :selected-deck="selectedDeck"
        @closeMCQCreatorDialog="closeMCQCreatorDialog"
        @createMCQSave="createMCQSave"
      />
    </v-dialog>
    <v-dialog
      v-model="cardDeleteConfirmationDialog"
      hide-overlay
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <DeckEditorDeleteCardDialog
        @deleteCard="deleteCard"
        @closeDialogConfirmation="closeDialogConfirmation"
      />
    </v-dialog>
    <v-dialog
      v-model="mcqDeleteConfirmationDialog"
      hide-overlay
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <DeckEditorDeleteMCQDialog
        @deleteMCQ="deleteMCQ"
        @closeDialogConfirmation="closeDialogMCQConfirmation"
      />
    </v-dialog>
    <v-overlay :value="loaderOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      shaped
      elevation="24"
      outlined
      color="primary"
    >
      {{ snackbarText }}

      <template #action="{ attrs }">
        <v-btn color="warning" icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-toolbar color="primarycontainer">
      <v-btn icon @click="closeEditDeck">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ getDeckName }}</v-toolbar-title>
    </v-toolbar>
    <v-card-title> </v-card-title>
    <v-tabs background-color="background" :value="isCreateMode ? 0 : 1">
      <v-tab>
        <v-icon left> mdi-cog </v-icon>
        {{ $t('deck') }}
      </v-tab>
      <v-tab :disabled="!!isCreateMode">
        <v-icon left> mdi-cards </v-icon>
        {{ $t('cards') }}
      </v-tab>
      <v-tab :disabled="!!isCreateMode">
        <v-icon left> mdi-checkbox-multiple-marked </v-icon>
        {{ $t('mcq') }}
      </v-tab>

      <v-tab-item transition="false">
        <DeckForm
          :is-edit="!isCreateMode"
          :selected-deck="selectedDeck"
          @closeEditDeck="closeEditDeck"
          @createDeckSave="createDeckSave"
        />
      </v-tab-item>

      <v-tab-item transition="false">
        <v-card color="background">
          <v-card-text>
            <v-card color="background">
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  outlined
                  color="primary"
                  x-large
                  @click="openCardCreatorDialog"
                >
                  {{ $t('create_card') }}
                </v-btn>
              </v-card-title>
              <v-data-table
                class="background"
                :headers="headers"
                :items="cards"
                :search="search"
              >
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
                <template #[`item.actions`]="{ item }">
                  <v-icon small class="mr-2" @click="openEditCardDialog(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="openDeleteCardDialog(item)">
                    mdi-delete
                  </v-icon>
                </template>
                <template #[`item.card_type`]="{ item }">
                  {{ getCardType(item.card_type) }}
                </template>
                <template #no-data>
                  <v-btn color="primary" @click="initialize">
                    {{ $t('reset') }}
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item transition="false">
        <v-card color="background">
          <v-card-text>
            <v-card color="background">
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  outlined
                  color="primary"
                  x-large
                  @click="openMCQCreatorDialog"
                >
                  {{ $t('create_mcq') }}
                </v-btn>
              </v-card-title>
              <v-data-table
                class="background"
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
                <template #[`item.mcq_type`]="{ item }">
                  {{ getMcqType(item.mcq_type) }}
                </template>
                <template #[`item.actions`]="{ item }">
                  <v-icon small class="mr-2" @click="openEditMCQDialog(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="openDeleteMCQDialog(item)">
                    mdi-delete
                  </v-icon>
                </template>
                <template #no-data>
                  <v-btn color="primary" @click="initialize">
                    {{ $t('reset') }}
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import {
  deleteCardAPI,
  deleteMCQAPI,
  getCardsAPI,
  getMCQSAPI,
} from '../api/card.api'
import { Card, CardType, Deck, Mcq, McqType } from '~/types/types'

export default Vue.extend({
  name: 'DeckEditorDialog',
  props: {
    selectedDeck: {
      type: Object as PropType<Deck>,
      required: true,
    },
    create: {
      type: Boolean,
      required: true,
    },
  },
  data(): {
    loaderOverlay: boolean
    snackbar: boolean
    snackbarText: string
    timeout: number
    selectedCard?: Card
    selectedMCQ?: Mcq
    createMode: boolean
    createCardDialog: boolean
    editCardDialog: boolean
    createMCQDialog: boolean
    editMCQDialog: boolean
    cardDeleteConfirmationDialog: boolean
    mcqDeleteConfirmationDialog: boolean
    cards: Card[]
    mcqs: Mcq[]
    total: number
    search: string
    headersMCQ: {
      text: string
      align?: string
      value: string
      sortable?: boolean
    }[]
    headers: {
      text: string
      align?: string
      value: string
      sortable?: boolean
    }[]
    error: string
  } {
    return {
      loaderOverlay: false,
      snackbar: false,
      snackbarText: ' ',
      timeout: 2000,
      selectedCard: undefined,
      selectedMCQ: undefined,
      createMode: true,
      createCardDialog: false,
      editCardDialog: false,
      createMCQDialog: false,
      editMCQDialog: false,
      cardDeleteConfirmationDialog: false,
      mcqDeleteConfirmationDialog: false,
      cards: [],
      mcqs: [],
      total: 0,
      search: '',
      headersMCQ: [
        { text: 'Name', align: 'start', value: 'mcq_name' },
        { text: 'Answers', value: 'mcq_answers' },
        { text: 'Type', value: 'mcq_type' },
        { text: 'Actions', value: 'actions', sortable: false },
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
      error: '',
    }
  },
  computed: {
    getDeckName() {
      if (this.isCreateMode) {
        return 'New deck'
      }
      return (this.selectedDeck as Deck)?.deck_name
    },
    isCreateMode() {
      // @ts-ignore ts is dumb
      return (this.create as boolean) && (this.createMode as boolean)
    },
  },
  methods: {
    closeCardCreatorDialog() {
      if (this.createCardDialog) {
        this.createCardDialog = false
      }
    },

    getMcqType(type: McqType) {
      return type === McqType.Standalone ? this.$i18n.t('standalone').toString() : this.$i18n.t('linked').toString();
    },
    getCardType(type: CardType) {
      if (type === CardType.String) {
        return this.$i18n.t('string').toString()
      } else if (type === CardType.Int) {
        return this.$i18n.t('int').toString()
      } else {
        return this.$i18n.t('mcq_only').toString()
      }
    },

    closeCardEditDialog() {
      if (this.editCardDialog) {
        this.editCardDialog = false
      }
    },

    closeMCQEditDialog() {
      if (this.editMCQDialog) {
        this.editMCQDialog = false
      }
    },

    closeMCQCreatorDialog() {
      if (this.createMCQDialog) {
        this.createMCQDialog = false
      }
    },

    closeDialogConfirmation() {
      this.cardDeleteConfirmationDialog = false
    },

    closeDialogMCQConfirmation() {
      this.mcqDeleteConfirmationDialog = false
    },

    openCardCreatorDialog() {
      this.createCardDialog = true
    },

    openEditCardDialog(card: Card) {
      this.selectedCard = card
      this.editCardDialog = true
    },

    openMCQCreatorDialog() {
      this.createMCQDialog = true
    },

    openEditMCQDialog(mcq: Mcq) {
      this.selectedMCQ = mcq
      this.editMCQDialog = true
    },

    openDeleteCardDialog(card: Card) {
      this.selectedCard = card
      this.cardDeleteConfirmationDialog = true
    },

    openDeleteMCQDialog(mcq: Mcq) {
      this.selectedMCQ = mcq
      this.mcqDeleteConfirmationDialog = true
    },

    closeEditDeck() {
      this.createMode = true
      this.$emit('closeEditDeck')
    },

    async initialize() {
      await this.getCards(this.selectedDeck?.ID)
      await this.getMCQS(this.selectedDeck?.ID)
    },

    createDeckSave() {
      if (this.isCreateMode) {
        this.createMode = false
        this.$emit('createDeckSave')
      } else {
        this.snackbarText = this.$i18n.t('success_edit_deck').toString()
        this.snackbar = true
        this.$emit('createDeckSave')
      }
    },

    async createCardSave() {
      this.createCardDialog = false
      this.snackbar = true
      this.snackbarText = this.$i18n.t('success_create_card').toString()
      await this.getCards(this.selectedDeck.ID)
    },

    async editCardSave() {
      this.editCardDialog = false
      this.snackbarText = this.$i18n.t('success_edit_card').toString()
      this.snackbar = true
      await this.getCards(this.selectedDeck.ID)
    },

    async createMCQSave() {
      this.createMCQDialog = false
      this.snackbarText = this.$i18n.t('success_create_mcq').toString()
      this.snackbar = true
      await this.getMCQS(this.selectedDeck.ID)
    },

    async editMCQSave() {
      this.editMCQDialog = false
      this.snackbarText = this.$i18n.t('success_edit_mcq').toString()
      this.snackbar = true
      await this.getMCQS(this.selectedDeck.ID)
    },

    async deleteCard() {
      this.cardDeleteConfirmationDialog = false
      this.loaderOverlay = true
      const [error] = await deleteCardAPI(this.selectedCard?.ID)
      if (error) this.error = error.response.data.message
      else {
        this.snackbarText = this.$i18n.t('success_delete_card').toString()
        await this.getCards(this.selectedDeck.ID)
      }

      this.loaderOverlay = false
    },

    async deleteMCQ() {
      this.mcqDeleteConfirmationDialog = false
      this.loaderOverlay = true
      const [error] = await deleteMCQAPI(this.selectedMCQ?.ID)
      if (error) this.error = error.response.data.message
      else {
        this.snackbarText = this.$i18n.t('success_delete_mcq').toString()
        await this.getMCQS(this.selectedDeck.ID)
      }

      this.loaderOverlay = false
    },

    async getCards(ID: number) {
      this.loaderOverlay = true
      const [error, data] = await getCardsAPI(ID)
      if (error) this.error = error.response.data.message
      else {
        this.cards = data.data
        this.total = this.cards.length
      }

      this.loaderOverlay = false
    },

    async getMCQS(ID: number) {
      this.loaderOverlay = true
      const [error, data] = await getMCQSAPI(ID)
      if (error) this.error = error.response.data.message
      else {
        this.mcqs = data.data
        this.total = this.cards.length
      }

      this.loaderOverlay = false
    },
  },
})
</script>

<style scoped></style>

<template>
  <v-data-iterator
    :items="decks"
    :items-per-page.sync="itemsPerPage"
    :page.sync="page"
    :search="search"
    hide-default-footer
    class="d-flex flex-column overflow-hidden mx-10 ma-3"
  >
    <template #header>
      <v-toolbar class="mb-2 shrink" color="indigo" dark flat>
        <v-text-field
          v-model="search"
          class="d-flex flex-column mh-100 overflow-hidden"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
        ></v-text-field>
      </v-toolbar>
    </template>

    <template #default="props">
      <v-row class="fill-height overflow-auto mt-5">
        <v-col
          v-for="item in props.items"
          :key="item.deck_name"
          cols="12"
          sm="12"
          md="6"
          lg="6"
          xl="4"
        >
          <PublicDeck
            :item="item"
            @subToDeckConfirmation="subToDeckConfirmation($event)"
          />
        </v-col>
      </v-row>
    </template>

    <template #footer>
      <v-row
        class="mt-5 no-gutters py-2 shrink"
        align="center"
        justify="center"
      >
        <v-spacer></v-spacer>

        <span class="mr-4 grey--text">
          Page {{ page }} of
          <span
            class="font-weight-bold primary--text"
            v-text="numberOfPages"
          ></span>
        </span>
        <v-btn
          small
          rounded
          dark
          color="blue darken-3"
          class="mr-1"
          @click="formerPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          small
          rounded
          dark
          color="blue darken-3"
          class="ml-1"
          @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  name: 'PublicDeckIterator',
  props: {
    decks: {
      Type: Array[Object],
      default() {},
    },
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      search: '',
      headers: [
        {
          text: 'Banner',
          value: 'banner',
          align: 'start',
        },
        {
          text: 'Name',
          value: 'deck_name',
          divider: true,
          width: '10%',
          align: 'start',
        },
        {
          text: 'Action',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: '5%',
        },
        { text: '', value: 'data-table-expand', align: 'end', width: '5%' },
      ],
    }
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.decks.length / this.itemsPerPage)
    },
  },
  methods: {
    subToDeckConfirmation(n) {
      this.$emit('subToDeckConfirmation', n)
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
  },
}
</script>

<style scoped></style>

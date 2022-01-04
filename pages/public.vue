<template>
  <v-row>
    <v-col>
      <v-dialog
        v-model="dialogConfirmation"
        hide-overlay
        max-width="600px"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title class="text-h5">
            Subscribe to this deck ?
          </v-card-title>
          <v-card-text> You will be able to play it. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red darken-1"
              text
              @click="dialogConfirmation = false"
            >
              No
            </v-btn>

            <v-btn color="green darken-1" text @click="subToDeck"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-iterator
        :items="decks"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        hide-default-footer
        class="d-flex flex-column overflow-hidden"
      >
        <template #header>
          <v-toolbar class="mb-2 shrink" color="indigo" dark flat>
            <v-toolbar-title class="mx-5">Public decks</v-toolbar-title>
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
              sm="6"
              md="6"
              lg="4"
              xl="6"
            >
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="
                        subheading
                        font-weight-bold
                        d-inline-block
                        text-truncate
                      "
                      style="max-width: 180px"
                    >
                      <v-tooltip bottom color="indigo">
                        <template #activator="{ on, attrs }">
                          <span class="mb-1" dark v-bind="attrs" v-on="on">
                            {{ item.deck_name }}
                          </span>
                        </template>
                        <span> {{ item.deck_name }}</span>
                      </v-tooltip>
                    </v-card-title>
                    <v-card-text style="height: 60px; max-width: 180px">
                      <v-tooltip bottom color="indigo">
                        <template #activator="{ on, attrs }">
                          <span dark v-bind="attrs" v-on="on">
                            <p v-snip:js="2">{{ item.deck_description }}</p>
                          </span>
                        </template>
                        <span> {{ item.deck_description }}</span>
                      </v-tooltip>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-btn
                        class="ml-2 mt-5"
                        outlined
                        rounded
                        small
                        color="orange"
                        @click="subToDeckConfirmation(item)"
                      >
                        Subscribe Now
                      </v-btn>
                    </v-card-actions>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.deck_banner"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template #footer>
          <v-row
            class="mt-auto no-gutters py-2 shrink"
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
    </v-col>
  </v-row>
</template>



<script>
export default {
  data() {
    return {
      decks: [],
      dialogConfirmation: false,
      selectedDeck: [],
      res: [],
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
  beforeMount() {
    this.getAvailableDeck()
  },

  methods: {
    subToDeckConfirmation(n) {
      this.selectedDeck = n
      this.dialogConfirmation = true
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },

    async subToDeck() {
      try {
        await this.$axios
          .post(
            `https://api-memnix.yumenetwork.net/api/v1/decks/` +
              this.selectedDeck.ID +
              `/subscribe`,
            {},
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )
          .then((res) => {
            this.decks.splice(this.decks.indexOf(this.selectedDeck), 1)
            this.dialogConfirmation = false
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    },

    async getAvailableDeck() {
      try {
        await this.$axios
          .get(`https://api-memnix.yumenetwork.net/api/v1/decks/available`, {
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
          })
          .then((res) => {
            for (let i = 0; i < res.data.count; i++) {
              this.decks.push(res.data.data[i])
            }
          })
      } catch (e) {
        this.error = e.response.data.message
      }
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
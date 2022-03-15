/* eslint-disable vue/require-default-prop */
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="5">
          <v-img
            src=""
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px"
          >
            <v-card-title>
              <v-avatar size="100">
                <img
                  alt="user"
                  :src=url
                />
              </v-avatar>
              <span class="ml-3" >
                <h2>{{user.user_name}}</h2>
              </span>
            </v-card-title>
          </v-img>

          <v-card-actions>
            <v-col>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-icon
                    class="mr-1"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-card-multiple
                  </v-icon>
                </template>
                <span>Number of decks</span>
              </v-tooltip>
              <span class="subheading mr-1">0</span>

              <span class="mr-1">·</span>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-icon
                    class="mr-1"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-school
                  </v-icon>
                </template>
                <span>Number of revisions</span>
              </v-tooltip>
              <span class="subheading mr-1">0</span>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserComponent",
  props: {
    user: {
      type: Object,
      default() {},
    },
  },
  data() {
    return {
    }
  },
  computed: {
    url() {
      return "https://source.boringavatars.com/beam/120/"+this.user.user_name+"?colors=070705,3E4B51,6F737E,89A09A,C1C0AE"
    }
  },
  methods: {},
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="4" log="4">
            <v-card elevation="0">
              <v-img
                src="moutmout.png"
                alt="Memnix Logo"
                contain
                height="200"
              ></v-img>
              <v-card-title class="headline"> Welcome to Memnix </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="Enter your email"
                    name="email"
                    prepend-inner-icon="mdi-email"
                    type="email"
                    class="rounded-0"
                    required
                    outlined
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    label="Enter your password"
                    name="password"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    class="rounded-0"
                    required
                    outlined
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                  <v-btn
                    class="mb-2"
                    type="submit"
                    color="primary"
                    x-large
                    dark
                    block
                    >Login</v-btn
                  >
                  <v-spacer></v-spacer>

                  No account?
                  <v-btn
                    color="secondary"
                    nuxt
                    to="/register"
                    x-large
                    dark
                    block
                    >Sign Up</v-btn
                  >
                </v-form>
              </v-card-text>
              <v-card-actions class="ml-6 mr-6 text-center">
                <p>
                  By continuing, you agree to Memnix's
                  <a href="https://github.com/memnix/community-guidelines/blob/main/PRIVACY.md" class="pl-2">Policy</a> and<a
                    href="https://github.com/memnix/community-guidelines/blob/main/PRIVACY.md"
                    class="pl-2"
                    >Terms of Use</a
                  >
                </p>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

export default {

  mixins: [validationMixin],
  layout: 'login',
  middleware: 'guest',

  validations: {
    password: { required, maxLength: maxLength(20), minLength: minLength(8) },
    email: { required, email },
  },

  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },

  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength &&
        errors.push('Password must be at most 20 characters long')
      !this.$v.password.minLength &&
        errors.push('Password must be at least 8 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    async login() {
      await this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await this.$axios
            .post(
              `https://api-memnix.yumenetwork.net/api/login/`,
              {
                email: this.email.toLowerCase(),
                password: this.password,
              },
              {
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
              }
            )

          await this.$axios.get(
            `https://api-memnix.yumenetwork.net/api/user/`,
            {
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          )

          await this.$router.push('/today')
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    },
  },
}
</script>

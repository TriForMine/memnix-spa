<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4" log="4">
          <v-card elevation="0">
            <v-card-title class="headline"> Register !</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field
                  v-model="username"
                  :error-messages="nameErrors"
                  label="Enter your username"
                  name="username"
                  prepend-inner-icon="mdi-account"
                  type="text"
                  class="rounded-0 control"
                  required
                  outlined
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="Enter your email"
                  name="email"
                  prepend-inner-icon="mdi-email"
                  type="email"
                  class="rounded-0 control"
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
                  class="rounded-0 control"
                  required
                  outlined
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
                <v-checkbox
                  v-model="checkbox"
                  :error-messages="checkboxErrors"
                  label="Do you agree to our TOS ?"
                  required
                  @change="$v.checkbox.$touch()"
                  @blur="$v.checkbox.$touch()"
                ></v-checkbox>
                <v-btn
                  class="mb-2"
                  type="submit"
                  color="primary"
                  x-large
                  dark
                  block
                  >Register</v-btn
                >
              </v-form>
              <v-spacer></v-spacer>
              Already got an account?
              <nuxt-link to="/login">Login</nuxt-link>
            </v-card-text>
            <v-card-actions class="ml-6 mr-6 text-center">
              <p>
                By continuing, you agree to Memnix's
                <a
                  href="https://github.com/memnix/community-guidelines/blob/main/PRIVACY.md"
                  class="pl-2"
                  >Policy</a
                >
                and
                <a
                  href="https://github.com/memnix/community-guidelines/blob/main/PRIVACY.md"
                  class="pl-2"
                  >Terms of Use</a
                >
              </p>
            </v-card-actions>
          </v-card>
          <v-alert
            v-model="alert"
            dismissible
            prominent
            type="error"
            transition="scale-transition"
            shaped
          >
            {{ error }}
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { validationMixin, useVuelidate } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  layout: 'login',
  middleware: 'guest',
  setup: () => ({ v$: useVuelidate() }),

  validations: {
    username: { required, maxLength: maxLength(15), minLength: minLength(4) },
    password: { required, maxLength: maxLength(20), minLength: minLength(8) },
    email: { required, email },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data() {
    return {
      username: '',
      email: '',
      password: '',
      checkbox: false,
      error: 'An error occurred !',
      alert: false,
    }
  },

  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength &&
        errors.push('Username must be at most 15 characters long')
      !this.$v.username.minLength &&
        errors.push('Username must be at least 4 characters long')
      !this.$v.username.required && errors.push('Username is required.')
      return errors
    },
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
    async register() {
      await this.$v.$touch()

      if (!this.$v.$invalid) {
        try {
          await this.$axios.post(
            `https://api-memnix.yumenetwork.net/api/register/`,
            {
              username: this.username,
              email: this.email,
              password: this.password,
            },
            {
              headers: {
                'Content-Type': 'application/json'
              },
            }
          )

          await this.$axios
            .post(
              `https://api-memnix.yumenetwork.net/api/login/`,
              {
                email: this.email,
                password: this.password,
              },
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              }
            )
            .then(async (res) => {
              this.res = res.data
              await this.$router.push('/login')
            })
        } catch (e) {
          this.error = e.response.data.message
          this.alert = true
          window.setInterval(() => {
            this.alert = false;
          }, 10000)
        }
      }
    },
  },
}
</script>

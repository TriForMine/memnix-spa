<template>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4" log="4">
          <v-card color="surface">
            <v-card-title class="headline">
              {{ $t('register') }} !</v-card-title
            >
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field
                  v-model="username"
                  :error-messages="nameErrors"
                  :label="$i18n.t('enter_username')"
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
                  :label="$i18n.t('enter_mail')"
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
                  :label="$i18n.t('enter_password')"
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
                  :label="$i18n.t('do_agree')"
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
                  >{{ $t('register') }}</v-btn
                >
              </v-form>
              <v-spacer></v-spacer>
              {{ $t('already_account') }}
              <nuxt-link :to="localePath('/login')">
                {{ $t('login') }}</nuxt-link
              >
            </v-card-text>
            <v-card-actions class="ml-6 mr-6 text-center">
              <p>
                {{ $t('agree')
                }}<a
                  href="https://github.com/memnix/community-guidelines/blob/main/PRIVACY.md"
                  class="pl-2"
                  >{{ $t('policy_tos') }}</a
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
</template>

<script lang="ts">
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { login, register } from '~/api/user.api'

export default Vue.extend({
  mixins: [validationMixin],
  layout: 'login',
  middleware: 'guest',

  validations: {
    username: { required, maxLength: maxLength(15), minLength: minLength(4) },
    password: { required, maxLength: maxLength(50), minLength: minLength(8) },
    email: { required, email },
    checkbox: {
      checked(val: boolean) {
        return val
      },
    },
  },

  data(): {
    username: string
    email: string
    password: string
    checkbox: boolean
    error: string
    alert: boolean
  } {
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
      const errors: string[] = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push(this.$i18n.t('must_agree'))
      return errors
    },
    nameErrors() {
      const errors: string[] = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength &&
        errors.push(this.$i18n.t('username_max_len'))
      !this.$v.username.minLength &&
        errors.push(this.$i18n.t('username_min_len'))
      !this.$v.username.required &&
        errors.push(this.$i18n.t('username_required'))
      return errors
    },
    passwordErrors() {
      const errors: string[] = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength &&
        errors.push(this.$i18n.t('password_max_len'))
      !this.$v.password.minLength &&
        errors.push(this.$i18n.t('password_min_len'))
      !this.$v.password.required &&
        errors.push(this.$i18n.t('password_required'))
      return errors
    },
    emailErrors() {
      const errors: string[] = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push(this.$i18n.t('email_valid'))
      !this.$v.email.required && errors.push(this.$i18n.t('email_required'))
      return errors
    },
  },

  methods: {
    displayErrors(errorMessage: string) {
      this.error = errorMessage
      this.alert = true
      window.setInterval(() => {
        this.alert = false
      }, 10000)
    },

    async register() {
      await this.$v.$touch()
      if (!this.$v.$invalid) {
        let [error] = await register(this.email, this.password, this.username)
        if (error) this.displayErrors(error.response.data.message)
        else {
          ;[error] = await login(this.email, this.password)
          if (error) this.displayErrors(error.response.data.message)
          else await this.$router.push(this.localePath('/'))
        }
      }
    },
  },
})
</script>

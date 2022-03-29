<template>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="4" log="4">
            <v-card color="surface">
              <v-img
                src="moutmout.png"
                alt="Memnix Logo"
                contain
                height="200"
              ></v-img>
              <v-card-title class="headline">
                {{ $t('welcome') }}
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    :label="$t('enter_mail')"
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
                    :label="$t('enter_password')"
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
                    class="mb-2 onsuccess--text"
                    type="submit"
                    color="primary"
                    x-large
                    block
                  >
                    {{ $t('login') }}</v-btn
                  >
                  <v-spacer></v-spacer>

                  {{ $t('no_account') }}
                  <v-btn
                    color="warning"
                    class="onsuccess--text"
                    nuxt
                    :to="localePath('/register')"
                    x-large
                    block
                  >
                    {{ $t('register') }}</v-btn
                  >
                </v-form>
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
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { login, user } from '~/api/user.api'

export default Vue.extend({
  mixins: [validationMixin],
  layout: 'login',
  middleware: 'guest',

  validations: {
    password: { required, maxLength: maxLength(20), minLength: minLength(8) },
    email: { required, email },
  },

  data(): {
    email: string
    password: string
    error: string
    alert: boolean
  } {
    return {
      email: '',
      password: '',
      error: 'An error occurred !',
      alert: false,
    }
  },

  computed: {
    passwordErrors() {
      const errors: string[] = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength &&
        errors.push( this.$i18n.t('password_max_len') )
      !this.$v.password.minLength &&
        errors.push(this.$i18n.t('password_min_len'))
      !this.$v.password.required && errors.push(this.$i18n.t('password_required'))
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

    async login() {
      await this.$v.$touch()
      if (!this.$v.$invalid) {
        let [error] = await login(this.email, this.password)
        if (error) this.displayErrors(error.response.data.message)
        else {
          ;[error] = await user()
          if (error) this.displayErrors(error.response.data.message)
          else await this.$router.push(this.localePath('/today'))
        }
      }
    },
  },
})
</script>

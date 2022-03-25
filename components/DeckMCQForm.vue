<template>
  <v-card flat>
    <v-card-text>
      <v-form @submit.prevent="validateAnswer">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="mcqName"
              name="mcqName"
              :error-messages="nameErrors"
              @input="$v.mcqName.$touch()"
              @blur="$v.mcqName.$touch()"
              label="Name *"
              required
              outlined
              shaped
              counter
              maxlength="200"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-switch
              v-model="mcqStandalone"
              name="mcqStandalone"
              label="Standalone"
            ></v-switch>
          </v-col>
        </v-row>

        <v-row v-if="requiresAnswers">
          <v-col cols="12">
            <v-text-field
              v-model="mcqAnswers"
              name="mcqAnswers"
              :error-messages="answersErrors"
              @input="$v.mcqAnswers.$touch()"
              @blur="$v.mcqAnswers.$touch()"
              label="Answers *"
              outlined
              shaped
              maxlength="500"
              :required="requiresAnswers"
            ></v-text-field>
          </v-col>
        </v-row>

        <small>*indicates required field</small>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info" text @click="closeMCQDialog"> Close </v-btn>
      <v-btn color="warning" text x-large @click="validateAnswer">
        {{ confirmButtonText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'DeckMCQForm',
  mixins: [validationMixin],

  props: {
    deckId: {
      type: Number,
      default: 0,
    },
    mcq: {
      type: Object,
      default() {},
    },
  },
  validations: {
    mcqName: { required, maxLength: maxLength(50), minLength: minLength(1) },
    mcqAnswers: { maxLength: maxLength(500), minLength: minLength(1) },
  },
  data() {
    return {
      mcqName: this.mcq?.mcq_name ?? '',
      mcqStandalone: this.mcq?.mcq_type===0 ?? false,
      mcqAnswers: this.mcq?.mcq_answers ?? '',
      error: 'An error occurred !',
    }
  },
  watch: {
    mcq(newVal) {
      this.mcqName = newVal.mcq_name ?? ''
      this.mcqStandalone = newVal.mcq_type===0 ?? false
      this.mcqAnswers = newVal.mcq_answers ?? ''
    },
  },
  computed: {
    requiresAnswers() {
      return this.mcqStandalone ?? true
    },
    confirmButtonText() {
      if (this.mcq) {
        return 'Edit'
      } else {
        return 'Create'
      }
    },

    nameErrors() {
      const errors = []
      if (!this.$v.mcqName.$dirty) return errors
      !this.$v.mcqName.maxLength &&
        errors.push('Name must be at most 50 characters long')
      !this.$v.mcqName.minLength &&
        errors.push('Name must be at least 1 character long')
      !this.$v.mcqName.required && errors.push('Name is required.')
      return errors
    },
    answersErrors() {
      const errors = []
      if (!this.$v.mcqAnswers.$dirty) return errors
      !this.$v.mcqAnswers.maxLength &&
        errors.push('Answers must be at most 500 characters long')
      !this.$v.mcqAnswers.minLength &&
        errors.push('Answers must be at least 1 character long')
      !this.$v.mcqAnswers.required && errors.push('Answers is required.')
      return errors
    },
  },
  methods: {
    async createMCQ() {
      const data = {
        mcq_name: this.mcqName,
        deck_id: this.deckId,
        mcq_type: this.mcqStandalone ? 0 : 1,
        mcq_answers: this.mcqAnswers,
      }
      try {
        if (this.mcq) {
          await this.$axios
            .put(
              `https://api.memnix.app/api/v1/mcqs/${this.mcq.ID}/edit`,
              data,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
            )
            .then(() => {
              this.createMCQSave()
            })
        } else {
          await this.$axios.post(
            `https://api.memnix.app/api/v1/mcqs/new`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          )
            .then(() => {
            this.createMCQSave()
          })
        }
      } catch (e) {
        this.error = e.res.data.message
      }
    },

    validateAnswer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.createMCQ()
      }
    },
    closeMCQDialog() {
      this.$emit('closeMCQDialog')
    },
    createMCQSave() {
      this.$emit('createMCQSave')
    },
  },
}
</script>

<style scoped></style>

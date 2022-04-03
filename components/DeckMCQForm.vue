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
              :label="$i18n.t('name') + '*'"
              required
              outlined
              shaped
              counter
              maxlength="200"
              @input="$v.mcqName.$touch()"
              @blur="$v.mcqName.$touch()"
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
              :label="$i18n.t('answers') + '*'"
              outlined
              shaped
              maxlength="500"
              :required="requiresAnswers"
              @input="$v.mcqAnswers.$touch()"
              @blur="$v.mcqAnswers.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>

        <small>{{$t('required_field')}}</small>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="onbackground" text @click="closeMCQDialog"> {{ $t('close') }} </v-btn>
      <v-btn color="primary" text x-large @click="validateAnswer">
        {{ confirmButtonText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { validationMixin } from 'vuelidate'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import {Mcq, McqType} from "~/types/types";
import {createMCQAPI, editMCQAPI} from "~/api/card.api";

export default Vue.extend({
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

  data(): {
    mcqName: Mcq['mcq_name'],
    mcqStandalone: boolean,
    mcqAnswers: Mcq['mcq_answers'],
    error: string
  } {
    return {
      mcqName: this.mcq?.mcq_name ?? '',
      mcqStandalone: this.mcq?.mcq_type===McqType.Standalone ?? false,
      mcqAnswers: this.mcq?.mcq_answers ?? '',
      error: 'An error occurred !',
    }
  },

  computed: {
    requiresAnswers() {
      return this.mcqStandalone ?? true
    },
    confirmButtonText() {
      return this.mcq ? this.$i18n.t('edit') : this.$i18n.t('create');
    },

    nameErrors() {
      const errors: string[] = []
      if (!this.$v.mcqName.$dirty) return errors
      !this.$v.mcqName.maxLength &&
        errors.push(this.$i18n.t('mcq_name_max_len'))
      !this.$v.mcqName.minLength &&
        errors.push(this.$i18n.t('mcq_name_min_len'))
      !this.$v.mcqName.required && errors.push(this.$i18n.t('mcq_name_required'))
      return errors
    },
    answersErrors() {
      const errors: string[] = []
      if (!this.$v.mcqAnswers.$dirty) return errors
      !this.$v.mcqAnswers.maxLength &&
        errors.push(this.$i18n.t('answers_max_len'))
      !this.$v.mcqAnswers.minLength &&
        errors.push(this.$i18n.t('answers_min_len'))
      !this.$v.mcqAnswers.required && errors.push(this.$i18n.t('answers_required'))
      return errors
    },
  },
  watch: {
    mcq(newVal) {
      this.mcqName = newVal.mcq_name ?? ''
      this.mcqStandalone = newVal.mcq_type===McqType.Standalone ?? false
      this.mcqAnswers = newVal.mcq_answers ?? ''
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

        if (this.mcq) {
          const [error] = await editMCQAPI(data, this.mcq?.ID)
          if (error) this.error = error.res.data.message
          else this.createMCQSave()

        } else {
          const [error] = await createMCQAPI(data)
          if (error) this.error = error.res.data.message
          else this.createMCQSave()
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
})
</script>

<style scoped></style>

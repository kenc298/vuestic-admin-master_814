<template>
  <form @submit.prevent="signup()">

    <va-input
      v-model="name"
      type="name"
      id="name"
      required="required"
      :label="$t('auth.name')"
      :error="!!nameErrors.length"
      :error-messages="nameErrors"
    />

    <va-input
      v-model="email"
      type="email"
      id="email"
      required="required"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="devID"
      type="devID"
      id="devID"
      required="required"
      :label="$t('auth.devID')"
      :error="!!devIDErrors.length"
      :error-messages="devIDErrors"
    />

    <va-select
      v-model="gender"
      type="gender"
      id="gender"
      required="gender"
      :options= "options"
      :label="$t('auth.gender')"
      :error="!!genderErrors.length"
      :error-messages="genderErrors"
    />
    <va-input
      v-model="password"
      type="password"
      id="password"
      required="required"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :errorMessages="agreedToTermsErrors"
      >
        <template slot="label">
          {{ $t('auth.agree') }}
          <span class="link">{{ $t('auth.termsOfUse') }}</span>
        </template>
      </va-checkbox>
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">
        {{$t('auth.recover_password')}}
      </router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'elder',
  data () {
    return {
      options: ['Female', 'Male'],
      email: '',
      devID: '',
      name: '',
      birth: '',
      gender: '',
      password: '',
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],
      nameErrors: [],
      devIDErrors: [],
      genderErrors: [],
      agreedToTermsErrors: [],
    }
  },
  methods: {
    signup () {
      const { email, devID, name, birth, gender, password } = this
      const data = {
        email: email,
        password: password,
        devID: devID,
        name: name,
        birth: birth,
        gender: gender,
      }
      axios.post('https://reqres.in/api/register', data)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },

  },
  computed: {
    formReady () {
      return !(this.emailErrors.length || this.passwordErrors.length || this.nameErrors.length || this.devIDErrors.length || this.genderErrors.length || this.birthErrors.length || this.agreedToTermsErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>

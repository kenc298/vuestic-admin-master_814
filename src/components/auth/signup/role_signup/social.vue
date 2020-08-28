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

    <va-select
      v-model="workingcenter"
      type="workingcenter"
      id="workingcenter"
      required="required"
      :options="options"
      :label="$t('auth.workingcenter')"
      :error="!!workingcenterErrors.length"
      :error-messages="workingcenterErrors"
    />

    <va-input
      v-model="code"
      type= "code"
      id= "code"
      required= "required"
      :label="$t('auth.code')"
      :error="!!codeErrors.length"
      :error-messages="codeErrors"
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
  name: 'social',
  data () {
    return {
      options: ['center A', 'center B'],
      name: '',
      email: '',
      password: '',
      code: '',
      workingcenter: '',
      agreedToTerms: false,
      nameErrors: [],
      emailErrors: [],
      passwordErrors: [],
      codeErrors: [],
      workingcenterErrors: [],
      agreedToTermsErrors: [],
    }
  },
  methods: {
    signup () {
      const { email, password, name, code, workingcenter } = this
      const data = {
        email: email,
        password: password,
        name: name,
        code: code,
        workingcenter: workingcenter,
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
      return !(this.emailErrors.length || this.passwordErrors.length || this.workingcenterErrors.length || this.codeErrors.length || this.nameErrors.length || this.agreedToTermsErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>

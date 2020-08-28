<template>
  <form @submit.prevent="login">
    <va-input
      v-model="auth.email"
      type="email"
      id="email"
      required="required"
      :label="$t('auth.email')"
      :class="{ 'is-invalid': submitted && !auth.email }"
      :error-messages="error"
    />

    <va-input
      v-model="auth.password"
      type="password"
      id="password"
      required="required"
      :label="$t('auth.password')"
      :class="{ 'is-invalid': submitted && !auth.password }"
    />
    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="$t('auth.keep_logged_in')"/>
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">{{$t('auth.recover_password')}}</router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  name: 'login',
  data () {
    return {
      keepLoggedIn: false,
      error: [],
      auth: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
    submitted () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return false
      }
    },
    loginSuccessful (req) {
      if (req.data.error) {
        this.loginFailed()
        console.log(req.data)
        return
      }
      console.log(req.data)
      localStorage.setItem('token', req.data.token)
      this.error = false
      this.$router.replace(this.$route.query.redirect || '/')
    },
    loginFailed () {
      this.error = 'Login failed!'
      localStorage.removeItem('token')
    },
    login () {
      const data = {
        username: this.auth.email,
        password: this.auth.password,
      }
      Cookies.set('username', this.auth.email)
      this.axios.post('http://192.168.10.52:5000/api/login', data).then(res => {
        if (res.data.token) {
          this.loginSuccessful(res)
        }
      }).catch(() => {
        this.loginFailed()
      })
    },
  },
}
</script>
<style lang="scss">
</style>

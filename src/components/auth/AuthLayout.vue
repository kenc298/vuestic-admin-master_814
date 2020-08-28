<template>
  <div class="auth-layout row align-content--center">
    <div class="flex xs12 pa-3 flex-center">
      <router-link
        class=" flex-center"
        to="/"
        :style="{color: this.$themes.dark}"
      >
        <p class="h1-font"> ICS user login</p>
      </router-link>
    </div>

    <div class="flex xs12 pa-3">
      <div class="d-flex justify--center">
        <va-card class="auth-layout__card">
          <va-tabs
            v-model="tabIndex"
            center
          >
            <va-tab>{{ $t('auth.login') }}</va-tab>
            <va-tab>{{ $t('auth.createNewAccount') }}</va-tab>
          </va-tabs>
          <va-separator/>
          <div class="pa-3">
            <router-view/>
          </div>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import VaIconVuestic from '../../iconset/VaIconVuestic'

const tabs = [
  'login',
  'signup',
]

export default {
  name: 'AuthLayout',
  components: { VaIconVuestic },
  data () {
    return {
      selectedTabIndex: 0,
      tabTitles: ['login', 'createNewAccount'],
    }
  },
  computed: {
    tabIndex: {
      set (tabIndex) {
        this.$router.push({ name: tabs[tabIndex] })
      },
      get () {
        return tabs.indexOf(this.$route.name)
      },
    },
  },
}
</script>

<style lang="scss">
.h1-font {
  font-size: 78px;
  text-align: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: bold;
}

.auth-layout {
  min-height: 100vh;
  background-image: linear-gradient(217deg, #5e72eb, #ff9190);

  &__card {
    width: 100%;
    max-width: 600px;
  }

  &__options {
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }
}

</style>

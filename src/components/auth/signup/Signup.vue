<template>
  <div class=" row align-content--top">
    <div class="flex xs12 pa-3">
      <div class="d-flex justify--center">
        <va-card class="auth-layout__card">
          <va-tabs
            v-model="tabIndex"
            center
          >
            <va-tab>{{ $t('auth.elder') }}</va-tab>
            <va-tab>{{ $t('auth.social_service') }}</va-tab>
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

const tabs = [
  'elder',
  'social_service',
]

export default {
  name: 'Signup',
  // components: { VaIconVuestic },
  data () {
    return {
      selectedTabIndex: 0,
      tabTitles: ['elder', 'social_service'],
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
  background-image: #ffffff;

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

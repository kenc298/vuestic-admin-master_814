<template>
  <div class="dashboard">
    <div class="h1-font">
      Welcome {{ this.showUserName }}! <br> How did your {{ time }} go?
      <div class="h2-font">
        Build your own lifestyle, today.
      </div>
    </div>
    <dashboard-info-block />
    <br>
    <dashboard-charts />
    <div class="row row-equal">
      <div class="flex xs12 lg6">
        <dashboard-tabs @submit="addAddressToMap"/>
      </div>
      <div class="flex xs12 lg6">
        <dashboard-map ref="dashboardMap"/>
      </div>
    </div>
    <div class="row">
      <div class="flex xs12">
        <dashboard-table />
      </div>
    </div>

  </div>
</template>

<script>
import DashboardInfoBlock from './DashboardInfoBlock'
import DashboardCharts from './DashboardCharts'
import DashboardTable from './DashboardTable'
import DashboardTabs from './DashboardTabs'
import DashboardMap from './DashboardMap'
import Cookies from 'js-cookie'

export default {
  name: 'dashboard',
  data: function () {
    return {
      username: this.showUserName,
      time: 'day',
    }
  },

  computed: {
    showUserName: {
      get () {
        console.log(Cookies.get('username'))
        var NAME = Cookies.get('username')
        return NAME.substring(0, NAME.lastIndexOf('@'))
      },
    },
  },
  components: {
    DashboardInfoBlock,
    DashboardCharts,
    DashboardTable,
    DashboardTabs,
    DashboardMap,
  },
  methods: {
    addAddressToMap ({ city, country }) {
      this.$refs.dashboardMap.addAddress({ city: city.text, country })
    },

  },
}
</script>

<style lang="scss">
  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }

  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
    }
  }

  .h1-font {
    font-size: 110px;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-style: bold;
  }

  .h2-font {
    font-size: 40px;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-style: oblique;
  }
</style>

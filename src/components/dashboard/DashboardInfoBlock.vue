/* eslint-disable camelcase */
<template>
  <div class="row justify-content-center">
    <div class="flex xl12 xs12">
      <div class="row justify--content-around">
        <div
          class="flex xs2 sm2 md2 xl2 justify-content-center"
        >
          <va-card class="flex xs12 sm12 md12 lg12 xl12" :color="this.$themes.danger">
            <p class="display-1 justify-content-center" style="color: white;">{{ vital[0].pulse }}</p>
            <p>{{"Pulse"}}</p>
          </va-card>
        </div>
        <div
          class="flex xs2 sm2 md2 xl2 justify-content-center"
        >
          <va-card class="flex xs12 sm12 md12 lg12 xl12" :color="this.$themes.primary">
            <p class="display-1 justify-content-center" style="color: white;">{{ vital[0].temp }}</p>
            <p>{{"Temperature"}}</p>
          </va-card>
        </div>
        <div
          class="flex xs2 sm2 md2 xl2 justify-content-center"
        >
          <va-card class="flex xs12 sm12 md12 lg12 xl12" :color="this.$themes.success">
            <p class="display-1 justify-content-center" style="color: white;">{{ vital[0].humid + '%' }}</p>
            <p>{{"Humidity"}}</p>
          </va-card>
        </div>
        <div
          class="flex xs2 sm2 md2 xl2 justify-content-center"
        >
          <va-card class="flex xs12 sm12 md12 lg12 xl12" :color="this.$themes.info">
            <p class="display-1 justify-content-center" style="color: white;">{{ vital[0].heatExp }}</p>
            <p>{{"Heat Level"}}</p>
          </va-card>
        </div>
        <div
          class="flex xs2 sm2 md2 xl2 justify-content-center"
        >
          <va-card class="flex xs12 sm12 md12 lg12 xl12" :color="this.$themes.primary">
            <p class="display-1 justify-content-center" style="color: white;">{{ vital[0].envLvl }}</p>
            <p>{{"Env Level"}}</p>
          </va-card>
        </div>
        <div
          class="flex xs2 sm2 md2 xl2 justify-content-center"
        >
          <Verif_code/>

        </div>
      </div>
      <div class="row justify-content-between">
        <div class="flex xs12 md6 xl6">
          <va-card stripe="primary">
            <div class="row row-separated">
              <div class="flex xs4 md4 lg4 xl7">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.primary}"> {{ step['totalsteps'] }} </p>
                <p class="text--center mb-1">{{$t('dashboard.info.steps')}}</p>
              </div>
              <div class="flex xs4 md4 lg4 xl5">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.warning}">{{ step['totalcalory'] }}</p>
                <p class="text--center mb-1">{{$t('dashboard.info.calories')}}</p>
              </div>
            </div>
          </va-card>
        </div>
        <div class="flex xs12 md6 xl6">
          <va-card stripe="primary">
            <div class="row row-separated">
              <div class="flex xs4 md4 lg4">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.primary}">{{ 1.42 }}</p>
                <p class="text--center mb-1">{{$t('dashboard.info.distance')}}</p>
              </div>
              <div class="flex xs4 md4 lg4">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.info}">{{ 5 }}</p>
                <p class="text--center no-wrap mb-1">{{$t('dashboard.info.elevation')}}</p>
              </div>
              <div class="flex xs4 md4 lg4">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.warning}">{{ 89 }}</p>
                <p class="text--center mb-1">{{$t('dashboard.info.pulse')}}</p>
              </div>
            </div>
          </va-card>
        </div>
      </div>
    </div>
    <!-- <div class="flex xl12 xs12">
      <va-card class="flex xs12 sm12 md12 lg12 xl12 justify-content-center">
        <va-icon
          :name="entyoi,entyoi-flag"
          color="info"
          rotation="45"
          size="60"
        />
        You had been sitting for too long</va-card>
    </div> -->
  </div>
</template>

<script>
import Verif_code from './verif_code'
import { store } from '../../store/index'
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardInfoBlock',
  data () {
    return {
      infoTiles: [{
        color: 'primary',
        // hiiiiiiiiiiiiiiiiiii
        // eslint-disable-next-line no-undef
        value: '',
        text: 'Pulse',
        icon: ''
      },
      {
        color: 'warning',
        value: '30',
        text: 'Humidity',
        icon: ''
      },
      {
        color: 'success',
        value: '30',
        text: 'Heat Level',
        icon: ''
      },
      {
        color: 'info',
        value: '30',
        text: 'Env Level',
        icon: ''
      },
      {
        color: 'primary',
        value: '70%',
        text: 'Battery Level',
        icon: ''
      }],
      vital: [],
      step: [],
      non_step: {
        totalsteps: 'N/A',
        totalcalory: 'N/A'
      },
      item: {
        envLvl: 'N/A',
        heatExp: 'N/A',
        humid: 'N/A',
        pulse: 'N/A',
        temp: 'N/A',
        totalsteps: 'N/A',
        totalcalory: 'N/A',
        distance: 'N/A',
        elevation: 'N/A'
      },

      modal: false,
      currImage: 0,
      warning_text: 'You have been sitting for too long'
    }
  },
  components: {
    Verif_code
  },
  mounted () {
    this.axios.post('http://192.168.10.52:5000/api/getvital', {
      user_id: '742b62cdef85',
      starttime: '2020-02-1',
      endtime: '2020-03-20'
    })
      .then(response => {
        // console.log(response.data)
        if (!response.status) {
          console.log('fail to connect')
          this.vital.push(this.item)
        } else {
          if (response.data.data_size !== 0) {
            this.vital = response.data.data
            console.log(this.vital)
          } else {
            this.vital.push(this.item)
            // console.log(this.vital)
          }
        }
      })
      .catch((error) => {
        this.vital.push(this.item)
        console.log(error)
        // console.log(this.vital)
      })

    this.axios.post('http://192.168.10.52:5000/api/getstep', {
      user_id: 'e47fb2f7b8ba',
      time: '2020-01-32'
    })
      .then(response => {
        // console.log(response.data)
        if (!response.status) {
          console.log('fail to connect')
          this.step = this.non_step
        } else {
          if (response.data[5] !== 0) {
            console.log(response.data)

            this.step = response.data[3]
            console.log(this.step)
          } else {
            this.step = this.non_step
            console.log(this.step)
          }
        }
      })
      .catch((error) => {
        this.step = this.non_step
        console.log(error)
        // console.log(this.vital)
      })
  },
  computed: { // Vuex 组件之间传值
    user_phone: state => store.state.user_phone // 获取Input_phone组件的传输值
    // user_verif:state=>store.state.user_verif,// 获取输入的验证码组件的传输值
    // verif_code:state=>store.state.verif_code, // 获取发送的验证码组件的传输值
  },
  methods: {
    showModal () {
      this.modal = true
    },
    showPrevImage () {
      this.currImage = !this.currImage ? this.images.length - 1 : this.currImage - 1
    },
    showNextImage () {
      this.currImage = this.currImage === this.images.length - 1 ? 0 : this.currImage + 1
    }
  }
}
</script>

<style lang="scss">
  .row-separated {
    .flex + .flex {
      border-left: 1px solid #e3eaeb;
    }

    @include media-breakpoint-down(xs) {
      p:not(.display-2) {
        font-size: 0.875rem;
      }
    }
  }

  .dashboard {
    .va-card__header--over {
      @include media-breakpoint-up(md) {
        padding-top: 0 !important;
      }
    }

    .va-card__image {
      @include media-breakpoint-up(md) {
        padding-bottom: 0 !important;
      }
    }
  }

  .pl-4 {
    padding-left: 300px;
  }

  .fontSize {
    font-size: 15px;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-style: bold;
  }
</style>

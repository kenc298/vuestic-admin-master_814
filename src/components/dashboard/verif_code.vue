/* eslint-disable camelcase */
/* eslint-disable camelcase */
<template>
  <va-button large color="#FF0900" class="flex xs12 sm12 md12 lg12 xl12 justify-content-end" @click="sendMsg" @disabled="isSend"><br> {{ $t('Emergency') }}<br><br></va-button>
</template>

<script>
// import Input_phone from  "./input_phone";
import store from '../store/index'
// eslint-disable-next-line no-unused-vars
import qs from 'qs'
export default {
  name: 'verif_code',
  data () {
    return {
      verif_code: '获取验证码',
      timer: null,
      user_verif: '',
      url: '/apiss/',
      verif: false,
      code: '',
      isSend: true,
      label_verif: false,
    }
  },
  computed: { // Vuex 组件之间传值
    user_phone: state => store.state.user_phone, // 获取Input_phone组件的传输值  //have to be changed!
  },
  methods: {
    verif_show () { // 不显示验证图标和规划
      this.verif = true
      this.label_verif = true
    },
    verif_display () { // 恢复初始状态
      this.verif = false
      if (this.user_verif === '') {
        this.label_verif = false
      } else {
        this.label_verif = true
      }
    },
    sendMsg () { // 发送随机验证码
      const count = 60
      let times = 60
      if (!this.timer) {
        this.isSend = false// 按钮禁用
        // this.code = this.random_code()// 调用随机生成随机验证码的方法
        this.send_note(this.user_phone)// 调用发送短信的方法
        this.timer = setInterval(() => { // 倒计时;
          if (times > 0 && times <= count) {
            this.verif_code = 'resend after ' + times-- + 's'
          } else {
            this.isSend = true// 按钮可用
            this.verif_code = 'Emergency'
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    send_note (tel) { // 发送短信模板
      const text = '注意！有电话号码为: ' + tel + ' 的老人按下按钮'// 短信内容模板，已经在sms平台绑定此内容，所以会比普通的更快到达用户手机。
      const param = new URLSearchParams()
      param.append('Uid', 'ahhou')
      param.append('Key', 'd41d8cd98f00b204e980')
      param.append('smsMob', tel)
      param.append('smsText', text)
      this.$http.post(this.url, param, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }).then(function (response) {
        console.log(response)
      },
      )
    },
    verif_Message () { // Vuex 将user_verif的状态保存到创库中
      store.commit('verif_Message', this.user_phone, this.code)
    },
  },
}
</script>
<style scoped>
</style>

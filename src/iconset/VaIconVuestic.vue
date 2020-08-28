<template>
  <div id = 'app'>
    <img v-bind:src = "imgSrc" />
  </div>
</template>
<script>
import Vue from 'vue'

var vm = new Vue({
  el: '#app',
  data: {
    imgSrc: 'hohcs.png',
  },
})
export default {
  name: 'VaIconVuestic',
}
</script>
<style lang="scss">
</style>

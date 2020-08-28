<template>
  <div class="leaflet-map fill-height">
  </div>
</template>

<script>
import 'leaflet-map'
import * as Leaflet from 'leaflet'

export default {
  name: 'leaflet-map',

  mounted () {
    //    L.Icon.Default.imagePath = 'assets/vendor/leaflet' TODO: make it work with webpack
    Leaflet.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.0.3/dist/images'

    const map = Leaflet.map(this.$el).setView([22.28588, 114.1559423], 20)

    Leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    Leaflet.marker([22.28588, 114.1559423]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup()
  },
}
</script>

<style lang="scss">
@import "~leaflet/dist/leaflet.css";
</style>

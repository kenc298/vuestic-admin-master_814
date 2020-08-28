<!--<template>
  <div class="yandex-maps-page">
    <div class="row">
      <div class="flex md12 xs12">
        <va-card
          class="yandex-maps-page__widget"
          title="Yandex Maps"
        >
          <yandex-map
            :use-object-manager:="true"
            :coords="[22.28588,114.1559423]"
            :zoom="16.8"
            style="width: 100%; height: 65vh;"
            :behaviors="['default']"
            :controls="['trafficControl','zoomControl', 'geolocationControl','fullscreenControl', 'searchControl']"
            :placemarks="placemarks"
            :map-type="roadmap">
          </yandex-map>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>

import { yandexMap } from 'vue-yandex-maps'

export default {
  name: 'yandex-maps-page',
  components: {
    yandexMap,
  },
  data () {
    return {
      placemarks: [
        {
          coords: [22.28588, 114.1559423],
          properties: {},
          options: {},
          clusterName: '1',
          balloonTemplate: '<div>"Your custom template"</div>',
          callbacks: {
            click () {
            },
          },
        },
      ],
    }
  },
}
</script>
-->
<template>
  <div class="leaflet-maps-page">
    <div class="row">
      <div class="flex md12 xs12">
        <va-card
          class="leaflet-maps-page__widget"
          title="Leaflet Maps"
        >
          <leaflet-map style="height: 65vh;" />
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import LeafletMap from '../maps/leaflet-maps/LeafletMap'

export default {
  name: 'leaflet-maps-page',
  components: {
    LeafletMap,
  },
}
</script>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import { Map, AttributionControl, ScaleControl, NavigationControl, FullscreenControl } from "maplibre-gl";

// center 58.373553624624975, 26.71604095658988
// 26.72508,58.38062
// zoom 13

const center = ref([26.71604095658988, 58.373553624624975]);
const zoom = ref(13);

const map_ref = ref(null);

const attribution = new AttributionControl({ compact: false, customAttribution: "Map data: Estonian Land Board 2023" });
const nav = new NavigationControl();

onMounted(() => {

  const map = new Map({
    container: "map",
    style: "./mvt_joonatan.json",
    center: center.value,
    zoom: zoom.value,
    attributionControl: false,
  });

  map.addControl(new AttributionControl({ compact: false, customAttribution: "Map data: Estonian Land Board 2023" }));
  map.addControl(new ScaleControl({ maxWidth: 100, unit: "metric" }));
  map.addControl(nav, "top-left");
  // map.addControl(new FullscreenControl({ container: document.querySelector("#mapcontainer") }), 'top-right');
  map.addControl(new FullscreenControl(), 'top-right');

  map_ref.value = map;
});

</script>

<template>
  <div id="mapcontainer">
    <div id="map"></div>

  </div>
</template>

<style scoped>
#mapcontainer {
  height: 800px;
}

#map {
  width: 100%;
  height: 800px;
}
</style>

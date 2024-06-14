<script setup lang="ts">

import { Map, View } from "ol";
import { FullScreen, ScaleLine, Control, Zoom, defaults as defaultControls } from "ol/control";
import { Attribution } from "ol/control";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import { TileWMS } from "ol/source";
import { ImageWMS } from 'ol/source';
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import { ZoomSlider } from 'ol/control';

import { onMounted, ref } from "vue";

// center 58.373553624624975, 26.71604095658988
// 26.72508,58.38062
// zoom 13

const center = ref([26.71604095658988, 58.373553624624975]);
const zoom = ref(13);

// ol source WMS setup:
const wms_source = new TileWMS({
  url: "https://maps.landscape-geoinformatics.org/geoserver/geodb/wms",
  params: {
    LAYERS: "geodb:ETAK_dark",
    TILED: true,
  },
  serverType: "geoserver",
  transition: 0,
});

// ol map setup
const labels_wms_source = new ImageWMS({
  url: "https://maps.landscape-geoinformatics.org/geoserver/geodb/wms",
  params: {
    LAYERS: "geodb:ETAK_dark_labels",
  },
  serverType: "geoserver",
  ratio: 1,
  attributions: '<a href="https://geoportaal.maaamet.ee/est/Ruumiandmed/Eesti-topograafia-andmekogu/Laadi-ETAK-andmed-alla-p609.html" target="_blank">Map data: Estonian Land Board 2023</a> ',
});

// map as ref
const map_ref = ref(null);

class LabelSwitchControl extends Control {
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = 'L?';

    const element = document.createElement('div');
    element.className = 'label-switch ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.handleLabelSwitch.bind(this), false);
  }

  handleLabelSwitch() {
    const map = this.getMap();
    const layers = map.getLayers();
    const labels_layer = layers.item(1);
    labels_layer.setVisible(!labels_layer.getVisible());
  }
}

class ResetZoomControl extends Control {
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = 'O';

    const element = document.createElement('div');
    element.className = 'reset-zoom ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.handleResetZoom.bind(this), false);
  }

  handleResetZoom() {
    this.getMap().getView().setCenter(fromLonLat(center.value));
    this.getMap().getView().setZoom(zoom.value);
  }
}

const scale_control = new ScaleLine({
  units: 'metric',
  bar: false,
  minWidth: 140,
});

onMounted(() => {

  const map = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: wms_source,
      }),
      new ImageLayer({
        source: labels_wms_source,
      }),
    ],
    view: new View({
      center: fromLonLat(center.value),
      zoom: zoom.value,
    }),
    controls: defaultControls().extend([
      new ZoomSlider(),
      new Zoom(),
      new ResetZoomControl(),
      new LabelSwitchControl(),
      scale_control,
      new FullScreen()
    ]),
  });

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

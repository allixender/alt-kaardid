import { createApp } from 'vue'

import { createMemoryHistory, createRouter } from 'vue-router'

import OSMView from './OSMView.vue'
import ETAKDarkView from './ETAKDarkView.vue'
import ETAKLightView from './ETAKLightView.vue'
import MVTView from './MVTView.vue'

const routes = [
  { path: '/', component: OSMView },
  { path: '/dark', component: ETAKDarkView },
  { path: '/light', component: ETAKLightView },
  { path: '/mvt', component: MVTView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

import './style.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')

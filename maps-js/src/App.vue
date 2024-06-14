<script setup lang="ts">
import router from 'vue-router';

</script>

<template>
  <div id="container">
    <router-view></router-view>

  </div>
  <div id="container">
    <RouterLink to="/" class="nav-button">OSM</RouterLink>
    <RouterLink to="/dark" class="nav-button">Dark</RouterLink>
    <RouterLink to="/light" class="nav-button">Light</RouterLink>
    <RouterLink to="/mvt" class="nav-button">MVT</RouterLink>
  </div>
</template>

<style scoped></style>

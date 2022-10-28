<script setup lang="ts">
import Location from './components/Location.vue'
import Weather from './components/Weather.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Location />
    </div>
  </header>
  <main>
    <Weather lat="37.82" lon="-122.23" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  --background-color: dimgray;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

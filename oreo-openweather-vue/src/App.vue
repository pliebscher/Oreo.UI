<script setup lang="ts">
import Location from './components/Location.vue'
import Weather from './components/Weather.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Location msg="You did it!" />
    </div>
  </header>
  <main>
    <Weather/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  --background-color: dimgray;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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
    border: 2px;
    border-color: aliceblue;
  }
}
</style>

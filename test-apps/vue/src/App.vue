<script setup>
import { AutoComplete, Todos, Greet } from '@mitosis-demo/library-vue'
</script>

<template>
  <div>
    <div>Welcome to Vue.</div>
    <AutoComplete />
    <Todos />
    <Greet />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

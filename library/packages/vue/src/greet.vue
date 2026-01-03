<template>
  <div>
    <input
      placeholder="Your name"
      :value="name"
      @change="async (event) => (name = event.target.value)"
    />
    <div>Hello, {{ name }}!</div>
    <div>3</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
</script>
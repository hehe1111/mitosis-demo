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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "greet",

  data() {
    return { name: "" };
  },
});
</script>
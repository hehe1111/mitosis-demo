<template>
  <template v-if="type === 'primary' || !type">
    <button class="button" @click="async (event) => onClick()"><slot /></button>
  </template>

  <template v-if="type === 'default'">
    <button class="button-2" @click="async (event) => onClick()">
      <slot />
    </button>
  </template>

  <template v-if="type === 'danger'">
    <button class="button-3" @click="async (event) => onClick()">
      <slot />
    </button>
  </template>

  <template v-if="type === 'warning'">
    <button class="button-4" @click="async (event) => onClick()">
      <slot />
    </button>
  </template>
</template>

<script setup lang="ts">
export type ButtonProps = {
  type?: "primary" | "default" | "danger" | "warning";
  onClick?: () => void;
  children: any;
};

const props = defineProps<ButtonProps>();
</script>

<style scoped>
.button {
  padding: 4px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s;
  background-color: #1890ff;
  color: #fff;
  border: none;
}
.button-2 {
  padding: 4px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.85);
  border: 1px solid #d9d9d9;
}
.button-3 {
  padding: 4px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
}
.button-4 {
  padding: 4px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s;
  background-color: #faad14;
  color: #fff;
  border: none;
}
</style>
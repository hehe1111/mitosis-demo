<script setup>
import { ref } from 'vue';
import { Button, Modal } from '@mitosis-demo/library-vue';

const modalVisible = ref(false);

function openModal() {
  modalVisible.value = true;
}

function handleCancel() {
  modalVisible.value = false;
}

function handleOk() {
  console.log('Confirmed');
  modalVisible.value = false;
}
</script>

<template>
  <div style="padding: 20px">
    <h1>Button Components</h1>

    <div style="margin-bottom: 20px">
      <h2>Button Types</h2>
      <div style="display: flex; gap: 10px; margin-bottom: 10px">
        <Button type="primary" @click="console.log('primary clicked')">Primary</Button>
        <Button @click="console.log('default clicked')">Default</Button>
        <Button type="danger" @click="console.log('danger clicked')">Danger</Button>
        <Button type="warning" @click="console.log('warning clicked')">Warning</Button>
      </div>
    </div>

    <div>
      <h2>Modal Component</h2>
      <Button @click="openModal">Open Modal</Button>

      <Modal
        v-model:visible="modalVisible"
        title="Example Modal"
        cancelText="Cancel"
        okText="Confirm"
        @cancel="handleCancel"
        @ok="handleOk"
      >
        <p>This is the modal content.</p>
        <p>You can put any content here.</p>
      </Modal>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}
</style>

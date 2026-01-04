<script setup>
import { ref } from 'vue';
import { AutoComplete, Todos, Greet, Button, Modal } from '@mitosis-demo/library-vue';

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
    <h1>Welcome to Vue.</h1>
    <AutoComplete />
    <Todos />
    <Greet />

    <h2>Button Components</h2>

    <div style="margin-bottom: 20px">
      <h2>Button Types</h2>
      <div style="display: flex; gap: 10px; margin-bottom: 10px">
        <Button type="primary" :onClick="() => console.log('primary clicked')">Primary</Button>
        <Button :onClick="() => console.log('default clicked')">Default</Button>
        <Button type="danger" :onClick="() => console.log('danger clicked')">Danger</Button>
        <Button type="warning" :onClick="() => console.log('warning clicked')">Warning</Button>
      </div>
    </div>

    <div>
      <h2>Modal Component</h2>
      <Button :onClick="openModal">Open Modal</Button>

      <Modal :visible="modalVisible" :closable="true" title="Example Modal" cancelText="Cancel" okText="Confirm"
        :onCancel="handleCancel" :onOk="handleOk">
        <p>This is the modal content.</p>
        <p>You can put any content here.</p>
      </Modal>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>

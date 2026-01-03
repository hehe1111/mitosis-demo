<template>
  <template v-if="localVisible">
    <div class="div" @click="async (event) => handleMaskClick()">
      <div class="div-2" @click="async (e) => e.stopPropagation()">
        <div class="div-3">
          <div class="div-4">{{ title || "弹框标题" }}</div>
          <template v-if="closable !== false">
            <span class="span" @click="async (event) => handleClose()">{{
              closeNode || "关闭"
            }}</span>
          </template>
        </div>
        <div class="div-5"><slot /></div>
        <template v-if="footer !== null && footer !== undefined">
          <div class="div-6">{{ footer }}</div>
        </template>

        <template v-if="footer === undefined">
          <div class="div-7">
            <Button type="default" :onClick="(event) => handleClose()">{{
              cancelText || "取消"
            }}</Button
            ><Button :onClick="(event) => handleOk()">{{
              okText || "确定"
            }}</Button>
          </div>
        </template>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import Button from "../button/button.vue";

export type ModalProps = {
  visible: boolean;
  title?: string;
  closable?: boolean | ((...args: any[]) => any);
  closeNode?: string | any;
  footer?: string | null | any;
  cancelText?: string;
  okText?: string;
  width?: string | number;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  children?: any;
  afterClose?: () => void;
  onCancel?: () => void;
  onOk?: () => void;
};

const props = defineProps<ModalProps>();
const localVisible = ref(props.visible);

watch(
  () => [props.visible],
  () => {
    localVisible.value = props.visible;
  },
  { immediate: true }
);
function handleClose() {
  localVisible.value = false;
  props.onCancel?.();
  props.afterClose?.();
}
function handleOk() {
  props.onOk?.();
}
function handleMaskClick() {
  if (props.maskClosable !== false) {
    handleClose();
  }
}
</script>

<style scoped>
.div {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}
.div-2 {
  width: 520px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}
.div-3 {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.div-4 {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}
.span {
  cursor: pointer;
  font-size: 16px;
  color: #999;
  transition: color 0.2s;
}
.span:hover {
  color: #000;
}
.div-5 {
  padding: 24px;
  overflow: auto;
}
.div-6 {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.div-7 {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>

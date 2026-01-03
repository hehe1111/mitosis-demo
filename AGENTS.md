# Mitosis 开发指南

## 项目结构与构建流程

### 重要：代码修改规则

`library/packages/` 目录下的代码（如 `react/`、`vue/`、`svelte/`、`qwik/`）都是通过 Mitosis 编译自动生成的，**不应该直接修改**。

**正确的工作流程：**

1. 修改 `library/src/` 目录下的 Mitosis 源代码（`.lite.tsx` 文件）
2. 在 `library/` 目录下执行 build 命令：
   ```bash
   cd library
   npm run build
   ```
3. 编译后会自动生成更新的 `library/packages/` 下各框架的代码

**目录说明：**

- `library/src/` - Mitosis 源代码（应该修改这里）
- `library/packages/react/` - 编译生成的 React 组件（自动生成，勿直接修改）
- `library/packages/vue/` - 编译生成的 Vue 组件（自动生成，勿直接修改）
- `library/packages/svelte/` - 编译生成的 Svelte 组件（自动生成，勿直接修改）
- `library/packages/qwik/` - 编译生成的 Qwik 组件（自动生成，勿直接修改）

**注意：** 如果直接修改 `library/packages/` 下的代码，下次执行 build 命令时更改会被覆盖！

## CSS 样式限制

### 1. CSS 对象中不支持三元表达式

**错误示例：**

```tsx
<button
  css={{
    backgroundColor: props.type === 'primary' ? '#1890ff' : '#fff',
    color: props.type === 'primary' ? '#fff' : 'rgba(0,0,0,0.85)',
  }}
>
```

**解决方案：**
使用 `Show` 组件条件渲染不同的样式：

```tsx
<Show when={props.type === 'primary'}>
  <button
    css={{
      backgroundColor: '#1890ff',
      color: '#fff',
      border: 'none'
    }}
  ></button>
</Show>
```

原因参考 https://deepwiki.com/search/mitosis-show_35dbca4a-bee0-42e8-98eb-c8095f2efd0d?mode=fast

### 2. CSS 对象中不支持展开运算符

**错误示例：**

```tsx
const baseStyles = { padding: '4px 15px', borderRadius: '2px' };

<button css={{ ...baseStyles, backgroundColor: '#1890ff' }}>
```

**解决方案：**
在 `css` 对象中直接内联所有样式：

```tsx
<button
  css={{
    padding: '4px 15px',
    borderRadius: '2px',
    backgroundColor: '#1890ff',
  }}
>
```

## Vue 编译限制

### 3. Vue 不支持 `{value || <JSX>}` 模式

在 Mitosis 源码中使用 `{props.value || (<JSX>)}` 模式时，编译到 Vue 会生成无效的模板语法。

**错误示例：**

```tsx
<div>
  {props.footer || (
    <div>
      <Button>确定</Button>
    </div>
  )}
</div>
```

**编译后的 Vue 代码（错误）：**

```vue
<div>
  {{footer ||
  <div>
    <Button>确定</Button>
  </div>
  }}
</div>
```

这会导致 Vue 编译错误：`Error parsing JavaScript expression: Unexpected token`

**解决方案：**
使用两个独立的 `Show` 组件替代 `||` 运算符：

```tsx
{/* 自定义内容 */}
<Show when={props.footer !== null && props.footer !== undefined}>
  <div>{props.footer}</div>
</Show>

{/* 默认内容 */}
<Show when={props.footer === undefined}>
  <div>
    <Button>确定</Button>
  </div>
</Show>
```

### 4. Vue 中 `props.children` 不能在函数内使用

在 Mitosis 源码中，如果 `props.children` 在函数内部使用，编译到 Vue 时会生成 `useSlots().default`，但不会自动添加 `useSlots` 的 import 语句，导致运行时错误。

**错误示例：**

```tsx
function renderContent() {
  if (props.destroyOnClose && !state.localVisible) {
    return null;
  }
  return props.children;  // 在函数内使用 props.children
}

return (
  <div>{renderContent()}</div>
);
```

**编译后的 Vue 代码（错误）：**

```vue
<script setup>
import { ref, watch } from "vue";
// 缺少: import { useSlots } from "vue";

function renderContent() {
  // ...
  return useSlots().default;  // useSlots 未定义！
}
</script>

<template>
  <div>{{ renderContent() }}</div>
</template>
```

这会导致运行时错误：`Uncaught ReferenceError: useSlots is not defined`

**解决方案：**
直接在模板中使用 `props.children`，不要通过函数返回：

```tsx
// 正确：直接使用 props.children
return (
  <div>{props.children}</div>
);
```

编译后会正确生成 Vue 的 `<slot />` 语法：

```vue
<template>
  <div><slot /></div>
</template>
```

### 5. Vue 不支持一个文件导出多个可复用组件

Mitosis 编译 Vue 时，`export function` 定义的函数不会注册为可复用组件。

**问题示例：**

```tsx
// button.lite.tsx
export function DefaultButton(props) { ... }
export function DangerButton(props) { ... }
export function WarningButton(props) { ... }
```

编译后的 Vue SFC 中，这些函数无法在 template 中作为组件使用。

**解决方案：**
使用统一的 `Button` 组件 + `type` prop：

```tsx
// button.lite.tsx
export default function Button(props) {
  return (
    <Show when={props.type === 'primary' || !props.type}>
      <button css={{ ...primaryStyles }}>...</button>
    </Show>
  );
}

export function DefaultButton(props) { ... }
export function DangerButton(props) { ... }
export function WarningButton(props) { ... }
```

**使用方式：**

```tsx
// Modal 中统一使用 type prop
<Button type="default" onClick={handleClose}>取消</Button>
<Button onClick={handleOk}>确定</Button>
```

**注意：** React 版本可以同时支持独立组件和 type prop 两种方式。

## 最佳实践

1. **按钮组件**：在一个文件中定义所有按钮样式变体，导出统一的 `Button` 组件支持 `type` prop
2. **Modal 内部**：始终使用 `Button type="default"` 而非 `DefaultButton` 组件
3. **样式组织**：每个按钮类型的样式完整内联，避免使用展开运算符

# Mitosis 开发指南

## 什么是 Mitosis？

Mitosis 是一个允许你**编写一次组件，编译到多个框架**的工具。支持输出到 React、Vue、Angular、Svelte、Qwik 等。

官方文档：

- [mitosis](https://mitosis.builder.io/docs/overview/)
- [Quickstart](https://mitosis.builder.io/docs/quickstart/)
- [Project structure](https://mitosis.builder.io/docs/project-structure/)

![](./docs/how%20to%20use%20mitosis.png)

![](./docs/comparison.png)

## 对比 Web Components

- [Challenges with web components](https://mitosis.builder.io/docs/overview/#challenges-with-web-components)

## 与 Figma 集成

- [Integration with Figma](https://mitosis.builder.io/docs/overview/#integration-with-figma)

## 机制

- [How does it work](https://mitosis.builder.io/docs/overview/#how-does-it-work)
  - [deepwiki](https://deepwiki.com/search/react-vue-svelte-qwik_a5dcd413-f9dd-460d-a741-4a7d0ef4cf55)

## 项目结构与构建流程

### 重要：代码修改规则

`library/packages/` 目录下的代码（如 `react/`、`vue/`、`svelte/`、`qwik/`）都是通过 Mitosis 编译自动生成的，**不应该直接修改**。

**正确的工作流程：**

1. 修改 `library/src/` 目录下的 Mitosis 源代码（`.lite.tsx` 文件）
2. 在 `library/` 目录下执行 start / build 命令：
   ```bash
   cd library
   npm run start # watch 模式，适合开发时使用
   # 或
   npm run build # 一次性编译
   ```
3. 编译后会自动生成更新的 `library/packages/` 下各框架的代码

**目录说明：**

- `library/src/` - Mitosis 源代码（应该修改这里）
- `library/packages/react/` - 编译生成的 React 组件（自动生成，勿直接修改）
- `library/packages/vue/` - 编译生成的 Vue 组件（自动生成，勿直接修改）
- `library/packages/svelte/` - 编译生成的 Svelte 组件（自动生成，勿直接修改）
- `library/packages/qwik/` - 编译生成的 Qwik 组件（自动生成，勿直接修改）

**注意：** 如果直接修改 `library/packages/` 下的代码，下次执行 start / build 命令时更改会被覆盖！

## 配置

- [Configuration](https://mitosis.builder.io/docs/configuration/)

举例：

在 `library/` 目录下创建 `mitosis.config.cjs`：

```javascript
// mitosis.config.cjs
const react = require('./react-options.cjs');
const vue = require('./vue-options.cjs');

/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'src/**',
  targets: ['vue', 'react'],
  options: {
    react,
    vue
  }
};
```

## 开发流程

**1. 启动 Mitosis 开发模式（监听并编译）**

```bash
cd library
npm run start
```

**2. 运行测试应用（预览效果）**

```bash
# 根据你想测试的框架选择
cd test-apps/react && npm run dev
cd test-apps/vue && npm run dev
cd test-apps/qwik && npm run dev # 未测试过，不一定能启动
cd test-apps/svelte && npm run dev # 未测试过，不一定能启动
```

## 组件编写

- [Components](https://mitosis.builder.io/docs/components/)
- [Hooks](https://mitosis.builder.io/docs/hooks/)
- [Context](https://mitosis.builder.io/docs/context/)
- [Customization](https://mitosis.builder.io/docs/customizability/)
- [Using Libraries](https://mitosis.builder.io/docs/using-libraries/)

### 基本组件

```tsx
export default function MyComponent() {
  return <div>Hello world!</div>;
}
```

### Props 传参

```tsx
export default function Button(props) {
  useDefaultProps({
    text: 'default text',
    onClick: () => {
      console.log('hi');
    },
  });

  return (
    <button onClick={(event) => props.onClick(event)}>
      {props.text}
    </button>
  );
}
```

### 状态管理

**useState - 单个状态**
```tsx
export default function MyComponent() {
  const [name, setName] = useState('Steve');

  return (
    <div>
      <h2>Hello, {name}</h2>
      <input onInput={(event) => setName(event.target.value)} value={name} />
    </div>
  );
}
```

**useStore - 对象状态**
```tsx
import { useStore } from '@builder.io/mitosis';

export default function MyComponent() {
  const state = useStore({
    name: 'Steve',
  });

  return (
    <div>
      <h2>Hello, {state.name}</h2>
      <input
        onInput={(event) => {
          state.name = event.target.value;
        }}
        value={state.name}
      />
    </div>
  );
}
```

### 事件处理

```tsx
<button onClick={() => doSomething()}>Click me</button>
<input onInput={(event) => doSomething(event.target.value)} />
```

### 控制流

**条件渲染 - Show**
```tsx
import { Show } from '@builder.io/mitosis';

export default function MyComponent(props) {
  return (
    <Show when={props.showContent} else={<span>Default</span>}>
      <div>Content shown!</div>
    </Show>
  );
}
```

**列表渲染 - For**
```tsx
import { For } from '@builder.io/mitosis';

export default function MyComponent() {
  const state = useStore({
    items: ['apple', 'banana'],
  });

  return (
    <ul>
      <For each={state.items}>{(item) => <li>{item}</li>}</For>
    </ul>
  );
}
```

### 样式

**内联样式**
```tsx
<div css={{ marginTop: '10px', color: 'red' }} />
```

**组件样式 - useStyle**
```tsx
import { useStyle } from '@builder.io/mitosis';

export default function MyComponent() {
  useStyle(`
    button {
      font-size: 12px;
    }
  `);

  return <button css={{ background: 'blue' }}>Button</button>;
}
```

### Children 插槽

```tsx
import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: true, // Web Components 需要
});

export default function Layout(props) {
  return (
    <div className="layout">
      {props.children}
    </div>
  );
}
```

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

### 3. CSS 值必须使用字符串类型

Mitosis 的 `css` prop 中，所有值都必须是字符串类型。数字类型（如 `0`、`1000`）不会生效。

**错误示例：**

```tsx
<div
  css={{
    top: 0,        // ❌ 数字类型，不生效
    left: 0,       // ❌ 数字类型，不生效
    zIndex: 1000,  // ❌ 数字类型，不生效
  }}
>
```

**正确示例：**

```tsx
<div
  css={{
    top: '0',       // ✅ 字符串
    left: '0px',    // ✅ 字符串（带单位也可以）
    zIndex: '1000', // ✅ 字符串
  }}
>
```

### 4. CSS 对象不支持从外部文件导入

Mitosis 需要在编译时静态解析 CSS，因此 `css` prop 必须是内联的对象字面量，不能引用外部变量或导入的对象。

**错误示例：**

```tsx
// button.styles.ts
export const primaryStyles = {
  backgroundColor: '#1890ff',
  color: '#fff',
};

// button.lite.tsx
import { primaryStyles } from './button.styles';

<button css={primaryStyles}>  // ❌ 编译报错
```

**编译错误：**

```
Could not parse CSS object primaryStyles
SyntaxError: JSON5: invalid character 'p' at 1:1
```

**解决方案：**
必须在 `css` prop 中直接写对象字面量：

```tsx
<button
  css={{
    backgroundColor: '#1890ff',
    color: '#fff',
  }}
>
```

**注意：** 这意味着使用 `css` prop 时，样式无法复用，每个元素的样式必须完整内联。

### 5. 推荐使用 `useStyle` Hook 分离样式

如果希望将样式与 JSX 分离，推荐使用 `useStyle` Hook。

**三种样式方案对比：**

| 方式            | 样式与 JSX 分离 | 编译成功 | 样式内嵌到组件 |   推荐   |
| --------------- | :-------------: | :------: | :------------: | :------: |
| `css` prop      |       ❌        |    ✅    |       ✅       | 简单场景 |
| 外部 CSS 文件   |       ✅        |    ✅    |   ❌ 不复制到 packages/**    |    ❌    |
| `useStyle` Hook |       ✅        |    ✅    |       ✅       | ✅ 推荐  |

外部 CSS 文件无法被复制到产物 packages/ 下，可参考 https://mitosis.builder.io/docs/components/#import-css-file

**`useStyle` Hook 示例：**

```tsx
import { Show, useStyle } from '@builder.io/mitosis'

export default function Button(props: ButtonProps) {
  useStyle(`
    .button-primary {
      padding: 4px 15px;
      background-color: #1890ff;
      color: #fff;
      border: none;
    }
    .button-default {
      padding: 4px 15px;
      background-color: #fff;
      color: rgba(0, 0, 0, 0.85);
      border: 1px solid #d9d9d9;
    }
  `)

  return (
    <>
      <Show when={props.type === 'primary' || !props.type}>
        <button class="button-primary" onClick={props.onClick}>
          {props.children}
        </button>
      </Show>
      <Show when={props.type === 'default'}>
        <button class="button-default" onClick={props.onClick}>
          {props.children}
        </button>
      </Show>
    </>
  )
}
```

**编译结果：**

- **React**: 生成 `<style>{...}</style>` 标签
- **Vue**: 生成 `<style scoped>...</style>` 块

**优势：**

1. 样式集中定义，便于维护
2. 使用标准 CSS 语法（非 camelCase）
3. 编译后样式正确内嵌到各框架组件中
4. Vue 自动添加 `scoped` 属性，避免样式冲突

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
{
  /* 自定义内容 */
}
;<Show when={props.footer !== null && props.footer !== undefined}>
  <div>{props.footer}</div>
</Show>

{
  /* 默认内容 */
}
;<Show when={props.footer === undefined}>
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
    return null
  }
  return props.children // 在函数内使用 props.children
}

return <div>{renderContent()}</div>
```

**编译后的 Vue 代码（错误）：**

```vue
<script setup>
import { ref, watch } from 'vue'
// 缺少: import { useSlots } from "vue";

function renderContent() {
  // ...
  return useSlots().default // useSlots 未定义！
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
return <div>{props.children}</div>
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

1. **样式方案**：优先使用 `useStyle` Hook 分离样式，便于维护和复用。或在 `css` prop 中完整内联（避免展开运算符）
   - [样式最佳实践 - DeepWiki](https://deepwiki.com/search/-xxxlitetsx-mitosis_a5f3059f-ab70-44a8-a9f0-b3a0951f06e1?mode=fast)
   - [官方样式示例](https://github.com/BuilderIO/mitosis/blob/993fd9e53243ed9de5ccb19ba2d4653efbd1d9d2/examples/basic/src/blocks/image.lite.tsx#L27)
2. **条件渲染**：使用 `Show` 组件而非三元表达式或 `||` 运算符

## 注意事项

- 编译出来的 React 代码，默认使用 CSS Module（可通过配置修改）
- 修改根目录下的 `mitosis.config.cjs` 可添加更多输出目标

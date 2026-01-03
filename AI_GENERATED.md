# Mitosis 使用指南

## 什么是 Mitosis？

Mitosis 是一个允许你**编写一次组件，编译到多个框架**的工具。支持输出到 React、Vue、Angular、Svelte、Qwik 等。

官方文档：https://mitosis.builder.io/docs/quickstart/

## 安装与初始化

```bash
npm create @builder.io/mitosis@latest
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
cd test-apps/qwik && npm run dev
cd test-apps/svelte && npm run dev
```

## 组件编写

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

## 配置说明

在项目根目录创建 `mitosis.config.cjs`：

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

## 编译命令

```bash
# 编译到 React
mitosis compile -t react component.lite.tsx

# 编译到 HTML
mitosis compile -t html component.lite.tsx

# 批量编译到目录
mitosis compile -t react --out-dir build -- src/**/*.lite.tsx
```

## 工作流程总结

1. 在 `library/src/` 目录下编写 `.lite.tsx` 组件
2. Mitosis 自动编译到 `library/packages/{框架}/` 目录
3. 测试应用（如 `test-apps/vue/`）导入编译后的组件使用

## 相关链接

- [官方文档](https://mitosis.builder.io/docs/quickstart/)
- [配置文档](https://mitosis.builder.io/docs/configuration/)
- [GitHub](https://github.com/BuilderIO/mitosis)

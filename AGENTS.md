# Mitosis 开发指南

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
      border: 'none',
    }}
  >
  </button>
</Show>
```

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

### 3. Vue 不支持一个文件导出多个可复用组件

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

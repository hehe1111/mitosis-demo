# Modal 组件实现方案

## 1. 项目结构

```
library/src/
├── modal/
│   └── modal.lite.tsx      # Modal 组件主文件
├── button/
│   ├── button.lite.tsx     # Button 组件 (primary)
│   └── default-button.lite.tsx  # DefaultButton 组件 (default)
└── index.ts                # 导出
```

## 2. Button 组件设计

### 2.1 Props 定义

```typescript
export type ButtonProps = {
  type?: 'primary' | 'default';
  onClick?: () => void;
  children: any;
};
```

### 2.2 功能特性

- 支持 `primary` 和 `default` 两种类型
- 简单的点击事件处理
- 使用 CSS 样式

### 2.3 样式方案

- `primary`: 蓝色背景、白色文字
- `default`: 灰色边框、黑色文字

## 3. Modal 组件设计

### 3.1 Props 定义

```typescript
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
```

### 3.2 功能特性

1. **外部控制显示/隐藏**
   - 通过 `visible` prop 控制显示状态

2. **自定义能力**
   - `title`: 自定义头部标题
   - `closeNode`: 自定义右上角关闭节点（默认「关闭」文本）
   - `footer`: 自定义底部内容
   - `cancelText`: 自定义取消按钮文本（默认「取消」）
   - `okText`: 自定义确认按钮文本（默认「确定」）
   - `closable`: 控制是否显示关闭按钮

3. **关闭功能**
   - 点击右上角「关闭」文本触发 `onCancel` 或关闭弹框
   - 支持 `afterClose` 回调
   - 支持 `maskClosable` 控制点击遮罩层是否关闭（默认 true）

4. **底部按钮**
   - 默认底部：取消 + 确定按钮
   - 支持自定义 footer
   - 支持 `cancelText`、`okText` 自定义按钮文本

5. **尺寸控制**
   - 支持 `width` 自定义弹框宽度（默认 520px）

6. **内容销毁**
   - 支持 `destroyOnClose` 关闭后销毁内容（默认 false）

### 3.3 状态管理

```typescript
const state = useStore({
  visible: props.visible,
});
```

### 3.4 样式方案

- 遮罩层：固定定位、黑色半透明背景
- 弹框内容：居中显示、白色背景、圆角阴影
- 头部：flex 布局、标题 + 关闭按钮
- 底部：flex 布局、按钮组

### 3.5 样式结构

```css
/* 遮罩层 */
overlay: {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

/* 弹框容器 */
container: {
  width: props.width || '520px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 6px 16px 0 rgba(0,0,0,0.08)',
}

/* 头部 */
header: {
  padding: '16px 24px',
  borderBottom: '1px solid #f0f0f0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

title: {
  margin: 0,
  fontSize: '16px',
  fontWeight: 500,
}

closeBtn: {
  cursor: 'pointer',
  fontSize: '16px',
  color: '#999',
}

/* 内容区域 */
body: {
  padding: '24px',
}

/* 底部区域 */
footer: {
  padding: '16px 24px',
  borderTop: '1px solid #f0f0f0',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
}
```

## 4. 组件实现策略

### 4.1 Button 组件实现

由于 Mitosis 对 JSX 中对象展开运算符支持有限，Button 组件拆分为两个文件实现：

**button.lite.tsx (Primary Button)**

```typescript
export default function Button(props: ButtonProps) {
  return (
    <Show when={props.type === 'primary'}>
      <button
        onClick={props.onClick}
        css={{
          padding: '4px 15px',
          borderRadius: '2px',
          cursor: 'pointer',
          fontSize: '14px',
          height: '32px',
          lineHeight: '32px',
          transition: 'all 0.2s',
          backgroundColor: '#1890ff',
          color: '#fff',
          border: 'none',
        }}
      >
        {props.children}
      </button>
    </Show>
  );
}
```

**default-button.lite.tsx (Default Button)**

```typescript
export default function DefaultButton(props: DefaultButtonProps) {
  return (
    <button
      onClick={props.onClick}
      css={{
        padding: '4px 15px',
        borderRadius: '2px',
        cursor: 'pointer',
        fontSize: '14px',
        height: '32px',
        lineHeight: '32px',
        transition: 'all 0.2s',
        backgroundColor: '#fff',
        color: 'rgba(0,0,0,0.85)',
        border: '1px solid #d9d9d9',
      }}
    >
      {props.children}
    </button>
  );
}
```

### 4.2 Modal 组件实现

```typescript
export default function Modal(props: ModalProps) {
  const state = useStore({
    localVisible: props.visible,
  });

  onUpdate(() => {
    state.localVisible = props.visible;
  }, [props.visible]);

  function handleClose() {
    state.localVisible = false;
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

  function renderContent() {
    if (props.destroyOnClose && !state.localVisible) {
      return null;
    }
    return props.children;
  }

  return (
    <Show when={state.localVisible}>
      <div css={...遮罩层样式...} onClick={handleMaskClick}>
        <div css={...弹框容器样式...} onClick={(e) => e.stopPropagation()}>
          <div css={...头部样式...}>
            <div css={...标题样式...}>{props.title || '弹框标题'}</div>
            <Show when={props.closable !== false}>
              <span css={...关闭按钮样式...} onClick={handleClose}>
                {props.closeNode || '关闭'}
              </span>
            </Show>
          </div>

          <div css={...内容区域样式...}>
            {renderContent()}
          </div>

          <Show when={props.footer !== null}>
            <div css={...底部样式...}>
              {props.footer || (
                <>
                  <DefaultButton onClick={handleClose}>
                    {props.cancelText || '取消'}
                  </DefaultButton>
                  <Button onClick={handleOk}>
                    {props.okText || '确定'}
                  </Button>
                </>
              )}
            </div>
          </Show>
        </div>
      </div>
    </Show>
  );
}
```

## 5. 导出配置

在 `library/src/index.ts` 中添加导出：

```typescript
export { default as Button, DefaultButton } from './button/button.lite';
export { default as Modal } from './modal/modal.lite';
```

## 6. 使用示例

```typescript
// 基本使用
<Modal
  visible={showModal}
  title="弹框标题"
  onCancel={() => setShowModal(false)}
  onOk={handleOk}
>
  弹框内容
</Modal>

// 自定义按钮文本
<Modal
  visible={showModal}
  title="弹框标题"
  cancelText="不要了"
  okText="确定"
  onCancel={() => setShowModal(false)}
  onOk={handleOk}
>
  弹框内容
</Modal>

// 自定义底部
<Modal
  visible={showModal}
  title="弹框标题"
  footer={
    <Button type="primary" onClick={handleOk}>我知道了</Button>
  }
  afterClose={() => console.log('弹框已关闭')}
>
  弹框内容
</Modal>

// 自定义关闭按钮
<Modal
  visible={showModal}
  closeNode={<span>×</span>}
>
  弹框内容
</Modal>

// 自定义宽度
<Modal
  visible={showModal}
  width={800}
>
  弹框内容
</Modal>

// 禁止点击遮罩层关闭
<Modal
  visible={showModal}
  maskClosable={false}
  onCancel={() => setShowModal(false)}
>
  弹框内容
</Modal>
```

## 7. 注意事项

1. **afterClose 实现**: 当 `visible` 从 `true` 变为 `false` 后触发
2. **状态同步**: 使用 `localVisible` 配合 `props.visible` 实现外部控制
3. **样式隔离**: 使用 `css={{}}` 内联样式，mitosis 会自动处理
4. **事件处理**: 使用可选链调用 `props.onCancel?.()`
5. **maskClosable**: 点击遮罩层时是否关闭弹框（默认 true）
6. **destroyOnClose**: 关闭后是否销毁内容（默认 false）
7. **Mitosis 限制**: 
   - CSS 对象中不支持三元表达式和展开运算符
   - 函数使用 `function` 关键字声明，不使用箭头函数
   - Button 组件拆分为两个文件分别实现 primary 和 default 类型


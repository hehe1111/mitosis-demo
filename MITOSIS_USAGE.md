# Mitosis 使用方法

[BuilderIO / mitosis](https://github.com/BuilderIO/mitosis)

[Quickstart](https://mitosis.builder.io/docs/quickstart/)。滚动到最底部，有一个直观的演示动图

![](./docs/how%20to%20use%20mitosis.png)

结果：

![](./docs/comparison.png)

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

## 工作流程

- 在 `library/src/` 目录下编写 `.lite.tsx` 组件
- Mitosis 会自动编译到 `library/packages/{框架}/` 目录
- 测试应用直接导入编译后的组件使用

## 配置

修改根目录下的 `mitosis.config.cjs` 可添加更多输出目标。

[官方文档 - Configuration](https://mitosis.builder.io/docs/configuration/)

## 样式最佳实践

deepwiki https://deepwiki.com/search/-xxxlitetsx-mitosis_a5f3059f-ab70-44a8-a9f0-b3a0951f06e1?mode=fast

官方案例 https://github.com/BuilderIO/mitosis/blob/993fd9e53243ed9de5ccb19ba2d4653efbd1d9d2/examples/basic/src/blocks/image.lite.tsx#L27

## 机制

[如何实现写一次代码，可以编译成不同框架（react / vue / svelte / qwik 等）代码的](https://deepwiki.com/search/react-vue-svelte-qwik_a5dcd413-f9dd-460d-a741-4a7d0ef4cf55)

## 注意事项

Mitosis 限制:

- CSS 对象中不支持三元表达式和展开运算符。参考 https://deepwiki.com/search/mitosis-show_35dbca4a-bee0-42e8-98eb-c8095f2efd0d?mode=fast
- 函数使用 function 关键字声明，不使用箭头函数
- 编译出来的 react 代码，默认使用 CSS Module

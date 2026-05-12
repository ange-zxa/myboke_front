---
title: "Next.js 16 入门指南"
date: "2026-05-10"
tags: ["nextjs", "react", "前端"]
category: "技术"
excerpt: "Next.js 16 带来了许多新特性，本文介绍 App Router、Server Components 等核心概念。"
---

## Next.js 16 入门指南

Next.js 16 是最新的 React 全栈框架版本，带来了更好的性能和开发体验。

### App Router 核心概念

Next.js 16 使用 App Router 作为默认路由方案：

```
src/app/
├── layout.tsx    # 根布局
├── page.tsx      # 首页
├── posts/
│   └── [slug]/
│       └── page.tsx  # 动态路由
```

### Server Components vs Client Components

Next.js 默认使用 Server Components，这意味着：

- 组件在服务端渲染，减少客户端 JS 体积
- 需要交互的组件需要添加 `"use client"` 指令
- 数据获取可以直接使用 `async/await`

### 静态生成 (SSG)

对于博客这类内容站点，静态生成是最佳选择：

```typescript
// 生成所有静态路径
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### Tailwind CSS 集成

Next.js 内置 Tailwind CSS 支持，使用 utility-first 方式快速构建 UI：

```tsx
<div className="max-w-4xl mx-auto px-4">
  <h1 className="text-3xl font-bold">Hello</h1>
</div>
```

### 总结

Next.js 16 是构建现代 Web 应用的优秀选择，特别适合内容驱动的网站如博客。

# Remotion 完全教程指南

> **用 React 写代码来生成视频 —— 从 0 基础入门到 AI 驱动的高级工作流**
>
> 基于 Remotion 官方文档（2026 版）及社区最佳实践整理

---

## 目录

1. [什么是 Remotion](#1-什么是-remotion)
2. [快速开始](#2-快速开始)
3. [核心概念](#3-核心概念)
4. [核心 Hooks API](#4-核心-hooks-api)
5. [媒体组件](#5-媒体组件)
6. [时序控制与转场](#6-时序控制与转场)
7. [文字动画](#7-文字动画)
8. [数据可视化](#8-数据可视化)
9. [3D 动画](#9-3d-动画)
10. [渲染与部署](#10-渲染与部署)
11. [AI + Remotion 工作流](#11-ai--remotion-工作流)
12. [Remotion 的能与不能](#12-remotion-的能与不能)
13. [最佳实践](#13-最佳实践)
14. [学习资源汇总](#14-学习资源汇总)

---

## 1. 什么是 Remotion

**Remotion** 是一个基于 React 的开源框架，可以用写 React 组件的方式来程序化地创建视频。每一个画面帧就是一个 React 组件的渲染结果，所有的动画、转场、特效都由代码驱动。

### 核心优势

| 优势 | 说明 |
|---|---|
| **声明式动画** | 用代码描述动画，不用拖拽时间轴 |
| **组件化复用** | 视频片段可以像 React 组件一样复用、传参 |
| **版本控制** | 视频工程可以用 Git 管理，团队协作友好 |
| **批量生成** | 数据驱动，一套模板生成成千上万个视频 |
| **AI 友好** | LLM 擅长写 React 代码，天然适合 AI 辅助创作 |
| **完全开源** | 本地渲染，无需付费，可私有化部署 |
| **29.8k+ GitHub Stars** | 成熟活跃的社区（截至 2026 年） |

### Remotion vs 传统工具

| | Remotion | After Effects | 剪映 |
|---|---|---|---|
| **上手门槛** | 需要 React 基础 | 陡峭的学习曲线 | 低 |
| **动画方式** | 代码声明式 | 关键帧拖拽 | 模板 + 预设 |
| **批量生产** | 极强（数据驱动） | 弱 | 弱 |
| **版本控制** | Git | 无 | 无 |
| **AI 集成** | 原生支持 | 第三方插件 | 有限 |
| **灵活性** | 极高（纯代码） | 极高 | 中等 |
| **渲染速度** | 可分布式 | 本机渲染 | 本机渲染 |
| **费用** | 免费开源 | 订阅制 | 免费 |

### 适用场景

- 产品演示 / 功能介绍视频
- 数据可视化动画（图表动效）
- 社交媒体短视频批量生产
- 个性化营销视频（年度回顾、定制内容）
- 技术教程 / 代码讲解视频
- 音乐可视化
- AI 驱动的自动化视频流水线

---

## 2. 快速开始

### 环境要求

- **Node.js** 16+ 或 **Bun** 1.0.3+
- **macOS 15 (Sequoia)** 或更新版本
- Linux：需要 Libc 2.35+（Alpine Linux 和 NixOS 不支持）

### 创建项目

```bash
# 一键创建项目（推荐选 Blank 模板 + TailwindCSS + 安装 Skills）
npx create-video@latest

# 或者指定模板
npx create-video@latest --yes --blank my-video

cd my-video
npm install
npm run dev
```

浏览器会自动打开 `http://localhost:3001`，右侧是实时预览，左侧是代码编辑器。

### 安装 Agent Skills（AI 辅助）

```bash
# 官方 Remotion Skills
npx skills add remotion-dev/skills

# 社区最佳实践 Skills
npx skills add remotion-best-practices
```

安装后，Claude Code 等 AI 工具就能自动理解 Remotion 的 API 和约定，帮你写代码生成视频。

---

## 3. 核心概念

### 项目结构

```
my-video/
├── src/
│   ├── index.ts          # 入口：registerRoot()
│   ├── Root.tsx          # 注册 Composition（尺寸、帧率、时长）
│   └── MyComp.tsx        # 你的视频组件
├── public/               # 静态资源（图片、视频、音频）
├── out/                  # 渲染输出
└── package.json
```

### 三大核心概念

#### 1. Composition（视频定义）

在 `src/Root.tsx` 中注册视频：

```tsx
import { Composition } from 'remotion';
import { MyComp } from './MyComp';

export const Root = () => {
  return (
    <Composition
      id="MyVideo"               // 唯一标识
      component={MyComp}         // React 组件
      width={1920}               // 宽度
      height={1080}              // 高度
      durationInFrames={30 * 30}  // 30秒 × 30fps = 900帧
      fps={30}                   // 帧率
    />
  );
};
```

#### 2. Frame（帧）

Remotion 中的一切都是**帧驱动**的。每一帧就是一个 React 组件的渲染结果。通过 `useCurrentFrame()` 获取当前帧号。

```tsx
const frame = useCurrentFrame(); // 0, 1, 2, 3, ...
```

#### 3. Animation（动画）

动画 = 把帧号映射到属性值。Remotion 提供两个核心工具：

- **`interpolate()`**：线性/缓动映射
- **`spring()`**：物理弹簧动画

```tsx
// 第 0 帧：opacity = 0，第 20 帧：opacity = 1
const opacity = interpolate(frame, [0, 20], [0, 1]);
```

---

## 4. 核心 Hooks API

### `useCurrentFrame()`

返回当前帧号。**这是 Remotion 动画的唯一时间源**——永远不要用 `setTimeout`、CSS `animation` 等。

```tsx
import { useCurrentFrame } from 'remotion';

const frame = useCurrentFrame();
// 在 Composition 顶层：返回绝对帧号（0 开始）
// 在 <Sequence> 内部：返回相对帧号（相对于 from 偏移）
```

### `useVideoConfig()`

返回当前视频的配置：

```tsx
const { width, height, fps, durationInFrames, id } = useVideoConfig();
```

### `interpolate()` — 线性映射

将值从一个范围映射到另一个范围，支持缓动函数。

```tsx
import { interpolate, useCurrentFrame, Easing } from 'remotion';

const frame = useCurrentFrame();

// 基本用法：frame 0→30 映射 opacity 0→1
const opacity = interpolate(frame, [0, 30], [0, 1]);

// 多点映射：淡入 → 保持 → 淡出
const opacity = interpolate(
  frame,
  [0, 30, durationInFrames - 30, durationInFrames],
  [0, 1, 1, 0]
);

// 配合缓动函数
const value = interpolate(frame, [0, 100], [0, 200], {
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),  // CSS ease 曲线
  extrapolateRight: 'clamp',  // 超出范围时钳制
  extrapolateLeft: 'clamp',
});
```

#### 外推选项

| 选项 | 含义 |
|---|---|
| `'extend'`（默认） | 继续延伸，值可能超出范围 |
| `'clamp'` | 钳制在范围边界 |
| `'wrap'` | 循环重复 |
| `'identity'` | 返回原始值 |

### `spring()` — 物理弹簧动画

模拟弹簧物理效果，产生自然的弹跳动画。

```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// 基本用法（0→1）
const scale = spring({ frame, fps });

// 延迟启动 + 自定义弹性
const scale = spring({
  frame: frame - 15,        // 从第 15 帧开始
  fps,
  config: {
    damping: 12,             // 阻尼（默认 10）
    stiffness: 100,          // 刚度（默认 100）
    mass: 0.5,               // 质量（默认 1）
  },
});

// 从指定值过渡到另一值
const translateY = spring({
  frame,
  fps,
  from: 100,                 // 起始值
  to: 0,                     // 目标值
  config: { damping: 15 },
});
```

#### 弹簧参数对照表

| 效果 | damping | stiffness | mass |
|---|---|---|---|
| 快速弹入 | 10 | 100 | 1 |
| 慢速弹入 | 20 | 100 | 1 |
| 弹性十足 | 5 | 200 | 1 |
| 无弹性 | 200 | 50 | 1 |
| 重物感 | 15 | 100 | 3 |

### `interpolate()` vs `spring()`

```tsx
// interpolate：线性/缓动 — 适合精确控制
const progress = interpolate(frame, [0, 60], [0, 100]);

// spring：物理模拟 — 适合自然动感
const bounce = spring({ frame, fps });

// 组合使用：spring 做驱动，interpolate 做映射
const driver = spring({ frame, fps });
const rotate = interpolate(driver, [0, 1], [0, 360]); // 旋转一圈
```

### `staticFile()` — 引用静态资源

```tsx
import { Img, staticFile } from 'remotion';

<Img src={staticFile('logo.png')} />
<Audio src={staticFile('bgm.mp3')} />
<OffthreadVideo src={staticFile('intro.mp4')} />
```

### 其他常用 Hooks

| Hook | 用途 |
|---|---|
| `useVideoConfig()` | 获取当前 Composition 的宽、高、fps、时长 |
| `useCurrentScale()` | 获取当前预览缩放比 |
| `delayRender()` / `continueRender()` | 异步资源加载等待（如字体、数据） |
| `useRemotionEnvironment()` | 判断当前是预览还是渲染模式 |

---

## 5. 媒体组件

### 视频组件对比

| 组件 | 包 | 底层 | 适用场景 |
|---|---|---|---|
| `<OffthreadVideo />` | `remotion` | Rust + FFmpeg | **默认首选**，帧精确，广泛编码支持 |
| `<Html5Video />`（原 `<Video>`） | `remotion` | HTML5 `<video>` | 简单预览 |
| `<Video />` | `@remotion/media` | WebCodecs | **渲染最快**，实验性 API |

### `<OffthreadVideo />` 用法

```tsx
import { OffthreadVideo, staticFile } from 'remotion';

<OffthreadVideo
  src={staticFile('footage.mp4')}
  startFrom={30}           // 裁剪起始（帧）
  endAt={300}              // 裁剪结束（帧）
  volume={0.8}             // 0-1，也支持函数 (frame) => number
  playbackRate={2}         // 倍速
  muted={false}
  loop={false}
  transparent={true}       // 支持 VP8/VP9/ProRes alpha 通道
  toneMapped={true}        // HDR → SDR 色调映射
  pauseWhenBuffering={true}
/>
```

**注意**：`<OffthreadVideo>` 的音频会自动包含在渲染输出中，不需要额外的 `<Audio>` 标签。你可以直接通过 `volume`、`playbackRate` 控制音频。

### 音频组件

```tsx
import { Audio, staticFile } from 'remotion';

<Audio
  src={staticFile('voiceover.mp3')}
  startFrom={0}
  endAt={600}
  volume={(frame) => interpolate(frame, [0, 30], [0, 1])}  // 动态音量
  playbackRate={1}
  loop={false}
  toneFrequency={440}      // 变调（仅渲染时生效）
/>
```

### 图片组件

```tsx
import { Img, staticFile } from 'remotion';

<Img
  src={staticFile('photo.jpg')}
  style={{
    width: 400,
    height: 300,
    objectFit: 'cover',
  }}
/>
```

---

## 6. 时序控制与转场

### `<Sequence>` — 时间偏移

将子组件在时间轴上偏移，支持嵌套。

```tsx
import { Sequence, useCurrentFrame } from 'remotion';

const Scene = () => {
  const frame = useCurrentFrame(); // 在 Sequence 内是相对帧号
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  return <div style={{ opacity }}>Scene Content</div>;
};

<Sequence from={60} durationInFrames={90}>
  <Scene />  {/* 这里 useCurrentFrame() 从 0 开始 */}
</Sequence>

<Sequence from={150} durationInFrames={90}>
  <Scene />  {/* 同样的组件，不同的时间段 */}
</Sequence>
```

### `<Series>` — 依次排列

场景自动接上一个场景的结束位置。

```tsx
import { Series } from 'remotion';

<Series>
  <Series.Sequence durationInFrames={60}>
    <Intro />
  </Series.Sequence>
  <Series.Sequence durationInFrames={90}>
    <MainContent />
  </Series.Sequence>
  <Series.Sequence durationInFrames={60}>
    <Outro />
  </Series.Sequence>
</Series>
```

### `<TransitionSeries>` — 带转场的场景

```tsx
import { TransitionSeries } from '@remotion/transitions';
import { fade, slide, wipe } from '@remotion/transitions/presentations';

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={90}>
    <SceneA />
  </TransitionSeries.Sequence>

  {/* 转场：15 帧的滑动效果 */}
  <TransitionSeries.Transition
    timing={{ durationInFrames: 15 }}
    presentation={slide({ direction: 'from-right' })}
  />

  <TransitionSeries.Sequence durationInFrames={90}>
    <SceneB />
  </TransitionSeries.Sequence>

  {/* 叠加效果（不影响时序） */}
  <TransitionSeries.Overlay>
    <LightLeak />
  </TransitionSeries.Overlay>
</TransitionSeries>
```

#### 内置转场效果

| 转场 | 说明 |
|---|---|
| `fade()` | 淡入淡出 |
| `slide({ direction })` | 滑动（from-left / from-right / from-top / from-bottom） |
| `wipe({ direction })` | 擦除效果 |
| `flip({ direction })` | 3D 翻页 |
| `clockWipe()` | 时钟扫除 |

### `AbsoluteFill` — 全屏容器

```tsx
import { AbsoluteFill } from 'remotion';

<AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
  {/* 自动充满整个画面 */}
</AbsoluteFill>
// 等价于：
// <div style={{ position: 'absolute', inset: 0 }} />
```

---

## 7. 文字动画

### 基础文字动画

```tsx
import { spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

const Title = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const effectiveFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: effectiveFrame,
    fps,
    config: { damping: 15 },
  });

  const opacity = interpolate(effectiveFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <h1
      style={{
        transform: `scale(${scale})`,
        opacity,
        fontSize: 80,
        fontWeight: 'bold',
      }}
    >
      {text}
    </h1>
  );
};
```

### 逐字动画

```tsx
const StaggerText = ({ text, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stagger = 3; // 每个字间隔 3 帧

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {text.split('').map((char, i) => {
        const charFrame = Math.max(0, frame - startFrame - i * stagger);
        const y = spring({
          frame: charFrame,
          fps,
          from: 40,
          to: 0,
          config: { damping: 12 },
        });
        const opacity = interpolate(charFrame, [0, 5], [0, 1]);

        return (
          <span key={i} style={{ transform: `translateY(${y}px)`, opacity, fontSize: 60 }}>
            {char}
          </span>
        );
      })}
    </div>
  );
};
```

### 字幕高亮（TikTok 风格）

```tsx
const captions = [
  { text: "今天", start: 0, end: 0.3 },
  { text: "我们来", start: 0.3, end: 0.6 },
  { text: "学习", start: 0.6, end: 0.9 },
  { text: "Remotion", start: 0.9, end: 1.5 },
];

const CaptionTrack = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      {captions.map((cap, i) => {
        const isActive = currentTime >= cap.start && currentTime <= cap.end;
        return (
          <span
            key={i}
            style={{
              fontSize: 48,
              color: isActive ? '#FFD700' : '#888',
              fontWeight: isActive ? 'bold' : 'normal',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.1s ease',
            }}
          >
            {cap.text}
          </span>
        );
      })}
    </div>
  );
};
```

---

## 8. 数据可视化

### 基础柱状图动画

```tsx
const BarChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const barWidth = width / data.length - 20;
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = height * 0.6;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 20, height: '100%' }}>
      {data.map((item, index) => {
        const barProgress = spring({
          frame: frame - index * 5,  // 错开动画
          fps,
          config: { damping: 12 },
        });

        const barHeight = interpolate(barProgress, [0, 1], [0, (item.value / maxValue) * chartHeight]);

        return (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: barWidth,
                height: barHeight,
                background: 'linear-gradient(180deg, #6366f1, #818cf8)',
                borderRadius: '8px 8px 0 0',
              }}
            />
            <span style={{ color: '#aaa', marginTop: 8, fontSize: 14 }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};
```

### D3.js 集成

Remotion 可以和 D3.js 完美搭配，实现复杂的数据可视化动画：

```bash
npm install d3
npm install @types/d3 --save-dev
```

```tsx
import * as d3 from 'd3';
import { useCurrentFrame } from 'remotion';
import { useMemo } from 'react';

const AnimatedLineChart = ({ data, width, height }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 60], [0, 1]); // 动画进度 0→1

  const pathD = useMemo(() => {
    const partialData = data.slice(0, Math.floor(data.length * progress));

    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([50, width - 50]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data) || 100])
      .range([height - 50, 50]);

    const line = d3.line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    return line(partialData) || '';
  }, [data, progress, width, height]);

  return (
    <svg width={width} height={height}>
      <path d={pathD} fill="none" stroke="#6366f1" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
};
```

### 数据驱动的批量渲染

为数据集的每一条记录生成一个独立视频：

```tsx
// src/Root.tsx
export const Root = () => {
  const users = [
    { id: 1, name: '张三', stats: [/*...*/] },
    { id: 2, name: '李四', stats: [/*...*/] },
    // ... 成千上万条记录
  ];

  return users.map(user => (
    <Composition
      key={user.id}
      id={`review-${user.id}`}
      component={YearReview}
      width={1080}
      height={1920}
      durationInFrames={30 * 30}
      fps={30}
      defaultProps={user}
    />
  ));
};
```

```bash
# 批量渲染
npx remotion render YearReview out/review-1.mp4 --props='{"id":1,"name":"张三"}'
npx remotion render YearReview out/review-2.mp4 --props='{"id":2,"name":"李四"}'
```

---

## 9. 3D 动画

### Three.js + React Three Fiber

```bash
npm install @react-three/fiber @react-three/drei three
npm install @types/three --save-dev
```

### 基础 3D 场景

```tsx
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const RotatingBox = () => {
  const frame = useCurrentFrame();

  return (
    <mesh rotation={[frame * 0.02, frame * 0.03, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#6366f1" metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

const ThreeScene = () => {
  return (
    <div style={{ width: 1920, height: 1080 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingBox />
      </Canvas>
    </div>
  );
};
```

### 加载 3D 模型（.glb / .gltf）

```bash
npm install @react-three/drei
```

```tsx
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useCurrentFrame } from 'remotion';

const Model = () => {
  const gltf = useLoader(GLTFLoader, staticFile('model.glb'));
  const frame = useCurrentFrame();

  return (
    <primitive
      object={gltf.scene}
      rotation={[0, frame * 0.01, 0]}
      scale={[1.5, 1.5, 1.5]}
    />
  );
};
```

### 3D 相机动画

```tsx
import { useThree } from '@react-three/fiber';
import { useCurrentFrame, interpolate } from 'remotion';

const AnimatedCamera = () => {
  const { camera } = useThree();
  const frame = useCurrentFrame();

  // 动画相机位置
  camera.position.x = interpolate(frame, [0, 300], [5, -5]);
  camera.position.z = interpolate(frame, [0, 300], [5, 3]);
  camera.lookAt(0, 0, 0);

  return null;
};
```

---

## 10. 渲染与部署

### 本地渲染

```bash
# 渲染单个视频
npx remotion render <composition-id> <output.mp4>

# 示例
npx remotion render MyVideo out/video.mp4

# 指定帧范围
npx remotion render MyVideo out/video.mp4 --frame=0-300

# 指定编码参数
npx remotion render MyVideo out/video.mp4 \
  --codec=h264 \
  --crf=18 \
  --video-bitrate=10M

# 静默模式（适合脚本/CI）
npx remotion render MyVideo out/video.mp4 --log=error
```

### 常用渲染参数

| 参数 | 说明 |
|---|---|
| `--codec=h264` | H.264 编码（兼容性好） |
| `--codec=h265` | H.265 编码（更小体积） |
| `--codec=vp8` / `--codec=vp9` | WebM 格式 |
| `--codec=prores` | ProRes（剪辑中间格式） |
| `--crf=18` | 质量控制（0-51，越小质量越高） |
| `--video-bitrate=10M` | 视频比特率 |
| `--scale=0.5` | 分辨率缩放（0.5 = 一半分辨率） |
| `--every-nth-frame=2` | 每隔一帧渲染（加速预览渲染） |
| `--props='{"key":"value"}'` | 传入动态属性 |
| `--concurrency=4` | 并行渲染线程数 |

### 批量数据驱动渲染

```tsx
// render-all.ts
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';

async function renderAll() {
  const users = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' },
  ];

  for (const user of users) {
    const composition = await selectComposition({
      serveUrl: path.resolve('./src/index.ts'),
      id: 'YearReview',
      inputProps: user,
    });

    await renderMedia({
      composition,
      serveUrl: path.resolve('./src/index.ts'),
      codec: 'h264',
      outputLocation: `out/review-${user.id}.mp4`,
      inputProps: user,
    });
  }
}

renderAll();
```

### AWS Lambda 分布式渲染

对于大批量渲染（成千上万个视频），可以使用 Remotion Lambda：

```bash
npx remotion lambda render <composition> <output.mp4> --region=us-east-1
```

优势：
- 并行度极高（同时数百个 Lambda 函数渲染）
- 零基础设施维护
- 按使用量付费

### GitHub Actions CI/CD 渲染

可以在 CI 流水线中自动渲染视频：

```yaml
- name: Render video
  run: npx remotion render MyComp out/video.mp4

- name: Upload artifact
  uses: actions/upload-artifact@v4
  with:
    name: video
    path: out/video.mp4
```

---

## 11. AI + Remotion 工作流

### 为什么 Remotion 适合 AI 辅助

Remotion 的视频本质上是 **React 代码**，而 LLM（大语言模型）最擅长的就是写代码。这意味着：

- 可以用自然语言描述视频需求，AI 直接生成 Remotion 代码
- AI 能处理 `interpolate(frame, [0, 30], [0, 1])` 这样的声明式动画逻辑
- Remotion 官方提供了专门的 LLM 系统提示词（`remotion.dev/llms.txt`）
- Agent Skills 机制让 AI 自动了解 Remotion API 约定

### 官方 AI 工作流

```bash
# 1. 创建项目（选择安装 Skills）
npx create-video@latest

# 2. 安装依赖 + 启动预览
npm install && npm run dev

# 3. 启动 Claude Code
claude

# 4. 用自然语言生成视频
# 输入类似：
# "生成一个 30 秒的产品发布视频，暗色科技风，用 3 个卡片展示功能点，
#  配上 spring 动画，每个卡片从下方滑入，间隔 15 帧"
```

### AI Agent 驱动的完整流水线

一个典型的 AI + Remotion 四阶段流水线：

```
[创意] → [脚本] → [素材] → [组装] → [渲染]
   |        |        |        |         |
   v        v        v        v         v
 人类    Claude   DALL·E   Claude   Remotion
 输入    生成文案  生成图片  生成组件  本地渲染
```

### 推荐的开源 AI 视频项目

| 项目 | 说明 |
|---|---|
| [claude-remotion-kickstart](https://github.com/jhartquist/claude-remotion-kickstart) | 预置视频组件 + AI 素材生成 + GitHub Actions 渲染 |
| [Animation-Workflow (RinDig)](https://github.com/RinDig/Animation-Workflow) | 三阶段工作流：Spec → Build → Refine |
| [Archon Video Generation](https://github.com/coleam00/archon-video-generation-workflow) | URL 一键转短视频（文章解说 / 营销视频） |
| [Claude Code Video Toolkit](https://github.com/wilwaldon/Claude-Code-Video-Toolkit) | Skills + MCP + 完整视频制作工具箱 |
| [n8n 自动化教程流水线](https://n8n.io/workflows/12515) | 全自动：文档 URL → Claude → TTS → Remotion → YouTube |

### Prompt 技巧（来自社区经验）

1. **先模板再定制**：先用官方 Blank 模板跑通，再让 AI 修改
2. **描述视觉风格**：给出具体的风格关键词（"暗色科技风"、"玻璃拟态"、"极简白色"）
3. **指定动画参数**：明确帧数、延迟、"spring"还是"linear"
4. **组件化思维**：让 AI 把每个场景拆成独立组件，方便调试和复用
5. **增量迭代**：先生成一个场景，确认满意后，再让 AI 扩展更多场景

---

## 12. Remotion 的能与不能

### 能做（强项）

| 场景 | 说明 |
|---|---|
| 程序化动画 | 代码控制的运动图形、文字动效 |
| 数据可视化视频 | 图表动画、仪表盘演示 |
| 批量个性化视频 | 一个人名换一下，生成几万个版本 |
| 技术教程视频 | 代码高亮、命令行动画、技术讲解 |
| 社交媒体短视频 | TikTok / Reels 风格的快速剪辑 |
| 产品演示 | 功能展示、流程演示 |
| AI 驱动视频生产 | 自然语言到视频的流水线 |

### 不能做（或很困难）

| 场景 | 替代方案 |
|---|---|
| 实拍视频剪辑 | DaVinci Resolve / Final Cut / Premiere |
| 复杂特效合成 | After Effects / Nuke |
| 3D 建模/雕刻 | Blender / Cinema 4D |
| 手绘逐帧动画 | Procreate / Toon Boom |
| 音频混音/母带 | Audition / Logic Pro |
| 实时视频直播 | OBS / Ecamm Live |
| 移动端快速粗剪 | 剪映 / CapCut |

### 最佳定位

> Remotion 不是 AE 的替代品，而是**程序化视频生产**的最佳工具。
> 它的威力在于"代码 + 数据 + AI"三者的结合，而非取代传统视频编辑软件。

一个常见的最佳实践是：
- **Remotion** 生成视觉素材和基础动画
- **传统剪辑软件**（DaVinci / Final Cut）做精剪和调色
- **AI Agent** 作为"导演"，串联整个流程

---

## 13. 最佳实践

### 动画

1. **始终用 `useCurrentFrame()` 驱动动画**——禁止使用 CSS `animation`、`transition` 或 `setTimeout`，它们无法被 Remotion 的渲染引擎正确捕获
2. **`spring()` 优于纯线性 `interpolate()`**——弹簧动画看起来更自然
3. **外推时用 `extrapolateRight: 'clamp'`**——避免值超出预期范围
4. **逐帧一致性**——同样的帧号必须产生同样的画面，这是可重现渲染的前提

### 性能

5. **用 `React.memo` 包裹子组件**——减少不必要的重渲染
6. **用 `useMemo` 缓存计算结果**——每一帧都会重新渲染组件
7. **用 `delayRender()` 处理异步数据**——等待数据加载完成再开始渲染
8. **大视频片段用 `<OffthreadVideo>`**——它在独立线程解码，不阻塞主线程
9. **批量渲染时不要逐帧计算相同数据**——提取到组件外部或 `useMemo`

### 代码组织

10. **场景拆分为独立组件**——每个场景一个组件文件，便于维护和 AI 修改
11. **用 `staticFile()` 引用 public/ 下的资源**——确保渲染时路径正确
12. **用 `<Sequence>` 控制时序**——不要手动偏移帧号
13. **TypeScript 优先**——类型系统能减少大量调试时间

### AI 辅助

14. **安装 Agent Skills**——让 AI 知道正确的 Remotion API
15. **提供风格参考图或详细描述**——模糊的需求导致模糊的输出
16. **一次只改一个场景**——让 AI 增量迭代，而不是一次性生成整个视频
17. **把完成的组件沉淀为模板**——下次 AI 可以直接复用

---

## 14. 学习资源汇总

### 官方资源

| 资源 | 链接 |
|---|---|
| 官方文档 | [remotion.dev/docs](https://www.remotion.dev/docs) |
| LLM 系统提示词 | [remotion.dev/llms.txt](https://www.remotion.dev/llms.txt) |
| 官方示例集合 | [remotion.dev/docs/resources](https://www.remotion.dev/docs/resources) |
| GitHub 仓库 | [github.com/remotion-dev/remotion](https://github.com/remotion-dev/remotion) |

### 推荐模板

| 模板 | 用途 |
|---|---|
| Blank（官方） | 最小启动模板，推荐学习起点 |
| Hello World（官方） | 基础示例 |
| [Prompt-to-Motion-Graphics](https://github.com/remotion-dev/template-prompt-to-motion-graphics-saas) | AI 驱动的动效生成 SaaS 模板 |
| [claude-remotion-kickstart](https://github.com/jhartquist/claude-remotion-kickstart) | Claude Code 视频制作全套组件 |

### 社区与教程

| 资源 | 链接 |
|---|---|
| Agent Skills（官方） | `npx skills add remotion-dev/skills` |
| Best Practices Skill | `npx skills add remotion-best-practices` |
| DeepWiki（Remotion 源码分析） | [deepwiki.com/remotion-dev/remotion](https://deepwiki.com/remotion-dev/remotion) |

### 中文教程

| 资源 | 说明 |
|---|---|
| [blog.gitcode.com](https://blog.gitcode.com) 系列 | Remotion 模板系统、数据可视化、AI 视频生成中文指南 |
| [juejin.cn](https://juejin.cn) 系列 | 开源项目介绍、实战教程 |
| [腾讯云开发者](https://cloud.tencent.cn/developer/article/2639527) | Remotion Skills + Claude Code 深度解析 |
| [segmentfault.com](https://segmentfault.com) | 音乐波形可视化实战 |

---

## 附录：常用代码片段速查

### 淡入淡出

```tsx
const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
```

### 从下方滑入

```tsx
const y = spring({ frame, fps, from: 100, to: 0, config: { damping: 12 } });
```

### 缩放弹入

```tsx
const scale = spring({ frame, fps, config: { damping: 10, stiffness: 150 } });
```

### 旋转

```tsx
const rotate = interpolate(frame, [0, 300], [0, 360]);
```

### 打字机效果

```tsx
const visibleChars = Math.floor(interpolate(frame, [0, 60], [0, text.length]));
const displayText = text.slice(0, visibleChars);
```

### 脉冲效果

```tsx
const pulse = 1 + Math.sin(frame * 0.1) * 0.05;
// transform: `scale(${pulse})`
```

### 模糊到清晰

```tsx
const blur = interpolate(frame, [0, 30], [20, 0], { extrapolateRight: 'clamp' });
// filter: `blur(${blur}px)`
```

---

*文档基于 Remotion 官方文档（2026 版）、社区实践及搜索引擎公开资料整理。*
*Remotion 官方文档：[remotion.dev/docs](https://www.remotion.dev/docs)*

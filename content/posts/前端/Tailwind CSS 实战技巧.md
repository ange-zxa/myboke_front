用 Tailwind CSS 写了两年样式，踩过不少坑，也积累了一些实用的技巧，记录一下。

首先是组件样式的组织。当 className 超过 10 个时，可读性会急剧下降。我的做法是按"布局 → 尺寸 → 外观 → 交互"的顺序排列类名，这样一眼就能看出这个元素的结构。比如 `flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:shadow-md`，这个顺序能让你快速定位到需要修改的属性。

其次是善用 `@apply` 但不要滥用。重复出现的样式组合（比如按钮的基础样式）用 `@apply` 抽成一个类很合理。但如果只是为了"不想写太多类名"而用 `@apply`，反而失去了 Tailwind 的优势。我一般只在 3 个以上元素共享完全相同样式时才考虑抽取。

Tailwind v4 带来的 CSS-first 配置方式也很值得升级。告别了 `tailwind.config.ts` 中的 JavaScript 配置，改用原生 CSS 的 `@theme` 指令来定义设计 token。这样不仅配置文件更简洁，而且编辑器对 CSS 变量补全的支持通常比 JS 配置更好。

最后一个容易被忽略的技巧：`group-*` 和 `peer-*` 修饰符。它们能让你在不写一行 JS 的情况下实现很多常用的交互效果。比如鼠标悬停一个卡片时让子元素的另一个子元素改变样式，用 `group-hover:block` 就能搞定。

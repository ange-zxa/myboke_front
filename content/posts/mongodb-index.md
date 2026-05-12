---
title: "MongoDB 索引优化实践"
date: "2026-05-13"
tags: ["mongodb", "数据库", "后端"]
category: "技术"
excerpt: "合理的索引设计是 MongoDB 性能优化的关键，本文总结常见的索引类型和优化策略。"
---

## MongoDB 索引优化实践

索引是提升数据库查询性能的核心手段。MongoDB 支持多种索引类型，合理使用可以大幅提高查询效率。

### 单字段索引

最基础的索引类型，对单个字段创建：

```javascript
// 为 postSlug 字段创建升序索引
db.comments.createIndex({ postSlug: 1 })
```

在 Spring Data MongoDB 中，可以使用 `@Indexed` 注解：

```java
@Document(collection = "comments")
public class Comment {
    @Indexed
    private String postSlug;
}
```

### 复合索引

当查询条件涉及多个字段时，复合索引能显著提升性能：

```javascript
db.comments.createIndex({ postSlug: 1, createdAt: -1 })
```

这个索引可以高效支持 "按文章查询评论并按时间倒序排列" 的场景。

### 索引优化原则

1. **优先为高频查询字段创建索引** — 观察应用的查询模式
2. **避免过多索引** — 每个索引都会占用存储空间并影响写入性能
3. **定期分析慢查询** — 使用 `explain()` 检查查询是否命中索引
4. **覆盖索引** — 尽量让查询只通过索引就能返回结果，避免回表

### 使用 explain 分析查询

```javascript
db.comments.find({ postSlug: "hello-world" })
  .sort({ createdAt: -1 })
  .explain("executionStats")
```

关注 `IXSCAN` vs `COLLSCAN`，前者走索引，后者是全表扫描。

### 总结

索引设计不是一劳永逸的，需要根据实际查询模式和业务增长持续优化。建议定期审查慢查询日志，及时调整索引策略。

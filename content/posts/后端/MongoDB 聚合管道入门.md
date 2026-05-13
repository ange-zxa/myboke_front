MongoDB 的聚合管道（Aggregation Pipeline）是处理数据最强大的工具之一，但对于从 SQL 转过来的开发者来说，思维方式需要一些转变。

聚合管道的核心思想是把数据处理拆成多个阶段，每个阶段做一件事，数据像流水线一样依次经过各个阶段。常见的阶段包括：

- `$match` — 过滤文档，相当于 SQL 的 WHERE
- `$group` — 分组聚合，相当于 GROUP BY
- `$sort` — 排序
- `$project` — 字段投影，决定输出哪些字段
- `$lookup` — 关联查询，相当于 JOIN
- `$unwind` — 展开数组，把数组元素变成独立文档

一个常见的坑是阶段顺序。`$match` 和 `$sort` 如果能在有索引的字段上尽早执行，性能会好很多。因为 MongoDB 会把 `$match` 的结果尽早缩小，后续阶段处理的数据量就少了。所以我习惯在管道的开头放 `$match`，然后是 `$sort`，再做 `$group` 和 `$lookup`。

另一个实用技巧是用 `$facet` 在一个查询中做多个维度的聚合。比如你要同时拿到总数、按状态分组统计、按时间分组统计，以前可能需要三个查询，现在一个 `$facet` 就全搞定了。这在做数据看板类功能的时候特别有用。

在 Spring Data MongoDB 中，你可以用 `Aggregation.newAggregation()` 来构建管道，或者用 Repository 上的 `@Aggregation` 注解来声明。我个人推荐简单的聚合用注解，复杂的用 Java API 动态构建。

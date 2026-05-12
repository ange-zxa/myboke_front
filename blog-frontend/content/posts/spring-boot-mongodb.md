---
title: "Spring Boot 集成 MongoDB 实践"
date: "2026-05-08"
tags: ["springboot", "java", "mongodb", "后端"]
category: "技术"
excerpt: "介绍如何在 Spring Boot 项目中集成 MongoDB，包括配置、CRUD 操作和最佳实践。"
---

## Spring Boot 集成 MongoDB

Spring Data MongoDB 提供了与 MongoDB 交互的简洁方式。

### 添加依赖

在 `pom.xml` 中添加：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

### 配置连接

在 `application.yml` 中配置 MongoDB 连接：

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/blog
```

### 定义文档模型

使用 `@Document` 注解定义 MongoDB 文档：

```java
@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String postSlug;
    private String author;
    private String content;
    private Date createdAt;
}
```

### 创建 Repository

Spring Data MongoDB 提供了自动实现：

```java
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByPostSlugOrderByCreatedAtDesc(String postSlug);
}
```

### REST API 实现

```java
@RestController
@RequestMapping("/api/comments")
public class CommentController {
    
    @GetMapping
    public List<Comment> getComments(@RequestParam String postSlug) {
        return commentService.getComments(postSlug);
    }
    
    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }
}
```

### 总结

Spring Data MongoDB 大大简化了与 MongoDB 的交互，配合 Spring Boot 可以快速构建 REST API。

最近接手了几个 Spring Boot 项目，发现每个项目的包结构都不一样，维护起来很头疼。整理一下我认为比较合理的项目结构设计。

核心原则是按功能模块分包，而不是按技术层分包。传统的 controller/service/repository 分包方式在小项目中还行，但一旦业务复杂度上来，找个功能相关的代码要在三个包之间横跳。我现在的做法是：

```
com.example.demo/
├── user/
│   ├── UserController.java
│   ├── UserService.java
│   └── UserRepository.java
├── order/
│   ├── OrderController.java
│   ├── OrderService.java
│   └── OrderRepository.java
└── common/
    ├── config/
    └── exception/
```

这样每个功能模块是自包含的，改用户相关的功能只需关注 `user/` 目录。

另一个容易忽略的是异常处理。不要在 Controller 层到处写 try-catch，应该用 `@ControllerAdvice` 统一处理。配合自定义业务异常类，可以让 Controller 代码专注于参数校验和结果返回。

关于依赖注入，我倾向于构造器注入而不是字段注入。虽然 Lombok 的 `@RequiredArgsConstructor` 写起来很方便，但在单元测试中构造器注入的优势很明显——你可以清楚地看到这个类依赖了什么，而不是面对一个隐式的依赖黑盒。

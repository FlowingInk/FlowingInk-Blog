# Go 后端第一阶段方案：先写基础 HTTP 接口，后续再转 RPC

## 目标

当前阶段的目标不是一步到位把后端做成 RPC，而是先用 `Go + Gin` 把最基础的接口写起来，熟悉：

- Go 项目结构
- Gin 路由与 handler
- 参数读取与 JSON 返回
- 简单的 service / repository 分层
- 前后端本地联调

等对 Go 和 Gin 更熟悉之后，再把对外接口层逐步从 HTTP 迁移到 RPC。

## 为什么先走 HTTP

对于刚上手 Go 的阶段，先写 HTTP 接口更合适：

- 上手门槛更低
- 调试方式更直接
- 更容易理解请求 -> handler -> service 的流程
- 不会过早引入 Protobuf、代码生成、RPC 框架等额外复杂度

这条路线不会浪费后续工作。只要现在分层做得干净，后面切 RPC 时，主要替换的是 `transport` 层，`service` 和 `repository` 层仍然可以继续复用。

## 当前仓库结构

当前仓库已经是 monorepo 结构：

```text
flowingink-blog/
  apps/
    web/
    api/
  packages/
    contracts/
```

其中：

- `apps/web`：当前前端应用
- `apps/api`：未来 Go 后端应用
- `packages/contracts`：未来前后端共享契约（等后面转 RPC 时再重点使用）

## 第一阶段建议路线

建议按下面顺序推进：

### 1. 初始化 Go module

在 `apps/api` 下初始化 Go 项目，而不是在仓库根目录初始化。

推荐命令：

```bash
go mod init github.com/FlowingInk/flowingink-blog/apps/api
```

如果暂时不确定最终仓库路径，也可以先用本地 module 名，但更推荐直接用未来真实路径，避免后续 import 路径变动。

### 2. 先引入 Gin

第一阶段只需要先让 Gin 跑起来：

```bash
go get github.com/gin-gonic/gin
go mod tidy
```

这一步先不要急着接入 RPC。

### 3. 先跑通一个最小服务

第一版先实现：

- 一个可以启动的 `main.go`
- 一个 Gin app
- 一个 `GET /healthz` 接口

只要这一步跑通，就说明 `apps/api` 已经是一个可运行的 Go 服务了。

## apps/api 目录职责

建议沿用当前骨架目录，按下面职责使用。

### `cmd/server`

放后端启动入口。

建议后续创建：

```text
apps/api/cmd/server/main.go
```

职责：

- 读取配置
- 初始化 Gin
- 调用 bootstrap 装配依赖
- 启动服务

### `internal/bootstrap`

放启动阶段的组装逻辑。

职责：

- 创建 Gin 实例
- 注册中间件
- 注册路由
- 创建 service / repository 实例
- 把依赖组装起来

### `internal/config`

放配置相关逻辑。

职责：

- 读取环境变量
- 定义配置结构体
- 提供端口、数据库连接等配置

### `internal/middleware`

放 Gin 中间件。

第一阶段可以先留空，后面逐步加：

- 日志
- 恢复 panic
- CORS
- 鉴权

### `internal/transport/http`

放普通 HTTP 接口。

第一阶段的主要接口都放这里。

建议后续拆成：

- `health.go`
- `profile.go`
- `post.go`

### `internal/service`

放业务逻辑。

职责：

- 组织业务流程
- 给 handler 提供可调用能力
- 尽量不依赖 Gin 本身

### `internal/repository`

放数据访问逻辑。

第一阶段如果还没有数据库，可以先写：

- 内存数据
- 假数据
- 静态切片

### `internal/domain`

放核心业务对象。

如果当前只是练手阶段，这一层可以先很轻，不用一开始设计得太复杂。

## 第一阶段建议先写的接口

建议先从最简单的读接口开始：

### `GET /healthz`

作用：

- 检查服务是否启动成功
- 方便前端或浏览器快速验证服务状态

### `GET /api/v1/profile`

作用：

- 返回博客主页上的个人信息
- 适合练习 JSON 返回

### `GET /api/v1/posts`

作用：

- 返回文章列表
- 适合练习数组响应与 service 分层

### `GET /api/v1/posts/:id`

作用：

- 返回单篇文章详情
- 适合练习路径参数

这四个接口足够你先把基础开发流程跑顺。

## 推荐的调用关系

建议从第一版开始就保持下面这条链路：

```text
HTTP Request
  -> transport/http handler
  -> service
  -> repository
```

这样做的好处是，后面切换 RPC 时可以变成：

```text
RPC Request
  -> transport/rpc handler
  -> service
  -> repository
```

也就是说：

- `service` 复用
- `repository` 复用
- 主要替换的是对外接口层

## 当前阶段应该避免的写法

### 不要把业务逻辑全塞进 handler

handler 最好只负责：

- 读取参数
- 调用 service
- 组织响应

不要把复杂业务判断都写在 Gin 路由函数里。

### 不要让 service 依赖 `gin.Context`

尽量不要把 `gin.Context` 往 service 层传。

推荐做法：

- handler 从 `gin.Context` 读取参数
- 把普通参数传给 service

这样以后从 HTTP 切到 RPC 时更容易复用 service。

### 不要直接把数据库模型裸返回给前端

即使第一阶段还没有数据库，也建议养成习惯：

- 内部模型和接口响应最好分开
- 不要让前端耦合后端内部结构

## 前后端联调建议

建议本地开发端口：

- 前端：`3000`
- 后端：`8080`

前端通过 Vite proxy 代理到 Go 服务，优先走相对路径请求，例如：

```text
/api/v1/posts
```

这样可以避免本地开发阶段直接处理 CORS。

## 什么时候再转 RPC

建议在你满足下面几个条件后再转：

- 已经能熟练写 Gin handler
- 已经理解 service / repository 分层
- 已经能独立新增和调试几个接口
- 已经跑通过一套前后端联调流程

这时再引入：

- Protobuf
- Buf
- Connect RPC
- `packages/contracts`

会更顺，也更容易理解每一层在做什么。

## 从 HTTP 迁移到 RPC 时的思路

后续迁移时，尽量不要推倒重来，而是这样演进：

### 保留

- `service`
- `repository`
- 大部分业务逻辑

### 新增

- `packages/contracts/proto`
- `apps/api/internal/transport/rpc`
- Go / TS 的生成代码

### 渐进替换

- 先保留老 HTTP 接口
- 逐步增加 RPC 接口
- 前端逐步切到新接口

## 最小落地顺序

建议按这个顺序做：

1. 在 `apps/api` 执行 `go mod init`
2. 安装 `gin`
3. 创建 `cmd/server/main.go`
4. 跑通 `GET /healthz`
5. 增加 `GET /api/v1/profile`
6. 增加 `GET /api/v1/posts`
7. 增加 `GET /api/v1/posts/:id`
8. 前端接入 `fetch`
9. 熟悉之后再规划 RPC 改造

## 第二阶段再做的事

以下内容建议留到后面：

- 接数据库
- 引入认证
- 引入 Protobuf
- 接入 Connect RPC
- 补 `packages/contracts` 的正式契约文件
- 统一生成前后端类型

## 一句话结论

你现在最适合的做法是：

**先把 `apps/api` 当成一个普通 Gin HTTP 服务来练手，先跑通基础接口和分层，再在后续稳定演进到 RPC。**

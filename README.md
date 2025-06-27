# XCamp博客网站

一个基于Vue.js前端和Express后端的全栈博客项目，用于展示XCamp团队的项目和技术资源。

## 技术栈

### 前端
- Vue.js 3
- Vue Router
- SCSS
- GSAP (动画)
- Tailwind CSS

### 后端
- Node.js
- Express
- SQLite3
- Sequelize ORM
- Swagger (API文档)

## 功能特点

- 响应式设计，适配各种屏幕尺寸
- 项目展示功能，支持分类筛选
- 技术资源分享，按类别组织
- 团队成员展示
- 流畅的动画效果
- 完整的RESTful API
- 使用SQLite数据库存储动态内容

## 项目结构

```
xcamp-blog/
├── public/             # 静态资源
├── server/             # 后端服务
│   ├── controllers/    # 控制器
│   ├── db/             # 数据库
│   ├── models/         # 数据模型
│   ├── routes/         # 路由
│   └── server.js       # 服务器入口
├── src/                # 前端源码
│   ├── components/     # 组件
│   ├── styles/         # 样式
│   ├── utils/          # 工具函数
│   ├── views/          # 视图
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── router.js       # 路由配置
└── package.json        # 项目配置
```

## 安装与运行

### 安装依赖

```bash
npm install
```

### 初始化数据库

```bash
npm run seed
```

### 运行开发服务器

前端开发服务器：

```bash
npm run dev
```

后端服务器：

```bash
npm run server
```

或者使用开发模式（自动重启）：

```bash
npm run server:dev
```

### 构建生产版本

```bash
npm run build
```

## API文档

API文档可在运行后端服务器后访问：

```
http://localhost:5000/api-docs
```

## 数据库

项目使用SQLite数据库存储项目和资源数据，数据库文件位于`server/db/database.sqlite`。

### 数据模型

#### 项目

- id: 项目ID
- title: 项目标题
- description: 项目描述
- icon: 项目图标
- color: 项目颜色
- category: 项目分类
- tags: 项目标签
- link: 项目链接

#### 资源

- id: 资源ID
- title: 资源标题
- description: 资源描述
- type: 资源类型
- category: 资源分类
- date: 发布日期
- author: 作者
- link: 资源链接

## 许可证

MIT

## 联系我们

- 网站: [XCamp官网](https://xcamp.cn)
- GitHub: [https://github.com/lingfeng11111/xcamp-blog](https://github.com/lingfeng11111/xcamp-blog)

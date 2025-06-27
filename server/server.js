import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// 导入路由
import projectRoutes from './routes/projects.js';
import resourceRoutes from './routes/resources.js';

// 导入数据库初始化
import db from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger 配置
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Xcamp Blog API',
      version: '1.0.0',
      description: '用于管理项目和资源的API',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./server/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 设置静态文件夹
app.use(express.static(path.join(__dirname, '../dist')));

// API文档路由
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// API路由
app.use('/api/projects', projectRoutes);
app.use('/api/resources', resourceRoutes);

// 前端路由处理（SPA）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 初始化数据库并启动服务器
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('数据库已连接并同步');
    app.listen(PORT, () => {
      console.log(`服务器运行在 http://localhost:${PORT}`);
      console.log(`API文档可在 http://localhost:${PORT}/api-docs 查看`);
    });
  })
  .catch((err) => {
    console.error('数据库连接失败:', err);
  });

export default app; 
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置数据库连接
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../db/database.sqlite'),
  logging: false, // 设置为true可以在控制台看到SQL查询
});

// 创建数据库对象
const db = {};

// 添加Sequelize实例和类到数据库对象
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 导入模型
import ProjectModel from './project.js';
import ResourceModel from './resource.js';

// 初始化模型
db.projects = ProjectModel(sequelize, Sequelize);
db.resources = ResourceModel(sequelize, Sequelize);

// 设置模型之间的关系（如果有的话）
// 例如：db.projects.hasMany(db.comments);

export default db; 
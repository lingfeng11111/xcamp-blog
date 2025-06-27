import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByCategory,
} from '../controllers/projects.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           description: 项目的自动生成ID
 *         title:
 *           type: string
 *           description: 项目标题
 *         description:
 *           type: string
 *           description: 项目描述
 *         icon:
 *           type: string
 *           description: 项目图标(Emoji)
 *         color:
 *           type: string
 *           description: 项目颜色(十六进制)
 *         category:
 *           type: string
 *           description: 项目分类
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: 项目标签
 *         link:
 *           type: string
 *           description: 项目链接
 *         createdAt:
 *           type: string
 *           format: date
 *           description: 创建日期
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: 更新日期
 */

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: 项目管理API
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: 获取所有项目
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: 成功获取项目列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: 服务器错误
 */
router.get('/', getAllProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: 根据ID获取项目
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 项目ID
 *     responses:
 *       200:
 *         description: 成功获取项目
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: 项目未找到
 *       500:
 *         description: 服务器错误
 */
router.get('/:id', getProjectById);

/**
 * @swagger
 * /api/projects/category/{category}:
 *   get:
 *     summary: 根据分类获取项目
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: 项目分类
 *     responses:
 *       200:
 *         description: 成功获取项目
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: 服务器错误
 */
router.get('/category/:category', getProjectsByCategory);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: 创建新项目
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: 项目创建成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: 无效的请求
 *       500:
 *         description: 服务器错误
 */
router.post('/', createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: 更新项目
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 项目ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: 项目更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: 项目未找到
 *       500:
 *         description: 服务器错误
 */
router.put('/:id', updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: 删除项目
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 项目ID
 *     responses:
 *       200:
 *         description: 项目删除成功
 *       404:
 *         description: 项目未找到
 *       500:
 *         description: 服务器错误
 */
router.delete('/:id', deleteProject);

export default router; 
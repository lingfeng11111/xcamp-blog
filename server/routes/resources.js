import express from 'express';
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  getResourcesByCategory,
} from '../controllers/resources.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - type
 *         - category
 *         - date
 *         - author
 *       properties:
 *         id:
 *           type: integer
 *           description: 资源的自动生成ID
 *         title:
 *           type: string
 *           description: 资源标题
 *         description:
 *           type: string
 *           description: 资源描述
 *         type:
 *           type: string
 *           description: 资源类型
 *         category:
 *           type: string
 *           description: 资源分类
 *         date:
 *           type: string
 *           description: 发布日期
 *         author:
 *           type: string
 *           description: 作者名称
 *         link:
 *           type: string
 *           description: 资源链接
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
 *   name: Resources
 *   description: 资源管理API
 */

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: 获取所有资源
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: 成功获取资源列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       500:
 *         description: 服务器错误
 */
router.get('/', getAllResources);

/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: 根据ID获取资源
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 资源ID
 *     responses:
 *       200:
 *         description: 成功获取资源
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: 资源未找到
 *       500:
 *         description: 服务器错误
 */
router.get('/:id', getResourceById);

/**
 * @swagger
 * /api/resources/category/{category}:
 *   get:
 *     summary: 根据分类获取资源
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: 资源分类
 *     responses:
 *       200:
 *         description: 成功获取资源
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       500:
 *         description: 服务器错误
 */
router.get('/category/:category', getResourcesByCategory);

/**
 * @swagger
 * /api/resources:
 *   post:
 *     summary: 创建新资源
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: 资源创建成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: 无效的请求
 *       500:
 *         description: 服务器错误
 */
router.post('/', createResource);

/**
 * @swagger
 * /api/resources/{id}:
 *   put:
 *     summary: 更新资源
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 资源ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       200:
 *         description: 资源更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: 资源未找到
 *       500:
 *         description: 服务器错误
 */
router.put('/:id', updateResource);

/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: 删除资源
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 资源ID
 *     responses:
 *       200:
 *         description: 资源删除成功
 *       404:
 *         description: 资源未找到
 *       500:
 *         description: 服务器错误
 */
router.delete('/:id', deleteResource);

export default router; 
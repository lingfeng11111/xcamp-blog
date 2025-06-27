import db from '../models/index.js';
const Project = db.projects;

// 获取所有项目
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    return res.status(200).json(projects);
  } catch (error) {
    console.error('获取项目失败:', error);
    return res.status(500).json({ message: '获取项目失败', error: error.message });
  }
};

// 获取单个项目
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: '项目未找到' });
    }
    
    return res.status(200).json(project);
  } catch (error) {
    console.error('获取项目失败:', error);
    return res.status(500).json({ message: '获取项目失败', error: error.message });
  }
};

// 创建新项目
export const createProject = async (req, res) => {
  try {
    const { title, description, icon, color, category, tags, link } = req.body;
    
    // 验证必填字段
    if (!title || !description || !category) {
      return res.status(400).json({ message: '标题、描述和分类为必填项' });
    }
    
    const newProject = await Project.create({
      title,
      description,
      icon: icon || '🚀',
      color: color || '#4CAF50',
      category,
      tags: tags || [],
      link: link || '#'
    });
    
    return res.status(201).json(newProject);
  } catch (error) {
    console.error('创建项目失败:', error);
    return res.status(500).json({ message: '创建项目失败', error: error.message });
  }
};

// 更新项目
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, color, category, tags, link } = req.body;
    
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: '项目未找到' });
    }
    
    await project.update({
      title: title || project.title,
      description: description || project.description,
      icon: icon || project.icon,
      color: color || project.color,
      category: category || project.category,
      tags: tags || project.tags,
      link: link || project.link
    });
    
    return res.status(200).json(project);
  } catch (error) {
    console.error('更新项目失败:', error);
    return res.status(500).json({ message: '更新项目失败', error: error.message });
  }
};

// 删除项目
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: '项目未找到' });
    }
    
    await project.destroy();
    
    return res.status(200).json({ message: '项目删除成功' });
  } catch (error) {
    console.error('删除项目失败:', error);
    return res.status(500).json({ message: '删除项目失败', error: error.message });
  }
};

// 根据分类获取项目
export const getProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const projects = await Project.findAll({
      where: { category }
    });
    
    return res.status(200).json(projects);
  } catch (error) {
    console.error('获取项目失败:', error);
    return res.status(500).json({ message: '获取项目失败', error: error.message });
  }
}; 
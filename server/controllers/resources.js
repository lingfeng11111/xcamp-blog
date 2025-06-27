import db from '../models/index.js';

const Resource = db.resources;

// 获取所有资源
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();
    return res.status(200).json(resources);
  } catch (error) {
    console.error('获取资源失败:', error);
    return res.status(500).json({ message: '获取资源失败', error: error.message });
  }
};

// 获取单个资源
export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByPk(id);
    
    if (!resource) {
      return res.status(404).json({ message: '资源未找到' });
    }
    
    return res.status(200).json(resource);
  } catch (error) {
    console.error('获取资源失败:', error);
    return res.status(500).json({ message: '获取资源失败', error: error.message });
  }
};

// 创建新资源
export const createResource = async (req, res) => {
  try {
    const { title, description, type, category, date, author, link } = req.body;
    
    // 验证必填字段
    if (!title || !description || !type || !category || !date || !author) {
      return res.status(400).json({ message: '标题、描述、类型、分类、日期和作者为必填项' });
    }
    
    const newResource = await Resource.create({
      title,
      description,
      type,
      category,
      date,
      author,
      link: link || '#'
    });
    
    return res.status(201).json(newResource);
  } catch (error) {
    console.error('创建资源失败:', error);
    return res.status(500).json({ message: '创建资源失败', error: error.message });
  }
};

// 更新资源
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, category, date, author, link } = req.body;
    
    const resource = await Resource.findByPk(id);
    
    if (!resource) {
      return res.status(404).json({ message: '资源未找到' });
    }
    
    await resource.update({
      title: title || resource.title,
      description: description || resource.description,
      type: type || resource.type,
      category: category || resource.category,
      date: date || resource.date,
      author: author || resource.author,
      link: link || resource.link
    });
    
    return res.status(200).json(resource);
  } catch (error) {
    console.error('更新资源失败:', error);
    return res.status(500).json({ message: '更新资源失败', error: error.message });
  }
};

// 删除资源
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByPk(id);
    
    if (!resource) {
      return res.status(404).json({ message: '资源未找到' });
    }
    
    await resource.destroy();
    
    return res.status(200).json({ message: '资源删除成功' });
  } catch (error) {
    console.error('删除资源失败:', error);
    return res.status(500).json({ message: '删除资源失败', error: error.message });
  }
};

// 根据分类获取资源
export const getResourcesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const resources = await Resource.findAll({
      where: { category }
    });
    
    return res.status(200).json(resources);
  } catch (error) {
    console.error('获取资源失败:', error);
    return res.status(500).json({ message: '获取资源失败', error: error.message });
  }
}; 
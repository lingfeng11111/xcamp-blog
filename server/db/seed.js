import db from '../models/index.js';

const seedDatabase = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log('数据库已重置');

    // 创建项目数据
    const projects = [
      {
        title: '智能学习平台',
        description: '基于AI的自适应学习平台，根据学生的学习能力和进度自动调整课程内容和难度。',
        icon: '🚀',
        color: '#4CAF50',
        category: '应用',
        tags: ['Vue.js', 'Python', 'TensorFlow'],
        link: '#'
      },
      {
        title: '数据可视化平台',
        description: '一个强大的数据可视化平台，帮助企业洞察数据价值，做出明智决策。',
        icon: '📊',
        color: '#8BC34A',
        category: '网站',
        tags: ['D3.js', 'Vue.js', 'Dashboard'],
        link: '#'
      },
      {
        title: '开发者工具包',
        description: '为开发者提供的一套高效工具，包括代码生成、格式化和测试功能。',
        icon: '🛠️',
        color: '#388E3C',
        category: '工具',
        tags: ['JavaScript', 'Developer Tools', 'Productivity'],
        link: '#'
      },
      {
        title: '开源组件库',
        description: '一套精美的UI组件库，包含上百个可复用组件，帮助开发者快速构建应用。',
        icon: '🧩',
        color: '#66BB6A',
        category: '开源',
        tags: ['Vue.js', 'SCSS', 'TypeScript'],
        link: '#'
      },
      {
        title: '电商管理系统',
        description: '一站式电商管理解决方案，包括订单管理、库存管理和客户关系管理。',
        icon: '🛒',
        color: '#43A047',
        category: '网站',
        tags: ['E-commerce', 'Management', 'Dashboard'],
        link: '#'
      },
      {
        title: '内容管理系统',
        description: '现代化的内容管理系统，支持多种内容格式，拥有强大的编辑和发布功能。',
        icon: '📝',
        color: '#2E7D32',
        category: '工具',
        tags: ['CMS', 'Content', 'Management'],
        link: '#'
      }
    ];

    await db.projects.bulkCreate(projects);
    console.log('项目数据已创建');

    // 创建资源数据
    const tutorialResources = [
      {
        title: 'Vue.js 高级组件设计模式',
        description: '深入探讨Vue组件的设计模式，包括组合、继承、插槽和依赖注入等高级技巧。',
        type: '前端开发',
        category: '教程',
        date: '2023-06-15',
        author: '张明',
        link: '#'
      },
      {
        title: '构建高性能微服务架构',
        description: '从零开始构建可扩展、高性能的微服务系统，包括服务发现、负载均衡和故障恢复。',
        type: '后端开发',
        category: '教程',
        date: '2023-05-28',
        author: '李华',
        link: '#'
      },
      {
        title: '使用GSAP创建流畅网页动画',
        description: '学习如何使用GSAP动画库创建各种复杂的交互动画，提升用户体验。',
        type: '前端开发',
        category: '教程',
        date: '2023-04-10',
        author: '陈强',
        link: '#'
      }
    ];

    const toolResources = [
      {
        title: '前端开发者必备工具集',
        description: '精选的前端开发工具和扩展，帮助你提高开发效率和代码质量。',
        type: '工具集',
        category: '工具',
        date: '2023-06-02',
        author: '陈强',
        link: '#'
      },
      {
        title: '后端开发自动化工具',
        description: '介绍提高后端开发效率的自动化工具，包括CI/CD、测试和部署工具。',
        type: '工具集',
        category: '工具',
        date: '2023-05-15',
        author: '林小雨',
        link: '#'
      },
      {
        title: 'UI设计师工具箱',
        description: '汇集了优秀的设计工具和资源，帮助设计师创建出色的用户界面。',
        type: '设计工具',
        category: '工具',
        date: '2023-04-22',
        author: '王芳',
        link: '#'
      }
    ];

    const learningResources = [
      {
        title: '前端开发学习路线图',
        description: '从初学者到高级工程师的完整学习路线，包含各阶段需要掌握的技能和资源。',
        type: '学习资源',
        category: '资源',
        date: '2023-06-20',
        author: 'Xcamp团队',
        link: '#'
      },
      {
        title: '开源项目精选集',
        description: '精选的优质开源项目，适合学习和实践，覆盖前端、后端和移动开发。',
        type: '开源资源',
        category: '资源',
        date: '2023-05-10',
        author: 'Xcamp团队',
        link: '#'
      },
      {
        title: '技术书籍推荐',
        description: '精选的技术书籍推荐，涵盖编程语言、架构设计、算法和软件工程等多个领域。',
        type: '学习资源',
        category: '资源',
        date: '2023-04-05',
        author: 'Xcamp团队',
        link: '#'
      }
    ];

    const resources = [...tutorialResources, ...toolResources, ...learningResources];
    await db.resources.bulkCreate(resources);
    console.log('资源数据已创建');

    console.log('数据库初始化完成');
  } catch (error) {
    console.error('数据库初始化失败:', error);
  } finally {
    // 不要关闭连接，让应用继续使用
  }
};

export default seedDatabase; 
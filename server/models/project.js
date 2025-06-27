export default (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        defaultValue: '🚀',
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: '#4CAF50',
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.JSON, // 存储标签数组
        allowNull: false,
        defaultValue: [],
      },
      link: {
        type: DataTypes.STRING,
        defaultValue: '#',
      },
    },
    {
      timestamps: true, // 添加 createdAt 和 updatedAt
    }
  );

  return Project;
}; 
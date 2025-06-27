export default (sequelize, DataTypes) => {
  const Resource = sequelize.define(
    'Resource',
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '分类：教程、工具、资源等',
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
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

  return Resource;
}; 
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    iconName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Category;
};

module.exports = function(sequelize, DataTypes) {
  var UserCategory = sequelize.define("UserCategory", {
    category: {
      type: DataTypes.STRING
    }
  });

  UserCategory.associate = function(models) {
    UserCategory.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  UserCategory.associate = function(models) {
    UserCategory.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return UserCategory;
};

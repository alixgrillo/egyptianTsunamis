module.exports = function(sequelize, DataTypes) {
  var UserCategory = sequelize.define("UserCategory", {
    category: {
      type: DataTypes.STRING
    }
  });
  return UserCategory;
};

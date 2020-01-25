module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  });
  return User;
};

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING
    },
    googleId: {
      type: DataTypes.STRING
    }
  });
  return User;
};

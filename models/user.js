module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Charity, {
      onDelete: "cascade"
    });
  };

  User.associate = function(models) {
    User.hasMany(models.UserCategory, {
      onDelete: "cascade"
    });
  };

  return User;
};

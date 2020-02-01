module.exports = function(sequelize, DataTypes) {
  var Charity = sequelize.define("Charity", {
    charityEin: {
      type: DataTypes.STRING,
      validate: {
        len: [9]
      }
    },
    donatesTo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  });

  Charity.associate = function(models) {
    Charity.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Charity;
};

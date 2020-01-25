module.exports = function(sequelize, DataTypes) {
  var Charity = sequelize.define("Charity", {
    charityName: {
      type: DataTypes.STRING
    },
    charityEin: {
      type: DataTypes.STRING
    },
    donatesTo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  });
  return Charity;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Locker extends Model {}
  Locker.init(
    {
      UserId: DataTypes.INTEGER
    },
    { sequelize }
  );

  Locker.associate = function(models) {
    // associations can be defined here
    Locker.belongsTo(models.User);
  };
  return Locker;
};

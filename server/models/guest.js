"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Guest extends Model {}

  Guest.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER
    },
    { sequelize }
  );

  Guest.associate = function(models) {
    // associations can be defined here
    Guest.belongsTo(models.User);
  };
  return Guest;
};

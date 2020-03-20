"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Guest extends Model {}

  Guest.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    { sequelize }
  );

  Guest.associate = function(models) {
    // associations can be defined here
  };
  return Guest;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Admin extends Model {}
  Admin.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    { sequelize }
  );

  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};

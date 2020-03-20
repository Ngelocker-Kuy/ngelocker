"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class User extends Model {}
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      LockerId: DataTypes.Integer
    },
    { sequelize }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Locker);
  };
  return User;
};

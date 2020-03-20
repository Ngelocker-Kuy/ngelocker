"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Admin extends Model {}
  Admin.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "please fill name"
          },
          notNull: {
            args: true,
            msg: "please enter your name"
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "please fill username"
          },
          notNull: {
            args: true,
            msg: "please enter your username"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "please fill password"
          },
          notNull: {
            args: true,
            msg: "please enter your password"
          }
        }
      }
    },
    { sequelize }
  );

  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};

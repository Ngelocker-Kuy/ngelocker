"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Guest extends Model {}

  Guest.init(
    {
      name: {
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
      },
      phoneNumber: {
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
      },
      status: {
        type: DataTypes.BOOLEAN,
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
      },
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

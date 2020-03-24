"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Guest extends Model { }

  Guest.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please Fill Name"
          },
          notNull: {
            args: true,
            msg: "Please Enter Your Name"
          }
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please Fill Phone Number"
          },
          notNull: {
            args: true,
            msg: "Please Enter Your Phone Number"
          }
        }
      },
      status: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER
    },
    { sequelize }
  );

  Guest.associate = function (models) {
    // associations can be defined here
    Guest.belongsTo(models.User);
  };
  return Guest;
};

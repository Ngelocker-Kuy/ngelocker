"use strict";
let bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class User extends Model { }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please Fill Email"
          },
          notNull: {
            args: true,
            msg: "Please Enter Your Email"
          },

          isEmail: {
            args: true,
            msg: "Incorrect Format Email"
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please Fill Username"
          },
          notNull: {
            args: true,
            msg: "Please Enter Your Username"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please Fill Password"
          },
          notNull: {
            args: true,
            msg: "Please Enter Your Password"
          },
          len: {
            args: [6, 14],
            msg: "Minimum Password is 6 Character"
          }
        }
      },
      LockerId: DataTypes.INTEGER,
      lockerLabel: DataTypes.STRING,
      tokenExpo: DataTypes.STRING
    },
    {
      sequelize,
      hooks: {
        beforeCreate: function (user, options) {
          return User.findOne({ where: { email: user.email } })
            .then(result => {
              if (result) {
                let message = { message: "email already exist" };
                throw message;
              } else {
                let hash = bcrypt.hashSync(user.password, 10);
                user.password = hash;
              }
            })
            .catch(err => {
              throw err;
            });
        }
      }
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Locker);
    User.hasMany(models.Guest);
  };
  return User;
};

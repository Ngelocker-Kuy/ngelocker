"use strict";
let bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class User extends Model {}
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "please fill email"
          },
          notNull: {
            args: true,
            msg: "please enter your email"
          },

          isEmail: {
            args: true,
            msg: "format email wrong"
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
          },
          len: {
            args: [6, 14],
            msg: "minimal password 6 character"
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
        beforeCreate: function(user, options) {
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
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Locker);
    User.hasMany(models.Guest);
  };
  return User;
};

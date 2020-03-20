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
          isExist: value => {
            return User.count({ where: { email: value } }).then(count => {
              if (count > 0) {
                throw new Error("email already exist");
              }
            });
          },
          isEmail: true
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
      LockerId: DataTypes.INTEGER
    },
    {
      sequelize,
      hooks: {
        beforeCreate: function(user, options) {
          let hash = bcrypt.hashSync(user.password, 10);
          user.password = hash;
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

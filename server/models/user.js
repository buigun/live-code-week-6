const {hash} = require('../helpers/bcrypt')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email must be filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password must be filled'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(mod,opt) {
        mod.password = hash(mod.password)
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Food)
  };
  return User;
};
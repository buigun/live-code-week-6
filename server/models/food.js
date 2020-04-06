'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title must be filled'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title must be filled'
        }
      }
    },
    ingredients: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title must be filled'
        }
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title must be filled'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    Food.belongsTo(models.User)
  };
  return Food;
};
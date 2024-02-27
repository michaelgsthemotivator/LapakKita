'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(models.Transaction)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'username is required'
        },
        notEmpty: {
          msg: 'username is required'
        }
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'email is required'
        },
        notEmpty: {
          msg: 'email is required'
        },
        isEmail: {
          msg: 'Invalid email format',
        }
      }
    } 
    ,
    password:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password is required'
        },
        notEmpty: {
          msg: 'password is required'
        },
        len: {
          args: [8, undefined],
          msg: 'Password must be at least 8 characters long',
        }
      }
    } ,
    totalTransaction: DataTypes.INTEGER,
    role:{
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.beforeCreate(async (user) => {
    try {
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
      user.totalTransaction = 0
      user.role = "Silver"
    } catch (error) {
      throw new Error('Error hashing the password');
    }
  });
  return User;
};
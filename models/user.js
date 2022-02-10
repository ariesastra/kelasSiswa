'use strict';
const {
  Model
} = require('sequelize');
const {
  hashPlain
} = require('../helpers/Bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Class, { foreignKey: 'teacherId' })
      User.hasMany(models.ClassSeat, { foreignKey: 'classId' })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email Already Exist' },
      validate: {
        notNull: { msg: 'Email Required' },
        isEmail: { msg: 'Please input Email Format' },
        notEmpty: { msg: 'Email Not be Empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is Required' },
        notEmpty: { msg: 'Password Not be Empty' }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Role is Required' },
        notEmpty: { msg: 'Role Not Be Empty' }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'First Name is Required' },
        notEmpty: { msg: 'First Name Not be Empty' }
      }
    },
    lastName: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options){
        instance.password = hashPlain(instance.password)
      }
    }
  });
  return User;
};
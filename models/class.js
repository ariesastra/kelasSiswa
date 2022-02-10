'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.User, { foreignKey: 'teacherId', targetKey: 'id' })
      Class.hasMany(models.ClassSeat, {foreignKey: 'classId'})
    }
  }
  Class.init({
    teacherId: DataTypes.INTEGER,
    classRow: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Class Row is Required'},
        notNull: { msg: 'Class Row Not be Null'}
      }
    },
    classColumn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Class Column is Required'},
        notNull: { msg: 'Class Column Not be Null'}
      }
    },
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};
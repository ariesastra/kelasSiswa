'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClassSeat.belongsTo(models.User, {
        foreignKey: 'studentId',
        targetKey: 'id'
      })
      ClassSeat.belongsTo(models.Class, {
        foreignKey: 'classId',
        targetKey: 'id'
      })
    }
  }
  ClassSeat.init({
    classId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    seatNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClassSeat',
  });
  return ClassSeat;
};
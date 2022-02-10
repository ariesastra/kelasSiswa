const { ClassSeat, User } = require('../models')
const { Op } = require("sequelize");

const emptySeat = async (ClassId) => {
  // Check Empty Seats
  const emptySeat = await ClassSeat.findAll({
    where: {
      classId: ClassId,
      studentId: null
    },
    order: [
      ['seatNumber', 'ASC'],
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'classId', 'id', 'studentId']
    },
    raw: true,
    nest: true,
  })
  // Result query of empty seat
  return emptySeat.map(el => {
    return el.seatNumber
  })
}

const occupiedSeat = async (ClassId) => {
  // Check Occupied Seats
  const occSeat = await ClassSeat.findAll({
    where: {
      classId: ClassId,
      studentId: {
        [Op.not]: null
      }
    },
    order: [
      ['seatNumber', 'ASC'],
    ],
    include: [
      {
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id', 'email', 'password', 'role', 'lastName']
        },            
      }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'classId', 'id', 'studentId']
    },
    raw: true,
    nest: true,
  })
  // Push Result query to Occupies
  const temp = []
  occSeat.forEach(el => {
    temp.push({
      seat: el.seatNumber,
      student_name: el.User.firstName
    })
  })

  return temp
}

module.exports = {
  emptySeat,
  occupiedSeat
}
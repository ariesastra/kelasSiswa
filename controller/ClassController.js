const { Class, ClassSeat, sequelize } = require('../models')
const { emptySeat, occupiedSeat } = require('../helpers/CheckSeat')

class ClassController {
  static async createClass(req, res, next){
    const t = await sequelize.transaction();
    try {
      const {
        row,
        col
      } = req.body

      // CREATE CLASS
      const classCreate = await Class.create({
        classRow: row,
        classColumn: col
      }, {
        transaction: t
      })
      const { id: ClassId } = classCreate

      console.log(col, row);
      // SEAT ASSIGMENT
      /**
       * Seats Example 3x3
       * [
       *  1a, 1b, 1c,
       *  2a, 2b, 2c,
       *  3a, 3b, 3c,
       * ]
       */
      
      const seats = []
      const kamusHuruf = 'abcdefghijklmnopqrstuvwxyz'
      
      /**
       * Saat ini saya coba batasi row hanya sampe aphabets z, 
       * jadi hanya sebanyak maksimum 27 column yang dapat
       * ditambahkan kedalam column seats, jika lebih dari 27
       * akan dilemparkan ke error
       */
      if (col <= kamusHuruf.length + 1) {
        for (let i = 1; i <= row; i++) {
          for (let j = 0; j < col; j++) {
            seats.push({
              classId: ClassId,
              seatNumber: `${i}${kamusHuruf[j]}`
            })
          }
        }
      } else {
        throw { name: 'MAX_COLS'}
      }

      const assignSeat = await ClassSeat.bulkCreate(seats, {
        transaction: t
      })

      await t.commit();

      res.status(201).json({
        message: `Kelas dengan ID ${ClassId} telah dibuat dengan jumlah kursi sebanyak ${row * col}`
      })
    } catch (error) {
      await t.rollback();
      next(error)
    }
  }

  static async checkIn(req, res, next){
    try {
      // Get data from Authentication Middleware
      const {
        role,
        id,
        firstName
      } = req.auth
      // Get data from body request
      const {
        ClassId
      } = req.body

      // Check if class is available
      const queryClass = await Class.findOne({
        where: {
          id: ClassId
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      })
      if (!queryClass) throw { name: 'NOT_FOUND'}

      // Global Vars
      let message = ''
      let teacher = 'out'
      let occupied_seats = []
      let available_seats = []
      
      // Logic for checking user role
      if (role === 'admin') {
        message = `Hi ${firstName}, you are ${role}`
        if (queryClass.teacherId !== null) teacher = 'in'
      } else if (role === 'pengajar') {
        await Class.update({
          teacherId: id
        }, {
          where: {
            id: ClassId
          }
        })

        // menambahkan pesan ketika pengajar check in
        message = `Hi ${firstName}, Happy Teaching`
        teacher = 'in'
      } else {
        if (queryClass.teacherId !== null) teacher = 'in'
        const cekEmpty = await emptySeat(ClassId)
        const cekStudent = await ClassSeat.findOne({
          where: {
            studentId: id
          }
        })

        if (cekEmpty.length > 0) {
          if (!cekStudent) {
            await ClassSeat.update({
              studentId: id
            },{
              where: {
                seatNumber: cekEmpty[0]
              }
            })
          }
  
          message = `Hi ${firstName}, your seat is ${cekStudent ? cekStudent.seatNumber : cekEmpty[0]}`
        } else {
          message = `Hi ${firstName}, the class is fully seated`
        }
      }

      // Cek Seat
      available_seats = [...await emptySeat(ClassId)]
      occupied_seats = [...await occupiedSeat(ClassId)]
      
      // Output Request
      const output = {
        "class_id": ClassId,
        "rows": queryClass.classRow,
        "columns": queryClass.classColumn,
        "teacher": teacher,
        available_seats,
        occupied_seats,
        message
      }

      res.status(200).json(output)
    } catch (error) {
      next(error)
    }
  }

  static async checkOut(req, res, next){
    try {
      // Get data from Authentication Middleware
      const {
        role,
        id,
        firstName
      } = req.auth
      // Get data from body request
      const {
        ClassId
      } = req.body

      // Check if class is available
      const queryClass = await Class.findOne({
        where: {
          id: ClassId
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      })
      if (!queryClass) throw { name: 'NOT_FOUND'}

      // Global Vars
      let message = ''
      let teacher = 'in'
      let occupied_seats = []
      let available_seats = []

      // Logic for checking user role
      if (role === 'admin') {
        message = `Hi ${firstName}, you are ${role}`
        if (queryClass.teacherId === null) teacher = 'out'
      } else if (role === 'pengajar') {
        await Class.update({
          teacherId: null
        }, {
          where: {
            id: ClassId
          }
        })

        // menambahkan pesan ketika pengajar check Out
        message = `Hi ${firstName}, Thank You`
        teacher = 'out'
      } else {
        if (queryClass.teacherId === null) teacher = 'out'
        const getSeat = await ClassSeat.findOne({
          where: {
            studentId: id
          }
        })

        if (!getSeat) {
          const cekAvailable = [...await emptySeat(ClassId)]
          if (cekAvailable.length > 0) {
            message = `Hi ${firstName}, seat is available, please check in`
          } else message = `Hi ${firstName}, the class is fully seated`
        } else {
          await ClassSeat.update({
            studentId: null
          }, {
            where: {
              seatNumber: getSeat.seatNumber
            }
          })

          message = `Hi ${firstName}, ${getSeat.seatNumber} is now available for other students`
        }
      }

      // Cek Seat
      available_seats = [...await emptySeat(ClassId)]
      occupied_seats = [...await occupiedSeat(ClassId)]

      // Output Request
      const output = {
        "class_id": ClassId,
        "rows": queryClass.classRow,
        "columns": queryClass.classColumn,
        "teacher": teacher,
        available_seats,
        occupied_seats,
        message
      }

      res.status(200).json(output)
    } catch (error) {
      next(error)
    }
  }

  static async getAll(req, res, next){
    try {
      const classAll = await Class.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: ClassSeat,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ]
      })

      res.status(200).json(classAll)
    } catch (error) {
      next(error)
    }
  }

  static async getDetail(req, res, next){
    try {
      const {
        id
      } = req.params

      const classId = await Class.findOne({
        where: {
          id
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: ClassSeat,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ]
      })

      res.status(200).json(classId)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ClassController
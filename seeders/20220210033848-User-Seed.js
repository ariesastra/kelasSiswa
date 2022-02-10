'use strict';

const {
  hashPlain
} = require('../helpers/Bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        email: 'admin@mail.com',
        password: hashPlain('password'),
        role: 'admin',
        firstName: 'Admin',
        lastName: 'Super',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'pengajar@mail.com',
        password: hashPlain('password'),
        role: 'pengajar',
        firstName: 'Pengajar',
        lastName: 'Guru',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'murid1@mail.com',
        password: hashPlain('password'),
        role: 'murid',
        firstName: 'Ahmad',
        lastName: 'Fauzan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'murid2@mail.com',
        password: hashPlain('password'),
        role: 'murid',
        firstName: 'Arie',
        lastName: 'Sastra',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'murid3@mail.com',
        password: hashPlain('password'),
        role: 'murid',
        firstName: 'Toto',
        lastName: 'Sumarna',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

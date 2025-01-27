'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt); // Replace with a secure password

    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@example.com', // Replace with your desired admin email
        password: hashedPassword,
        role: 'admin', // Ensure 'admin' is a valid ENUM value in your users table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
  },
};

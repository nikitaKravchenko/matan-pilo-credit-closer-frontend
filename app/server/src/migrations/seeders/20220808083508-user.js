const crypto = require('crypto');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Creditcloser',
        last_name: 'Creditcloser',
        email: 'creditcloser@gmail.com',
        phone: '+13059275746',
        password: crypto.pbkdf2Sync('J26GtMcd5hDjTbFNagVSGEj', 'xxx_)(_xxx', 1000, 64, 'sha512').toString('hex'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

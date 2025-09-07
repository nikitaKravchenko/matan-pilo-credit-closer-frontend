module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('settings', [
      {name: 'EMAIL', value: 'Payout deadline is coming: %DATE% You need to pay the amount: %AMOUNT%', created_at: new Date(), updated_at: new Date()},
      {name: 'AUTO', value: 'Payout deadline is coming: %DATE% You need to pay the amount: %AMOUNT%', created_at: new Date(), updated_at: new Date()},
      {name: 'TO_NOTIFY', value: '1', created_at: new Date(), updated_at: new Date()},
      {name: 'FROM_NAME', value: 'Megamani', created_at: new Date(), updated_at: new Date()},
      {name: 'FROM_EMAIL', value: process.env.SEND_EMAIL, created_at: new Date(), updated_at: new Date()},
      {name: 'REPLY_TO_EMAIL', value: process.env.SEND_EMAIL, created_at: new Date(), updated_at: new Date()},
    ], {});

    await queryInterface.bulkInsert('analytics', [
      {total_gave: 0, profit: 0, created_at: new Date(), updated_at: new Date()},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('settings', null, {});
  }
};

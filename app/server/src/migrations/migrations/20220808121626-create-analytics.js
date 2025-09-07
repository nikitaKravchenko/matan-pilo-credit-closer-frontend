module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('analytics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_gave: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      profit: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('analytics');
  }
};
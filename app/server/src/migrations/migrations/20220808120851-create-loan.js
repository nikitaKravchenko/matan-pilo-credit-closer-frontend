module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      loan_amount: {
        type: Sequelize.NUMERIC,
      },
      payment_amount: {
        type: Sequelize.NUMERIC,
      },
      payment_period: {
        type: Sequelize.ENUM('D', 'W1', 'W2', 'M1', 'M2'),
        allowNull: false
      },
      number_payments: {
        type: Sequelize.NUMERIC(500),
      },
      profit: {
        type: Sequelize.NUMERIC,
      },
      return_total: {
        type: Sequelize.NUMERIC,
      },
      status: {
        type: Sequelize.ENUM('Active', 'Closed'),
      },
      start_payment_date: {
        type: Sequelize.DATE,
      },
      end_payment_date: {
        type: Sequelize.DATEONLY,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'customers',
          key: 'id',
          as: 'customer_id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loans');
  }
};
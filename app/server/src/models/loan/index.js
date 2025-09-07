import {db} from "../../db";
import {DataTypes} from 'sequelize';

import CustomerModel from "../customer";

const LoanModel = db.define("loan", {
  loan_amount: {
    type: DataTypes.NUMERIC,
    allowNull: false,
    get() {
      return String(this.getDataValue('loan_amount') / 100);
    },
    set(value) {
      this.setDataValue('loan_amount', value * 100)
    }
  },
  payment_amount: {
    type: DataTypes.NUMERIC,
    allowNull: false,
    get() {
      return String(this.getDataValue('payment_amount') / 100);
    },
    set(value) {
      this.setDataValue('payment_amount', value * 100)
    }
  },
  payment_period: {
    type: DataTypes.ENUM('D', 'W1', 'W2', 'M1', 'M2'),
    allowNull: false
  },
  number_payments: {
    type: DataTypes.NUMERIC(500),
    allowNull: false
  },
  profit: {
    type: DataTypes.NUMERIC,
    allowNull: false,
    get() {
      return String(this.getDataValue('profit') / 100);
    },
    set(value) {
      this.setDataValue('profit', value * 100)
    }
  },
  return_total: {
    type: DataTypes.NUMERIC,
    allowNull: false,
    get() {
      return String(this.getDataValue('return_total') / 100);
    },
    set(value) {
      this.setDataValue('return_total', value * 100)
    }
  },
  status: {
    type: DataTypes.ENUM('Active', 'Closed'),
    allowNull: false
  },
  start_payment_date: {
    type: DataTypes.DATE,
  },
  end_payment_date: {
    type: DataTypes.DATEONLY
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CustomerModel,
      key: 'id'
    }
  },
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
});

export default LoanModel;
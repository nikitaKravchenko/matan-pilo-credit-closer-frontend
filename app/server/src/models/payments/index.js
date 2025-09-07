import {db} from "../../db";
import {DataTypes} from 'sequelize';

import LoanModel from "../loan";

const PaymentModel = db.define("payments", {
  amount: {
    type: DataTypes.NUMERIC,
    allowNull: false,
    get() {
      return String(this.getDataValue('amount') / 100);
    },
    set(value) {
      this.setDataValue('amount', value * 100)
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Waiting for payment', 'Paid'),
    allowNull: false
  },
  loan_id: {
    type: DataTypes.INTEGER,
    references: {
      model: LoanModel,
      key: 'id',
      as: 'loan_id',
    }
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
});

export default PaymentModel;
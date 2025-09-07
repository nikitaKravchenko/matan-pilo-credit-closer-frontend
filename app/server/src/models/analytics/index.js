import {db} from "../../db";
import {DataTypes} from 'sequelize';

const AnalyticsModel = db.define("analytics", {
  total_gave: {
    type: DataTypes.NUMERIC,
    allowNull: false,
    get() {
      return this.getDataValue('total_gave') / 100;
    },
    set(value) {
      this.setDataValue('total_gave', value * 100)
    }
  },
  profit: {
    type: DataTypes.NUMERIC,
    allowNull: false,
    get() {
      return this.getDataValue('profit') / 100;
    },
    set(value) {
      this.setDataValue('profit', value * 100)
    }
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'created_at',
});

export default AnalyticsModel;
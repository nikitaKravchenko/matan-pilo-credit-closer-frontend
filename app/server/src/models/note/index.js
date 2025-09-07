import {db} from "../../db";
import {DataTypes} from 'sequelize';

const NoteModel = db.define("note", {
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default NoteModel;
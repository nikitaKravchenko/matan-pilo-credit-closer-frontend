import {Op} from "sequelize";
import NoteModel from "../../models/note";

export const getNotesController = async (req, res) => {
  try {
    const {filter} = req.query;
    const {start, end} = JSON.parse(filter || "{}");

    const notes = await NoteModel.findAndCountAll({
      where: {
        date: {
          [Op.and]: {[Op.gte]: start, [Op.lte]: end}
        },
      },
    });

    res.status(200).json({notes});
  } catch
    (e) {
    res.status(400).send(e.message);
  }
}

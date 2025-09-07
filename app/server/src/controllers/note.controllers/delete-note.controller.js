import NoteModel from "../../models/note";

export const deleteNoteController = async (req, res) => {
  try {
    const {id} = req.body;

    const note = await NoteModel.findByPk(id);
    await NoteModel.destroy({where: {id}});

    res.status(200).json(note);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
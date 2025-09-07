import NoteModel from "../../models/note";

export const getNoteController = async (req, res) => {
  try {
    const note = await NoteModel.findByPk(req.params.id);

    res.status(200).json(note);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
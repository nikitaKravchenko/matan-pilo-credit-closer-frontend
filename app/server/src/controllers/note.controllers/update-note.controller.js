import NoteModel from "../../models/note";

export const updateNoteController = async (req, res) => {
  try {
    await NoteModel.update(req.body, {where: {id: req.body.id}});

    res.status(200).json(req.body);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

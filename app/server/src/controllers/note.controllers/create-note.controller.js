import NoteModel from "../../models/note";

export const createNoteController = async (req, res) => {
  try {
    const note = await NoteModel.create({
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(200).json(note);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

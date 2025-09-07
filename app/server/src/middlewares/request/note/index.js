import {createNotesSchema, updateNotesSchema} from "../../validator/notes.schema.js";

export const createNotesRequestMiddleware = async (req, res, next) => {
  try {
    await createNotesSchema.validateAsync(req.body);

    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export const updateNotesRequestMiddleware = async (req, res, next) => {
  try {
    await updateNotesSchema.validateAsync(req.body);

    next();
  } catch (e) {
   res.status(400).send(e.message);
  }
}
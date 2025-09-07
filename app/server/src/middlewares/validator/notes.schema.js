import Joi from "joi";

export const createNotesSchema = Joi.object({
  color: Joi.string()
    .required(),
  message: Joi.string()
    .max(600)
    .required(),
  date: Joi.string()
    .required()
});

export const updateNotesSchema = Joi.object({
  id: Joi.string()
    .required(),
  color: Joi.string(),
  message: Joi.string()
    .max(600),
  date: Joi.string()
});
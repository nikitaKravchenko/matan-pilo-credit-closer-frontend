import Joi from "joi";

export const createPaymentSchema = Joi.object({
  loan_id: Joi.number()
    .required(),
  amount: Joi.string()
    .max(60)
    .pattern(/^[0-9]*[.]?[0-9]+$/i)
    .required(),
  date: Joi.string()
    .required(),
  status: Joi.string()
    .required(),
});

export const updatePaymentSchema = Joi.object({
  id: Joi.number()
    .required(),
  amount: Joi.string()
    .max(60)
    .pattern(/^[0-9]*[.]?[0-9]+$/i),
  date: Joi.string(),
  status: Joi.string()
});
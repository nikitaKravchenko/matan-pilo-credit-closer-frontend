import Joi from "joi";

export const createLoanSchema = Joi.object({
  customer_id: Joi.number()
    .required(),
  loan_amount: Joi.string()
    .max(60)
    .pattern(/^[0-9]*[.]?[0-9]+$/i)
    .required(),
  payment_amount: Joi.string()
    .max(60)
    .pattern(/^[0-9]*[.]?[0-9]+$/i)
    .required(),
  payment_period: Joi.string(),
  number_payments: Joi.number()
    .required(),
  payments: Joi.array().items(Joi.object({
    amount: Joi.string()
      .max(60)
      .pattern(/^[0-9]*[.]?[0-9]+$/i),
    date: Joi.string(),
    status: Joi.string()
  })),
  status: Joi.string()
    .required()
})


export const updateLoanSchema = Joi.object({
  id: Joi.number()
    .required(),
  customer_id: Joi.number(),
  loan_amount: Joi.string()
    .max(60)
    .pattern(/^[0-9]*[.]?[0-9]+$/i),
  payment_amount: Joi.string()
    .max(60)
    .pattern(/^[0-9]*[.]?[0-9]+$/i),
  payment_period: Joi.string(),
  number_payments: Joi.number(),
  status: Joi.string()
})
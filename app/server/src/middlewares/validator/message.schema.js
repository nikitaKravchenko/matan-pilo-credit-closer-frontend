import Joi from "joi";

export const sendMessageSchema = Joi.object({
  customer_id: Joi.number()
    .required(),
  email: Joi.string()
    .email({minDomainSegments: 2})
    .max(42)
    .required(),
  message: Joi.string()
    .max(300)
    .required()
});
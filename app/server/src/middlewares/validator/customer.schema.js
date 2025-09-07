import Joi from "joi";

export const createCustomerSchema = Joi.object({
  first_name: Joi.string()
    .min(1)
    .max(60)
    .required(),
  last_name: Joi.string()
    .min(1)
    .max(60)
    .required(),
  email: Joi.string()
    .email({minDomainSegments: 2})
    .max(42)
    .required(),
  phone: Joi.string()
    .max(15)
    .required(),
  address: Joi.string()
    .max(400)
    .required()
})

export const updateCustomerSchema = Joi.object({
  id: Joi.number()
    .required(),
  first_name: Joi.string()
    .min(1)
    .max(60),
  last_name: Joi.string()
    .min(1)
    .max(60),
  email: Joi.string()
    .email({minDomainSegments: 2})
    .max(42),
  phone: Joi.string()
    .max(15),
  address: Joi.string()
    .max(400)
});
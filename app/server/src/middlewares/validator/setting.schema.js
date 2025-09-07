import Joi from "joi";

export const updateSettingSchema = Joi.object({
  id: Joi.string()
    .required(),
  value: Joi.string()
    .max(200),
  notify: Joi.object({
    id: Joi.string()
      .required(),
    value: Joi.number()
  })
});
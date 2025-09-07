import {createPaymentSchema, updatePaymentSchema} from "../../validator/payment.schema.js";

export const createPaymentRequestMiddleware = async (req, res, next) => {
  try {
    await createPaymentSchema.validateAsync(req.body);

    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export const updatePaymentRequestMiddleware = async (req, res, next) => {
  try {
    await updatePaymentSchema.validateAsync(req.body);

    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
}
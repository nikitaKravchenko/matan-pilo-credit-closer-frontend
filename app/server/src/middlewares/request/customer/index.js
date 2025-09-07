import {createCustomerSchema, updateCustomerSchema} from "../../validator/customer.schema.js";

export const createCustomerRequestMiddleware = async (req, res, next) => {
  try {
    await createCustomerSchema.validateAsync(req.body);

    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export const updateCustomerRequestMiddleware = async (req, res, next) => {
  try {
    await updateCustomerSchema.validateAsync(req.body);

    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
}
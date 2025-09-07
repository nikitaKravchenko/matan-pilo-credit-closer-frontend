import {createLoanSchema, updateLoanSchema} from "../../validator/loan.schema";

export const createLoanRequestMiddleware = async (req, res, next) => {
  try {
    await createLoanSchema.validateAsync(req.body);

    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export const updateLoanRequestMiddleware = async (req, res, next) => {
  try {
    await updateLoanSchema.validateAsync(req.body);

    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
}

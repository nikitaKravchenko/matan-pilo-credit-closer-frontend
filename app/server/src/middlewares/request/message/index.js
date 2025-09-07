import {sendMessageSchema} from "../../validator/message.schema.js";

export const sendMessageRequestMiddleware = async (req, res, next) => {
  try {
    await sendMessageSchema.validateAsync(req.body);

    next();
  } catch (e) {
   res.status(400).send(e.message);
  }
}
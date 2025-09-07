import {updateSettingSchema} from "../../validator/setting.schema.js";

export const updateSettingRequestMiddleware = async (req, res, next) => {
  try {
    await updateSettingSchema.validateAsync(req.body);

    next();
  } catch (e) {
   res.status(400).send(e.message);
  }
}
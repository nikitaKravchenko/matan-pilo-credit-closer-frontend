import CustomerModel from "../../models/customer";
import {FindCount} from "../../services/count";

export const getCustomersCountController = async (req, res) => {
  try {
    const {paranoid = true} = req.body;

    const count = await FindCount(CustomerModel, paranoid)

    res.status(200).json(count);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
import CustomerModel from "../../models/customer";
import {reestablishCustomerService} from "../../services/customer";

export const reestablishCustomerController = async (req, res) => {
  try {
    const {id} = req.body;

    await CustomerModel.restore({where: {id}});
    const customer = await CustomerModel.findByPk(id);

    await reestablishCustomerService(customer);

    res.status(200).json(customer);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
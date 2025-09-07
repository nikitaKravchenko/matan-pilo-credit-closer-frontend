import CustomerModel from "../../models/customer";
import {deleteCustomerService} from "../../services/customer";

export const deleteCustomerController = async (req, res) => {
  try {
    const {id} = req.body;

    const customer = await CustomerModel.findByPk(id);
    await CustomerModel.destroy({where: {id}});

    await deleteCustomerService(customer);

    res.status(200).json(customer);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export const deleteCustomerAbsolutController = async (req, res) => {
  try {
    const {id} = req.body;

    await CustomerModel.destroy({where: {id}, force: true});

    res.status(200).json({id});
  } catch (e) {
    console.log(e)
    res.status(400).send(e.message);
  }
}
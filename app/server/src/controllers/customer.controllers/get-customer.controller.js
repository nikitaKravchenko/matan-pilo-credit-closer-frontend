import CustomerModel from "../../models/customer";

export const getCustomerController = async (req, res) => {
  try {
    const customer = await CustomerModel.findByPk(req.params.id);

    res.status(200).json(customer);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
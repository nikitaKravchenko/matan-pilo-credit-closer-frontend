import CustomerModel from "../../models/customer";

export const updateCustomerController = async (req, res) => {
  try {
    await CustomerModel.update(req.body, {where: {id: req.body.id}});

    res.status(200).json(req.body);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
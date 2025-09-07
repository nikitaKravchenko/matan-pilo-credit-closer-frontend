import CustomerModel from "../../models/customer";

export const createCustomerController = async (req, res) => {
  try {
    const getCustomersByEmail = await CustomerModel.findOne({where: {email: req.body.email}});

    if(getCustomersByEmail) {
      res.status(400).send('email already in use');
      return;
    }

    const customer = await CustomerModel.create({
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(200).json(customer);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
import PaymentModel from "../../models/payments";
import {updatePaymentService} from "../../services/payment";

export const updatePaymentController = async (req, res) => {
  try {
    const payment = await PaymentModel.findByPk(req.body.id);

    await PaymentModel.update(req.body, {where: {id: req.body.id}});
    await updatePaymentService(payment, req.body);

    res.status(200).json(req.body);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
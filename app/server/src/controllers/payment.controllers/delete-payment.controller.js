import PaymentModel from "../../models/payments";
import {deletePaymentService} from "../../services/payment";

export const deletePaymentController = async (req, res) => {
  try {
    const {id} = req.body;

    const payment = await PaymentModel.findByPk(id);
    await PaymentModel.destroy({where: {id: payment.id}, force: true});
    if(payment.status === 'Paid') {
      await deletePaymentService(payment);
    }

    res.status(200).json(payment);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
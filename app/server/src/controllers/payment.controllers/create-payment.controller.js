import PaymentModel from "../../models/payments";
import {createPaymentService} from "../../services/payment";

export const createPaymentController = async (req, res) => {
  try {
    const {loan_id, amount, date, status = 'Waiting for payment'} = req.body;

    const payment = await PaymentModel.create({
      amount,
      loan_id,
      date: new Date(date),
      status,
      created_at: new Date(),
      updated_at: new Date()
    });

    await createPaymentService(loan_id, amount, status);

    res.status(200).json(payment);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
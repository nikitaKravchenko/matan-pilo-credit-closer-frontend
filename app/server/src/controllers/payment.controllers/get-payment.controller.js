import PaymentModel from "../../models/payments";

export const getPaymentController = async (req, res) => {
  try {
    const {id} = req.params;

    const payment = await PaymentModel.findByPk(id);

    res.status(200).json(payment);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
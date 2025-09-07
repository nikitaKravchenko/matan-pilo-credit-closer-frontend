import PaymentModel from "../../models/payments";
import {FindCount} from "../../services/count";

export const getPaymentsController = async (req, res) => {
  try {
    const {pagination, filter} = req.query;
    const {page, perPage} = JSON.parse(pagination || "{}");
    const {loan_id, status} = JSON.parse(filter || "{}");

    const payments = await PaymentModel.findAndCountAll({
      paranoid: true,
      limit: Math.min(perPage || 10, 25),
      offset: page >= 0 ? ((page - 1) * perPage) : 0,
      where: {
        loan_id,
        ...status && {status}
      },
    });

    res.status(200).json({payments});
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export const getCountPaymentsController = async (req, res) => {
  try {
    const payments = await FindCount(PaymentModel, req.body.paranoid);

    res.status(200).json(payments);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
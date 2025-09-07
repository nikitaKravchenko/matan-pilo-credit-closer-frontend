import LoanModel from "../../models/loan";
import {reestablishLoanService} from "../../services/loan";
import PaymentModel from "../../models/payments";
import CustomerModel from "../../models/customer/index.js";

export const reestablishLoanController = async (req, res) => {
  try {
    const {id} = req.body;

    const loan = await LoanModel.findByPk(id, {paranoid: false});
    const customer = await CustomerModel.findByPk(loan.dataValues.customer_id);

    if(customer) {
      await LoanModel.restore({where: {id}});
      await PaymentModel.restore({where: {loan_id: id}});

      await reestablishLoanService(loan);

      res.status(200).json(loan);
    } else {
      res.status(400).send('Not Found Customer');
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
}
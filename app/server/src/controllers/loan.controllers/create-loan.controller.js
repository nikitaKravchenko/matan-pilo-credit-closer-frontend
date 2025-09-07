import LoanModel from "../../models/loan";

import {createLoan} from "../../helpers/loan.js";
import {createLoanService} from "../../services/loan";
import {createListPayments} from "../../services/payment";

export const createLoanController = async (req, res) => {
  try {
    const data = createLoan(req.body);

    const loan = await LoanModel.create(data);
    await createListPayments(req.body.payments, 'Waiting for payment', loan.id);
    await createLoanService(loan);

    res.status(200).json(loan);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

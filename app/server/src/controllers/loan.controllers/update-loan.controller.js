import LoanModel from "../../models/loan";
import {updateLoanParams} from "../../helpers/loan.js";
import {updateLoanService} from "../../services/loan";

export const updateLoanController = async (req, res) => {
  try {
    const loan = await LoanModel.findByPk(req.body.id);
    const update = updateLoanParams(req.body, loan);
    await LoanModel.update(update, {where: {id: req.body.id}});

    await updateLoanService(loan, update);

    res.status(200).json(req.body);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

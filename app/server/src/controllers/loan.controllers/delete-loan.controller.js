import LoanModel from "../../models/loan";
import PaymentModel from "../../models/payments";
import {deleteLoanService} from "../../services/loan";

export const deleteLoanController = async (req, res) => {
  try {
    const {id} = req.body;

    const loan = await LoanModel.findByPk(id);
    await LoanModel.destroy({where: {id}});
    await PaymentModel.destroy({where: {loan_id: id}});

    await deleteLoanService(loan);

    res.status(200).json(loan);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export const deleteLoanAbsolutController = async (req, res) => {
  try {
    const {id} = req.body;

    await LoanModel.destroy({where: {id}, force: true});

    res.status(200).json({id});
  } catch (e) {
    res.status(400).send(e.message);
  }
}
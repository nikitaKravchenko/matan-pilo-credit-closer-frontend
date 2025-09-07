import LoanModel from "../../models/loan";
import {FindCount} from "../../services/count";

export const getLoansCountController = async (req, res) => {
  try {
    const {paranoid = true} = req.body;

    const count = await FindCount(LoanModel, paranoid);

    res.status(200).json(count);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
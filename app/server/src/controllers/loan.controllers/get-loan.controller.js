import LoanModel from "../../models/loan";

export const getLoanController = async (req, res) => {
  try {
    const loan = await LoanModel.findByPk(req.params.id);

    res.status(200).json(loan);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
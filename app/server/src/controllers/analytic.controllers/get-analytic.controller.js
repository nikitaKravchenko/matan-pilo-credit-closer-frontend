import {getAnalytic} from "../../services/analytic";

export const getAnalyticController = async (req, res) => {
  try {
    const analytic = await getAnalytic();

    res.status(200).json(analytic);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
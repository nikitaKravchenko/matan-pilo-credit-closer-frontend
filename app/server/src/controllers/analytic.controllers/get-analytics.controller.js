import {getIntervalExpectedAnalytic} from "../../services/analytic";

export const getAnalyticsController = async (req, res) => {
  try {
    const {start, end, customerId, all = 'false'} = req.query;

    const data = await getIntervalExpectedAnalytic(
      +customerId,
      start,
      end,
      JSON.parse(all)
    );

    res.status(200).json([{id: 1, ...data}]);
  } catch (e) {
    res.status(400).send(e.message);
  }
}


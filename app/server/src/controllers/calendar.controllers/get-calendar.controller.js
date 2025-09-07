export const getCalendarController = async (req, res) => {
  try {
    const {id} = req.params;


    res.status(200).json({calendar: {}});
  } catch (e) {
    res.status(400).send(e.message);
  }
}
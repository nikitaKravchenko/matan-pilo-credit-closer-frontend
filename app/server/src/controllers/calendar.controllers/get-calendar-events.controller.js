import {Op,} from 'sequelize';
import PaymentModel from "../../models/payments";
import {getFullNameEvent} from "../../services/calendar/events";

export const getCalendarEventsController = async (req, res) => {
  try {
    const {start, end} = req.query;

    const waitingPayments = await PaymentModel.findAll({
      where: {
        date: {[Op.between]: [new Date(start), new Date(end)]},
        status: 'Waiting for payment'
      }
    });

    const paidPayments = await PaymentModel.findAll({
      where: {
        date: {[Op.between]: [new Date(start), new Date(end)]},
        status: 'Paid'
      }
    });

    const eventsWaitingPayments = await getFullNameEvent(waitingPayments);
    const eventsPaidPayments = await getFullNameEvent(paidPayments);

    res.status(200).json({payments: [...eventsWaitingPayments, ...eventsPaidPayments]});
  } catch (e) {
    res.status(400).send(e.message);
  }
}
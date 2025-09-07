import {col, fn, Op} from "sequelize";
import format from "date-fns/format";

import PaymentModel from "../../models/payments";
import {paidOverdueReduce} from "./reduce";

export const wherePayments = async (where, attributes, type) => {
  const paid = await PaymentModel[type]({
    attributes,
    where: {status: 'Paid', ...where}
  });
  const wait = await PaymentModel[type]({
    attributes,
    where: {status: 'Waiting for payment', ...where}
  });
  const overdue = await PaymentModel[type]({
    attributes,
    where: {
      status: 'Waiting for payment',
      date: {[Op.lte]: new Date(format(new Date(), 'yyyy-MM-dd'))}
    }
  });

  return {
    paid,
    wait,
    overdue
  }
}

export const getAllPayments = async (where) => {
  const {paid, wait, overdue} = await wherePayments(
    where,
    [[fn('sum', col('amount')), 'total']],
    'findOne'
  );

  return {
    paid: paid.dataValues.total / 100,
    wait: wait.dataValues.total / 100,
    overdue: overdue.dataValues.total / 100,
  }
}

export const getIntervalPayments = async (where) => {
  const {paid, wait} = await wherePayments(
    where,
    [['amount', 'total'], 'date'],
    'findAll'
  );

  const waitData = paidOverdueReduce(wait, (s) => new Date(s.date) < new Date(format(new Date(), 'yyyy-MM-dd')));

  return {
   ...paidOverdueReduce(paid, () => false),
    overdue: waitData.overdue,
    wait: waitData.paid
  }
}
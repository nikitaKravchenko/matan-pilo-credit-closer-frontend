import {Op} from "sequelize";

import AnalyticsModel from "../../models/analytics";
import PaymentModel from "../../models/payments";
import LoanModel from "../../models/loan";

import {getAllPayments, getIntervalPayments} from "./payments";
import {myReducePayment} from "./reduce";

export const getAnalytic = async () => {
  const analytics = await AnalyticsModel.findAll({limit: 1, offset: 0});
  const {id, total_gave, profit} = analytics[0];
  return {id, total_gave, profit};
}

export const getProfitPayments = async (where) => {
  let total_amount = 0;

  const payments = await PaymentModel.findAndCountAll({
    where,
    attributes: [['amount', 'total'], 'status', 'date', 'id']
  });

  const paymentsTotal = payments.rows.map((e) => {
    total_amount += e.dataValues.total / 100;

    return {
      ...e.dataValues,
      total: e.dataValues.total / 100,
    }
  });

  return {
    payments: paymentsTotal,
    count: payments.count,
    total_amount,
    dates: payments.rows.map(e => new Date(e.dataValues.date)),
  }
}

export const getIntervalAll = async (all, start, end) => {
  const where = !all ? {
    date: {[Op.and]: {[Op.gte]: new Date(start), [Op.lte]: new Date(end)}}
  } : {}

  const {payments, dates, count, total_amount} = await getProfitPayments(where);

  let allPaidStatus;

  if(all) {
    allPaidStatus = await getAllPayments(where);
  } else {
    allPaidStatus = await getIntervalPayments(where);
  }

  return {
    total_amount,
    payments,
    count,
    ...all ? {
      min: new Date(Math.min(...dates)),
      max: new Date(Math.max(...dates)),
      ...await getAnalytic()
    } : {
      min: start,
      max: end
    },
    ...allPaidStatus,
  }
}

export const getIntervalCustomerID = async (customerId, all, start, end) => {
  const loans = await LoanModel.findAll({
    where: {customer_id: customerId},
    attribute: ['id', 'loan_amount', 'profit']
  });

  return await myReducePayment(
    loans,
    {
      ...!all ? {
        date: {
          [Op.and]: {
            [Op.gte]: new Date(start),
            [Op.lte]: new Date(end)
          }
        }
      } : {}
    },
    all
  )
}

export const getIntervalExpectedAnalytic = async (customerId, start, end, all) => {
  if (customerId) {
    const data = await getIntervalCustomerID(customerId, all, start, end);
    return {
      ...data,
      profit: data.total_amount - data.total_gave
    }
  }

  const data = await getIntervalAll(all, start, end);

  return {
    ...data,
    profit: data.total_amount - data.total_gave
  };
}
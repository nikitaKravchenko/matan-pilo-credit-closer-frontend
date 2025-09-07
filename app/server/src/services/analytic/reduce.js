import {getAllPayments, getIntervalPayments} from "./payments";
import {getProfitPayments} from "./index.js";

export const myReducePayment = async (loans, where, all) => {
  let acc = {
    total_gave: 0,
    profit: 0,
    payments: [],
    count: 0,
    total_amount: 0,
    min: Infinity,
    max: -Infinity,
    wait: 0,
    paid: 0,
    overdue: 0
  };

  for (let item of loans) {
    const whereF = {
      loan_id: item.dataValues.id,
      ...where
    }

    acc.total_gave += item.dataValues.loan_amount / 100;
    acc.profit += item.dataValues.profit / 100;

    const total = await getProfitPayments(whereF);
    let getPayment;
    if (all) {
      getPayment = await getIntervalPayments(whereF);
    } else {
      getPayment = await getIntervalPayments(whereF);
    }

    acc.wait += getPayment.wait;
    acc.paid += getPayment.paid;
    acc.overdue += getPayment.overdue;

    acc.count += total.count;
    acc.total_amount += total.total_amount;
    acc.payments = [...acc.payments, ...total.payments];
    acc.min = new Date(Math.min(acc.min, ...total.dates));
    acc.max = new Date(Math.max(acc.max, ...total.dates));
  }

  return acc;
}

export const paidOverdueReduce = (arr, is) => {
  let paid = 0;
  let overdue = 0;

  for (let item of arr) {
    if(is(item.dataValues)) {
      overdue += item.dataValues.total / 100
    } else {
      paid += item.dataValues.total / 100;
    }
  }

  return {
    paid,
    overdue
  };
}
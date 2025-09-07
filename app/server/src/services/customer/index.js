import AnalyticsModel from "../../models/analytics";
import PaymentModel from "../../models/payments";
import LoanModel from "../../models/loan";

import {getAnalytic} from "../analytic";

export const deleteCustomerService = async (customer) => {
  const {id} = await getAnalytic();

  const loans = await LoanModel.findAll({
    where: {customer_id: customer.id}
  });

  for await (let value of loans) {
    await PaymentModel.destroy({where: {loan_id: value.id}});
  }

  await LoanModel.destroy({where: {customer_id: customer.id}});

  const {return_total, loan_amount} = getFullLoanTotal(loans);

  await AnalyticsModel.decrement({
    total_gave: loan_amount * 100,
    profit: (+return_total - +loan_amount) * 100
  }, {where: {id}});
}

export const reestablishCustomerService = async (customer) => {
  const {id} = await getAnalytic();

  await LoanModel.restore({where: {customer_id: customer.id}});
  const loans = await LoanModel.findAll({
    where: {customer_id: customer.id}
  });

  for await (let value of loans) {
    await PaymentModel.restore({where: {loan_id: value.id}});
  }

  const {return_total, loan_amount} = getFullLoanTotal(loans);

  await AnalyticsModel.increment({
    total_gave: loan_amount * 100,
    profit: (+return_total - +loan_amount) * 100
  }, {where: {id}});
}

const getFullLoanTotal = (loans) => {
  return loans.reduce((acc, item) => {
    acc['loan_amount'] += +item['loan_amount'];
    acc['return_total'] += +item['return_total'];
    return acc;
  }, {
    loan_amount: 0,
    return_total: 0,
  })
};
import AnalyticsModel from "../../models/analytics";
import {getAnalytic} from "../analytic";

export const createLoanService = async (loan) => {
  const {total_gave, profit, id} = await getAnalytic();
  await AnalyticsModel.update({
    total_gave: total_gave + +loan.loan_amount,
    profit: profit - +loan.loan_amount
  }, {where: {id}});
}

export const updateLoanService = async (loan, update) => {
  if(update.loan_amount && update.loan_amount !== loan.loan_amount) {
    const {id, profit, total_gave} = await getAnalytic();

    await AnalyticsModel.update({
      total_gave: (+total_gave - +loan.loan_amount) + +update.loan_amount,
      profit: +profit + (+loan.loan_amount - +update.loan_amount)
    }, {where: {id}});
  }
}

export const deleteLoanService = async (loan) => {
  const {id} = await getAnalytic();

  await AnalyticsModel.decrement({
    total_gave: loan.loan_amount * 100,
    profit: (+loan.return_total - +loan.loan_amount) * 100
  }, {where: {id}});
}

export const reestablishLoanService = async (loan) => {
  const {id} = await getAnalytic();

  await AnalyticsModel.increment({
    total_gave: loan.loan_amount * 100,
    profit: (+loan.return_total - +loan.loan_amount) * 100
  }, {where: {id}});
}
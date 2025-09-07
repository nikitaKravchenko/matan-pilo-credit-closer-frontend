import {Op} from "sequelize";
import format from "date-fns/format";

import PaymentModel from "../../models/payments";
import LoanModel from "../../models/loan";
import CustomerModel from "../../models/customer";
import {styleMoney} from "./renameData";
import {reportLoansPaid} from "./reportLoansPaid.js";
import {reportLoansOverdue} from "./reportLoansOverdue.js";

export const getTemplateDate = async (start, end) => {
  const {loansPaid, loansOverdue, count, total} = await getReportPayments(start, end);

  return {
    reportLoansPaid: loansPaid,
    reportLoansOverdue: loansOverdue,
    total,
    count,
    start: format(start, 'MMM. dd yyyy'),
    end: format(end, 'MMM. dd yyyy')
  }
}


const getReportPayments = async (start, end) => {
  const payments = await PaymentModel.findAndCountAll({
    where: {date: {[Op.and]: {[Op.gte]: start, [Op.lte]: end}}},
  });
  const loans = await LoanModel.findAll({
    where: {id: {[Op.or]: payments.rows.map(e => e.dataValues.loan_id)}}
  });
  const customers = await CustomerModel.findAll({
    where: {id: {[Op.or]: loans.map(e => e.dataValues.customer_id)}}
  });

  const {totalAmount, loansPaid} = reportLoansPaid(loans, payments, customers);
  const loansOverdue = await reportLoansOverdue(end)

  return {
    total: styleMoney(totalAmount, 1),
    count: payments.count,
    loansPaid,
    loansOverdue
  };
}
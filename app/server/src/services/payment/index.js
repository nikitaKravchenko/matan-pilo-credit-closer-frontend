import {col, fn} from "sequelize";
import LoanModel from "../../models/loan";
import AnalyticsModel from "../../models/analytics";
import PaymentModel from "../../models/payments";

import {getAnalytic} from "../analytic";

export const addAnalyticPayment = async (loan_id, amount) => {
  const {id} = await getAnalytic();
  const loan = await LoanModel.findByPk(loan_id);

  await loan.update({
    return_total: +loan.return_total + +amount,
    profit: +loan.profit + +amount,
  });

  await AnalyticsModel.increment({
    profit: amount * 100
  }, {where: {id}});
}

export const deleteAnalyticPayment = async (loan_id, amount) => {
  const {id} = await getAnalytic();
  const loan = await LoanModel.findByPk(loan_id);

  await loan.update({
    return_total: +loan.return_total - +amount,
    profit: +loan.profit - +amount,
  });

  await AnalyticsModel.decrement({
    profit: amount * 100
  }, {where: {id}});
}

export const createPaymentService = async (loan_id, amount, status) => {
  if(status !== 'Waiting for payment') {
    await addAnalyticPayment(loan_id, amount)
  }

  await loanStartEndUpdate(loan_id);
}

export const updatePaymentService = async (payment, data) => {
  if(payment.status === 'Waiting for payment' && data.status && data.status === "Paid") {
    await addAnalyticPayment(payment.loan_id, payment.amount);
  }
  if(payment.status === 'Paid' && data.status && data.status === 'Waiting for payment') {
    await deleteAnalyticPayment(payment.loan_id, payment.amount);
  }

  if (data.amount && data.amount !== payment.amount) {
    if(data.status === 'Paid' || (payment.status === 'Paid' && !data.status)) {
      const {id, profit} = await getAnalytic()

      const loan = await LoanModel.findByPk(payment.loan_id);

      await loan.update({
        return_total: +loan.return_total - +payment.amount + +data.amount,
        profit: +loan.profit - +payment.amount + +data.amount
      });

      await AnalyticsModel.update({
        profit: +profit - (+payment.amount - +data.amount)
      }, {where: {id}});
    }
  }

  await loanStartEndUpdate(payment.loan_id);
}

export const deletePaymentService = async (payment) => {
  await deleteAnalyticPayment(payment.loan_id, payment.amount);
  await loanStartEndUpdate(payment.loan_id);
}

const loanStartEndUpdate = async (id) => {
  let paymentMinMax = await PaymentModel.findOne({
    where: {loan_id: id},
    attributes: [
      [fn('min', col('date')), 'payment_date'],
      [fn('max', col('date')), 'next_payment']
    ]
  });

  await LoanModel.update({
    start_payment_date: paymentMinMax.dataValues.payment_date,
    end_payment_date: paymentMinMax.dataValues.next_payment
  }, {where: {id}})
}

export const createListPayments = async (payments, status = 'Waiting for payment', loan_id) => {
  await PaymentModel.bulkCreate(payments.map(e => ({
    ...e,
    status,
    loan_id,
    date: new Date(e.date),
    created_at: new Date(),
    updated_at: new Date()
  })));
}
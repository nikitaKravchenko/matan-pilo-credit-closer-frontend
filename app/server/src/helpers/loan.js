export const createLoan = (data) => {
  const loan_amount = +data.loan_amount;
  const payment_amount = +data.payment_amount;

  const {status, customer_id, number_payments, payment_period} = data;

  return {
    loan_amount,
    payment_amount,
    payment_period,
    number_payments,
    profit: 0 - +loan_amount,
    return_total: 0,
    status,
    customer_id,
    created_at: new Date(),
    updated_at: new Date()
  }
}

export const updateLoanParams = (data, loan) => {
  let obj = {};

  for (let key in data) {
    if (key === 'loan_amount') {
      obj = Object.assign(obj, loanAmountProfit(data[key], loan.return_total));
      continue;
    }
    obj[key] = data[key];
  }

  return obj;
}


export const loanAmountProfit = (loan_amount, return_total) => {
  return {
    loan_amount,
    profit: -loan_amount + +return_total,
  }
}
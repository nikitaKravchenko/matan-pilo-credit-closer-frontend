import {renameDataLoans} from "./renameData";

export const reportLoansPaid = (loans, payments, customer) => {
  let totalAmount = 0;
  const loansPaid = loans.map((e) => {
    const {id, customer_id} = e.dataValues;
    const {first_name, last_name, email, phone} = customer.find(
      data => data.dataValues.id === customer_id
    ).dataValues;

    const {data, total} = renameDataLoans({
      ...e.dataValues, first_name, last_name, email, phone,
      payments: payments.rows.filter(data => data.dataValues.loan_id === id)
    });

    totalAmount += total;

    return data;
  });


  return {
    totalAmount,
    loansPaid
  }
}
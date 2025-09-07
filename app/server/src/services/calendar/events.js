import CustomerModel from "../../models/customer";
import LoanModel from "../../models/loan/";

export const getFullNameEvent = async (payments) => {
  const newArr = [];

  for (let item of payments) {
    const loan = await LoanModel.findByPk(item.dataValues.loan_id, {
      attributes: ['customer_id']
    });

    newArr.push({
      ...item.dataValues,
      ...await getFullNameLoan(loan.dataValues.customer_id),
      amount: item.dataValues.amount / 100
    });
  }

  return newArr;
}

export const getFullNameLoan = async (id) => {
  const customer = await CustomerModel.findByPk(id, {
    attributes: ['first_name', 'last_name', 'id', 'phone', 'email']
  });

  return {
    full_name: customer.dataValues.first_name + ' ' + customer.dataValues.last_name,
    customer_id: customer.dataValues.id,
    phone: customer.dataValues.phone,
    email: customer.dataValues.email
  }
}

import format from "date-fns/format";

export const renameDataLoans = (data) => {
  let total = 0;

  const newData = {
    "Id": data.id,
    'Loan amount': styleMoney(data.loan_amount),
    'Payment amount': styleMoney(data.payment_amount),
    'Return total': styleMoney(data.return_total),
    'Profit': styleMoney(data.profit),
    'Start payment date': data.start_payment_date,
    payments: data.payments.map(item => {
      total += item.dataValues.amount / 100
      return {
        'Id': item.dataValues.id,
        'Customer Id': data.customer_id,
        'Full Name': `${data.first_name} ${data.last_name}`,
        'Email': data.email,
        'Phone': data.phone,
        'Amount': styleMoney(item.dataValues.amount),
        'Payment Date': format(item.dataValues.date, 'yyyy-MM-dd HH:mm'),
      }
    })
  }

  return {
    data: newData,
    total
  }
}

export const renameDataLoansOverdue = (data) => {
  return {
    'Id': data.id,
    'Customer Id': data.customer_id,
    'Full Name': `${data.first_name} ${data.last_name}`,
    'Email': data.email,
    'Phone': data.phone,
    'Loan amount': styleMoney(data.loan_amount),
    'Payment amount': styleMoney(data.payment_amount),
    'Return total': styleMoney(data.return_total),
    'Profit': styleMoney(data.profit),
  }
}

export const styleMoney = (num, d = 100) => {
  return `<span style="color: ${+num > 0 ? 'green' : 'black'}">$${num / d}</span>`
}
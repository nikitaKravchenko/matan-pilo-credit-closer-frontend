export const newPayments = (payments) => {
  if(!payments.length) {
    return `<h4>No new payments</h4>`
  }

  let thead = `
    <thead>
      <tr>
        ${Object.keys(payments[0]).map(i => "<th>" + i + "</th>").join('')}
      </tr>
    </thead>
  `;

  let tbody = payments.map((item, i) =>
    `<tr style="background: ${i % 2 ? "aliceblue" : "transparent"}">` +
        Object.keys(item).map(i => "<td>" + item[i] + "</td>").join('') +
    '</tr>'
  ).join('');

  return (`
   <table>
      ${thead}
      <tbody>
         ${tbody}
      </tbody>
    </table>
  `);
}

export const paidLoans = (loans) => {
  if(!loans.length) {
    return `<h4>No loans</h4>`
  }
  return loans.map((item, i) => {
    const loansTable = Object.keys(item).map(e => e !== 'payments' ? `
      <div class="wrapper-tr">
        <div class="border-info">
          <div class="m15 wrapper-th-start">${e}</div>
        </div>
        <div class="m15 wrapper-th-end">${item[e]}</div>
      </div>
    ` : null).join('');

    const payments = `
      <div class="new-payments">
        ${newPayments(item.payments)}
      </div>
    `

    return (`
      <div class="wrapper-table">
        ${!i ? ' <div class="line"></div>' : ''}
        ${loansTable}
        ${payments}
        <div class="line"></div>
      </div>
    `)
  }).join('');
}
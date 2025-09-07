import {Op} from "sequelize";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import LoanModel from "../../models/loan";
import CustomerModel from "../../models/customer";
import {renameDataLoansOverdue} from "./renameData";

export const reportLoansOverdue = async (end) => {
  const loans = await LoanModel.findAll({
    where: {start_payment_date: {[Op.lte]: format(addDays(end, -1), 'yyyy-MM-dd')}}
  });

  const loansPaid = [];

   for (let item of loans) {
    const customer = await CustomerModel.findByPk(item.dataValues.customer_id, {
      attributes: ['first_name', 'last_name', 'email', 'phone']
    });

     loansPaid.push(renameDataLoansOverdue({...item.dataValues, ...customer.dataValues}))
  }

  return loansPaid;
}
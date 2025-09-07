import {Op} from "sequelize";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import LoanModel from "../models/loan";
import SettingModel from "../models/settings";
import CustomerModel from "../models/customer";

import {messageTemplateParse} from "../helpers/message-template.parse";
import {sendMessageSMTP} from "../services/messages";
import {templateHtml} from "../services/messages/template";
import {paramsSMTP} from "../services/messages/params-smtp.js";

export const sendEmailCustomers = async () => {
  const setting = await SettingModel.findOne({where: {name: 'TO_NOTIFY'}});
  const template = await SettingModel.findOne({where: {name: 'AUTO'}});
  const fromName = await SettingModel.findOne({where: {name: 'FROM_NAME'}});
  const fromEmail = await SettingModel.findOne({where: {name: 'FROM_EMAIL'}});
  const replyToEmail = await SettingModel.findOne({where: {name: 'REPLY_TO_EMAIL'}});

  const loans = await getLoans(+setting.dataValues.value)

  for (let value of loans) {
    const customer = await getCustomers(value.dataValues.customer_id);
    await getMessageTemplate(
      customer.dataValues,
      value.dataValues,
      template.dataValues.value,
      replyToEmail.dataValues.value,
      fromEmail.dataValues.value,
      fromName.dataValues.value
    );
  }

  return 'messages sent';
}

const getLoans = (num) => {
  const and = format(addDays(new Date(), num), 'yyyy-MM-dd');

  return LoanModel.findAll({
    where: {
      status: 'Active',
      next_payment_date: {
        [Op.eq]: and
      }
    },
    attributes: ['customer_id', ['payment_amount', 'amount'], ['next_payment_date', 'date'], 'id']
  });
}

const getCustomers = (customer_id) => {
  return CustomerModel.findByPk(customer_id, {
    attributes: ['id', 'email', 'first_name', 'last_name']
  })
}

const getMessageTemplate = async (customer, loan, template, replyTo, fromEmail, fromName) => {
  const message = messageTemplateParse(template, {...loan, amount: loan.amount / 100});

  const html = templateHtml('send-message', {
    message,
    title: 'Loan repayment period is right'
  });

  await sendMessageSMTP(
    paramsSMTP(
      customer.email,
      html,
      message,
      'Loan repayment',
      fromEmail,
      fromName,
      replyTo
    )
  );
}
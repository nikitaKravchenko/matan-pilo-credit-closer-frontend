import format from "date-fns/format";
import addMonths from "date-fns/addMonths";

import SettingModel from "../../models/settings";
import {sendMessageSMTP} from "../../services/messages";
import {getTemplateDate} from "./getTempateData";
import {templateHtml} from "../../services/messages/template";
import {paramsSMTP} from "../../services/messages/params-smtp.js";

export const getMonthlyReport = async () => {
  const fromName = await SettingModel.findOne({where: {name: 'FROM_NAME'}});
  const fromEmail = await SettingModel.findOne({where: {name: 'FROM_EMAIL'}});
  const replyToEmail = await SettingModel.findOne({where: {name: 'REPLY_TO_EMAIL'}});

  const start = new Date(format(addMonths(new Date(), -1), 'yyyy-MM-dd'))
  const end = new Date(format(new Date(), 'yyyy-MM-dd'));

  const data = await getTemplateDate(start, end);

  const interval = format(start, 'yyyy/MM/dd-') + format(end, 'yyyy/MM/dd');

  await sendReport(
    replyToEmail.dataValues.value,
    fromEmail.dataValues.value,
    fromName.dataValues.value,
    interval,
    data
  );

  return 'success monthly report';
}

export const sendReport = async (replyTo, fromEmail, fromName, interval, data) => {
  const html = templateHtml('report', data);

  await sendMessageSMTP(
    paramsSMTP(
      replyTo,
      html,
      interval,
      "Monthly report",
      fromEmail,
      fromName,
      replyTo
    )
  );
}
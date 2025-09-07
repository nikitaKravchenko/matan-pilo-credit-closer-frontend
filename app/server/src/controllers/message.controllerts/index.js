import SettingModel from "../../models/settings";
import {sendMessageSMTP} from "../../services/messages";
import {paramsSMTP} from "../../services/messages/params-smtp.js";
import {templateHtml} from "../../services/messages/template";

export const sendMessageController = async (req, res) => {
  try {
    const fromName = await SettingModel.findOne(
      {where: {name: 'FROM_NAME'}}
    );
    const fromEmail = await SettingModel.findOne(
      {where: {name: 'FROM_EMAIL'}}
    );
    const replyToEmail = await SettingModel.findOne(
      {where: {name: 'REPLY_TO_EMAIL'}}
    );

    const html = templateHtml('send-message', {
      message: req.body.message,
      title: 'Loan repayment period is right'
    });

    await sendMessageSMTP(
      paramsSMTP(
        req.body.email,
        html,
        req.body.message,
        'Loan repayment',
        fromEmail.dataValues.value,
        fromName.dataValues.value,
        replyToEmail.dataValues.value
      )
    )

    res.status(200).json({message: 'success'})
  } catch (e) {
    res.status(200).json({message: e.message});
  }
}
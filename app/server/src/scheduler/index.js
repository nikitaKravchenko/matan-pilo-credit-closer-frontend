import cron from "node-cron";
import {sendEmailCustomers} from "./sendEmail";
import {getMonthlyReport} from "./report/sendReport";

export const runScheduler = () => {
  cron.schedule('0 0 9 * * *', () => {
    sendEmailCustomers()
      .then(console.log)
      .catch(console.error)
  });

  cron.schedule('0 0 0 1 * *', () => {
    getMonthlyReport()
      .then(console.log)
      .catch(console.error)
  });
}
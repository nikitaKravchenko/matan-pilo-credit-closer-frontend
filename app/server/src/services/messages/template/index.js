import {fileURLToPath} from "url";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

import {newPayments, paidLoans} from "../../../scheduler/report/generationTable";

export const templateHtml = (type, data) => {
  const pathFile = fileURLToPath(import.meta.url);
  const emailTemplate = fs.readFileSync(path.join(pathFile, `../${type}.handlebars`), 'utf8');

  if(type === 'report') {
    handlebars.registerHelper('parseData', function (data) {
      return new handlebars.SafeString(data);
    });

    handlebars.registerHelper('paidLoans', function (data) {
      return new handlebars.SafeString(paidLoans(data));
    });

    handlebars.registerHelper('overdueLoans', function (data) {
      return new handlebars.SafeString(newPayments(data));
    });
  }

  const template = handlebars.compile(emailTemplate);

  return template(data);
}
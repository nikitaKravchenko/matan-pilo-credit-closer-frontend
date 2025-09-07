import React, {useEffect, useState} from 'react';
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";
import format from "date-fns/format";

export const useNewPayments = (period, amount = 0, number = 0, setListPayments) => {
  const [startDate, setStartDate] = useState(new Date());
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    let date = startDate;

    const arr = new Array(+number > 50 ? 50 : +number).fill(1).map((e, i) => {
      if (i) {
        date = endDate(period || 'M1', date, 1)
      }
      return {
        amount: !Number.isNaN(+amount) ? amount : '0',
        date: format(date, 'yyyy-MM-dd') + 'T12:00'
      }
    })

    setPayments(arr);
    setListPayments(arr);
  }, [startDate, period, amount, number]);

  const onChange = ({target}) => {
    const name = target.name.split('_');

    if(name[0] === '0' && name[1] === 'date') {
      setStartDate(new Date(target.value));
    }

    setPayments(e => {
      const arr = [...e];
      arr[name[0]][name[1]] = target.value;
      return arr;
    })
  }

  return [payments, onChange];
};

export const endDate = (type, start, num) => {
  if (type.includes('W')) {
    return addWeeks(new Date(start), num * type[1]);
  }
  if (type.includes('M')) {
    return addMonths(new Date(start), num * type[1]);
  }

  return addDays(new Date(start), num)
}
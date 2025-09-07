import {useEffect, useState} from 'react';
import subDays from 'date-fns/subDays';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import addDays from "date-fns/addDays";

export const useTypeDataAnalytic = (date, setFilter, {min, max}, customerId) => {
  const [aMonthAgo, setAMonthAgo] = useState();
  const [lastMonthDays, setLastMonthDays] = useState([]);

  const dateAllCustomer = (min = new Date(), max = new Date()) => {
    const date = differenceInCalendarDays(new Date(max), new Date(min)) + 1;

    setAMonthAgo(subDays(new Date(max), date));
    setLastMonthDays(Array.from({length: date}, (_, i) => subDays(new Date(max), i)));
  }

  useEffect(() => {
    if (date !== 'all' && date) {
      setAMonthAgo(addDays(new Date(), date));

      if (date > 0) {
        setLastMonthDays(Array.from({length: date}, (_, i) => addDays(new Date(), i)));
        setFilter(e => ({...e, start: new Date(), end: addDays(new Date(), date), all: false}));
      } else {
        setLastMonthDays(Array.from({length: date * -1}, (_, i) => addDays(new Date(), -i)));
        setFilter(e => ({...e, start: addDays(new Date(), date), end: new Date(), all: false}));
      }
    }
  }, [setFilter, date]);

  useEffect(() => {
    if (date === 'all' && min && max) {
      dateAllCustomer(min, max);
    }
    if (date === 'all') {
      setFilter(e => ({...e, all: true}));
    }
  }, [setFilter, date, min, max, customerId]);


  return [aMonthAgo, lastMonthDays];
};

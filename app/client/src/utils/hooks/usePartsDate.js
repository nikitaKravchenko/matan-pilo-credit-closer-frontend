import {useEffect, useState} from 'react';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

export const usePartsDate = (min, max) => {
  const [startParts, setStartParts] = useState({min: '', max: ''});

  useEffect(() => {
    if (min && max) {
      const p = {
        min: format(addDays(new Date(min), -1), 'yyyy-MM-dd'),
        max: format(addDays(new Date(max), 1), 'yyyy-MM-dd')
      }
      setStartParts(p);
    }
  }, [min, max]);

  return [startParts];
};

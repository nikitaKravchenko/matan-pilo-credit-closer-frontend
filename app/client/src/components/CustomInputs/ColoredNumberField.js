import {useRecordContext, NumberField} from 'react-admin';

const ColoredNumberField = ({source, styles = {}}) => {
  const record = useRecordContext({source});

  if (!record || !source) {
    return null;
  }
  record[source] = +record[source];

  return record[source] <= 0 ? (
    <NumberField
      source={source}
      sx={{color: 'black', fontWeight: '', ...styles}}
      options={{style: 'currency', currency: 'USD'}}
    />
  ) : (
    <NumberField
      source={source}
      sx={{color: 'green', fontWeight: '', ...styles}}
      options={{style: 'currency', currency: 'USD'}}
    />
  );
};

export default ColoredNumberField;
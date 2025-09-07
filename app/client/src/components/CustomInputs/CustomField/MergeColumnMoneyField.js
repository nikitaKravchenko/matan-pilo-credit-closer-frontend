import React from 'react';

import ColoredNumberField from "../ColoredNumberField";

const MergeColumnMoneyField = ({one, two}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <ColoredNumberField source={one}/>
      <ColoredNumberField
        source={two}
        styles={{fontSize: '10px'}}
      />
    </div>
  );
};

export default MergeColumnMoneyField;

import React from 'react';
import {useRecordContext} from "react-admin";

const MergeColumnTextField = ({one, two}) => {
  const record = useRecordContext({one});

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <span>{record[one]}</span>
      <span>{record[two]}</span>
    </div>
  );
};

export default MergeColumnTextField;

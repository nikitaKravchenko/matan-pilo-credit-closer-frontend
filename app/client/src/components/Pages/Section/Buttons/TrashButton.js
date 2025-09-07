import React, {useEffect, useState} from 'react';
import {Link} from "react-admin";

import {getCount} from "../../../../utils/api/custom-request";

const TrashButton = ({setFilters, paranoid, resource}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCount(resource + '/count', {paranoid: false})
      .then(({data}) => {
        setCount(data);
        if(!data) {
          setFilters({paranoid: true})
        }
      }).catch(console.error);
  }, [paranoid, resource]);

  const onClick = () => {
    setFilters({paranoid: false})
  }

  return count ? (
    <>
      <div style={{color: '#4978d3'}}>|</div>
      <Link
        to={'#'}
        onClick={onClick}
        sx={{
          margin: '0 0 0 0.5em',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          fontWeight: paranoid ? 'inherit' : 'bold'
        }}
      >
        Trash ({count})
      </Link>
    </>
  ) : null;
};

export default TrashButton;

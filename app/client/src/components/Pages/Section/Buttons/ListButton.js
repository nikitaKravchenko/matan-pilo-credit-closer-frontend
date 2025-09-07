import React, {useEffect, useState} from 'react';
import {Link} from "react-admin";

import {getCount} from "../../../../utils/api/custom-request";

const ListButton = ({setFilters, paranoid, resource}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCount(resource + '/count', {paranoid: true})
      .then(({data}) => {
        setCount(data);
      }).catch(console.error);
  }, [paranoid, resource]);

  const onClick = () => {
    setFilters({paranoid: true})
  }

  return (
    <Link
      to={'#'}
      onClick={onClick}
      sx={{
        margin: '0 0.5em 0',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: paranoid ? 'bold' : 'inherit'
      }}
    >
      All ({count})
    </Link>
  );
};

export default ListButton;

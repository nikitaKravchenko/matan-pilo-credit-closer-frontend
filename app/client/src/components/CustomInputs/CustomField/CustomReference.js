import React from 'react';
import {Link} from "react-router-dom";

export const CustomReferenceLink = ({reference, source, children}) => {
  return (
    <Link to={`/${reference}/${source}`} style={{textDecoration: 'none'}}>
      {children}
    </Link>
  );
}
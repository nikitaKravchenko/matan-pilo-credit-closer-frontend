import React from 'react';
import Box from "@mui/material/Box";

import ListButton from "./Buttons/ListButton";
import TrashButton from "./Buttons/TrashButton";
import {useListContext} from "react-admin";

const TitleList = ({width = 'auto'}) => {
  const {setFilters, filterValues: {paranoid = true}, resource} = useListContext();

  return (
    <Box display='flex' marginBottom='5px' width={width}>
      <ListButton
        setFilters={setFilters}
        paranoid={paranoid}
        resource={resource}
      />
      <TrashButton
        setFilters={setFilters}
        paranoid={paranoid}
        resource={resource}
      />
    </Box>
  );
};

export default TitleList;

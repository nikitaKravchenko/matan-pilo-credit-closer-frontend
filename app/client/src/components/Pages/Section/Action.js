import React from "react";
import Box from "@mui/material/Box";
import {CreateButton, FilterButton, TopToolbar} from "react-admin";
import TitleList from "./TitleList";

const Actions = () => {
  return (
    <TopToolbar>
      <Box width={{xs: '100%'}} display={{xs: 'block', md: 'none'}}>
        <TitleList width='100%'/>
      </Box>
      <FilterButton/>
      <CreateButton/>
    </TopToolbar>
  )
}

export default Actions;
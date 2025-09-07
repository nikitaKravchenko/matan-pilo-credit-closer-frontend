import React from 'react';
import {useSidebarState, useTranslate} from "react-admin";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";

const SubMenu = (props) => {
  const {handleToggle, isOpen, name, icon, children, dense} = props;
  const translate = useTranslate();

  const [sidebarIsOpen] = useSidebarState();

  const header = (
    <MenuItem dense={dense} onClick={handleToggle}>
      <ListItemIcon sx={{minWidth: 5}}>{icon}</ListItemIcon>
      <Typography variant="inherit" color="textSecondary">
        {translate(name)}
      </Typography>
    </MenuItem>
  );

  return (
    <div>
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
        <Tooltip title={translate(name)} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
          sx={{
            '& a': {
              transition:
                'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
              paddingLeft: sidebarIsOpen ? 4 : 2,
            },
          }}
        >
          {children}
        </List>
      </Collapse>
    </div>
  );
};

export default SubMenu;
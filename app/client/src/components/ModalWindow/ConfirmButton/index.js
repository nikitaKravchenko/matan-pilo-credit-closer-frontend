import React, {useState} from 'react';
import Button from "@mui/material/Button";
import ModalConfirm from "./ModalConfirm";
import ActionDelete from '@mui/icons-material/Delete';
import useMediaQuery from "@mui/material/useMediaQuery";

const ConfirmDeleteButton = ({resource, confirmTitle, confirmContent, redirect, styleTrashButton = {}}) => {
  const [open, setOpen] = useState(false);
  const isSmall = useMediaQuery(theme =>
    theme.breakpoints.down('sm')
  );
  const closeWindow = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        color='error'
        size='small'
        sx={{lineHeight: 1.5, ...styleTrashButton}}
        onClick={() => setOpen(true)}
      >
        <ActionDelete
          color='error'
          sx={!isSmall ? {height: 18, width: 18} : {height: 24, width: 24}}
        />
        {!isSmall && (
          <span style={{marginLeft: 8}}>DELETE</span>
        )}
      </Button>
      {open && (
        <ModalConfirm
          closeWindow={closeWindow}
          resource={resource}
          confirmTitle={confirmTitle}
          confirmContent={confirmContent}
          redirect={redirect}
        />
      )}
    </div>
  );
};

export default ConfirmDeleteButton;
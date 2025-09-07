import React from 'react';
import {useRecordContext, useDelete, useRefresh, useRedirect} from "react-admin";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CancelIcon from "@mui/icons-material/ErrorOutline";
import ConfirmIcon from "@mui/icons-material/CheckCircle";

import {toast} from "../../Toastify";
import './styles.css';

const ModalConfirm = ({closeWindow, resource, confirmTitle, confirmContent, redirect}) => {
  const {id} = useRecordContext();
  const path = useRedirect();
  const refresh = useRefresh();
  const [oneDelete] = useDelete();

  const onClick = () => {
    oneDelete(resource, {id}, {
      onSuccess: () => {
        closeWindow();
        toast('Successfully removed', 'success');
        if(redirect) {
          path(redirect)
        } else {
          refresh();
        }
      },
      onError: (e) => {
        toast(e.response.data, 'error');
        closeWindow();
      },
    })
  }

  return (
    <Modal
      open={true}
      onClose={() => {}}
    >
      <Box>
        <Box className='confirm-modal-window'>
          <DialogTitle>
            {confirmTitle ? confirmTitle :
              `Delete ${resource} #${id}`
            }
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              {confirmContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              startIcon={<CancelIcon/>}
              onClick={closeWindow}
            >
              CANCEL
            </Button>
            <Button
              onClick={onClick}
              startIcon={<ConfirmIcon/>}
            >
              CONFIRM
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConfirm;
import { FC } from 'react'
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@mui/material';
import { SnackbarAlert } from './SnackbarAlert.tsx';
import { SetAction } from '../../../types';
import { Transition } from './Transition.tsx';
import { LoadingModal } from './LoadingModal.tsx';

export interface DeleteConfirmationDialogProps {
    errorDeleted?: string;
    loadingDelete?: boolean;
    messageSuccess?: string;
    onClose: VoidFunction;
    onDelete: VoidFunction;
    open: boolean;
    setErrorDeleted?: SetAction<string>;
    setShowDeletedSuccess?: SetAction<boolean>;
    showDeletedSuccess?: boolean;
}
export const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = (props) => {
  const { open, onDelete, onClose, loadingDelete = false, errorDeleted = '', 
    showDeletedSuccess = false, setErrorDeleted, setShowDeletedSuccess, messageSuccess = '' } = props;
    
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
                      ¿Está seguro de que desea eliminar este elemento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
                      Cancelar
          </Button>
          <Button onClick={onDelete} variant="contained" color="error">
                      Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <LoadingModal loading={loadingDelete} />
      { setErrorDeleted ? <SnackbarAlert open={errorDeleted !== ''} handleClose={() => setErrorDeleted('')}
        message={errorDeleted} severity="error" /> : undefined}
      { setShowDeletedSuccess ? <SnackbarAlert open={showDeletedSuccess} handleClose={() => setShowDeletedSuccess(false)}
        message={messageSuccess} severity="success" /> : undefined }
    </>
  );
};
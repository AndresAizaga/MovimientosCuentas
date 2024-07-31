import { FC } from 'react';
import { PreventGoBackProps } from './PreventGoBack.types.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { usePreventGoBack } from './PreventGoBack.hook.ts';
import { Transition } from '../Transition.tsx';

export const PreventGoBack: FC<PreventGoBackProps> = (props) => {
  const { state, callbacks } = usePreventGoBack(props);
  const { showPreventGoBack } = state;
  const { handleCancelButton, handleDiscard } = callbacks;
    
  return (
    <Dialog
      open={showPreventGoBack}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancelButton}
    >
      <DialogTitle>¿Cerrar sin guardar?</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Todos sus cambios se perderán. ¿Qué desea hacer?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelButton} color="primary">
                    Cancelar
        </Button>
        <Button onClick={handleDiscard} variant="contained" color="error">
                    Descartar los cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};
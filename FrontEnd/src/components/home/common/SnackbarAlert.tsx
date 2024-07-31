import { FC, SyntheticEvent, forwardRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { AlertColor } from '@mui/material/Alert/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface SnackbarAlertProps {
    handleClose: VoidFunction;
    message: string;
    open: boolean;
    severity: AlertColor;
}

export const SnackbarAlert: FC<SnackbarAlertProps> = ({ open, handleClose: closeSnackbarAction, severity, message }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbarAction();
  };
    
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
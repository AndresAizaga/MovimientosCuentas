import { FC, ReactNode, useState } from 'react';
import { AppBar, Box, Button, Dialog, DialogProps, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Transition } from './Transition';
import { PreventGoBack } from './preventGoBack';

export interface DialogFormProps extends DialogProps {
    actionButton: VoidFunction;
    buttonIcon?: ReactNode;
    children: ReactNode;
    enabledButton?: boolean;
    handleClose?: VoidFunction;
    open: boolean;
    showCloseButton?: boolean;
    stateByForm: Record<string, unknown>;
    title: string;
    titleButton?: string;
}
export const DialogForm: FC<DialogFormProps> = (props) => {
  const { fullScreen = true, open, title, titleButton,
    showCloseButton = true, enabledButton, actionButton, buttonIcon,
    handleClose, stateByForm, children } = props;
  const [onPressCancel, setOnPressCancel] = useState(false);
    
  return (
    <Dialog
      {...props}
      fullScreen={fullScreen}
      open={open}
      onClose={() => setOnPressCancel(true)}
      TransitionComponent={Transition}
    >
      {handleClose && stateByForm ?
        <PreventGoBack handleClose={handleClose} state={stateByForm}
          onPressCancel={onPressCancel} clearOnPressCancel={() => setOnPressCancel(false)} />
        : undefined }
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          {showCloseButton ? 
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOnPressCancel(true)}
            >
              <CloseIcon />
            </IconButton> 
            : undefined}
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <Button variant="contained" color="secondary" disabled={!enabledButton} endIcon={buttonIcon} onClick={actionButton}>
            {titleButton}
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
        {children}
      </Box>
    </Dialog>
  );
};
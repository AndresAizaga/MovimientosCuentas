import { FC, ReactNode } from 'react';
import { AppBar, Box, Dialog, DialogProps, IconButton, Toolbar, Typography } from '@mui/material';
import { Transition } from './Transition.tsx';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogViewProps extends DialogProps {
    children: ReactNode;
    handleClose?: VoidFunction;
    open: boolean;
    title: string;
}
export const DialogView: FC<DialogViewProps> = (props) => {
  const { fullScreen = true, open, handleClose, title, children } = props;
    
  return (
    <Dialog
      {...props}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
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
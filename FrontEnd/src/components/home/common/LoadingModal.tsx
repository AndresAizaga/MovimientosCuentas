import { FC } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export interface LoadingModalProps {
    loading: boolean;
}
export const LoadingModal: FC<LoadingModalProps> = ({ loading }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" size={70} />
      </Backdrop>
    </div>
  );
};
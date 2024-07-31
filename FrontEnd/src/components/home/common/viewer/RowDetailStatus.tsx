import { FC } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface RowsDetailStatusProps {
    value: boolean;
}
export const RowDetailStatus: FC<RowsDetailStatusProps> = ({ value }) => {
  const theme = useTheme();
  const inactiveColor = theme.palette.grey[400];
    
  return (
    <Box sx={{
      backgroundColor: value ? '#65C466' : inactiveColor,
      padding: '5px 10px',
      borderRadius: '5px',
      color: 'white',
      textAlign: 'center',
      width: 80
    }}>
      { value ? 'Activo' : 'Inactivo' }
    </Box>
  );
};
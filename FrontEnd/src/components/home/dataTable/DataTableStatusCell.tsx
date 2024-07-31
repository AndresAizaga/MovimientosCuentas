import { FC } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GridValidRowModel } from '@mui/x-data-grid/models/gridRows';

export const DataTableStatusCell: FC<GridRenderCellParams<GridValidRowModel, boolean>> = ({ value }) => {
  const theme = useTheme();
  const inactiveColor = theme.palette.grey[400];
    
  return (
    <Box sx={{ 
      backgroundColor: value ? '#65C466' : inactiveColor,
      padding: '5px 10px',
      borderRadius: '5px',
      color: 'white',
      textAlign: 'center' 
    }}>
      { value ? 'Activo' : 'Inactivo' }
    </Box>
  );
};
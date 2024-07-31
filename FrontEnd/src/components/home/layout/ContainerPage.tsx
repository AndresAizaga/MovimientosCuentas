import { FC, ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export interface ContainerPageProps {
    children: ReactNode;
}
export const ContainerPage: FC<ContainerPageProps> = ({ children }) => {
  const theme = useTheme();
    
  const background = theme.palette.background.paper;
  const color = theme.palette.primary.main;
  const title = 'Clientes';
    
    
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          border: '0.5px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          padding: '0px 40px',
          background,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, mt: 3, fontWeight: 'bold', color }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};
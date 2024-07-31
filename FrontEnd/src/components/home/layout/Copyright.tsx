import { FC } from 'react';
import { Box, Link, Typography } from '@mui/material';

export const Copyright: FC = (props) => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {`Copyright © ${new Date().getFullYear()} Desarrollado por `}
        <Link color="primary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }} 
          href="#" target="_blank" rel="noopener noreferrer">
                  Andrés Aizaga
        </Link>
        {'.'}
      </Typography>
    </Box>
  );
};

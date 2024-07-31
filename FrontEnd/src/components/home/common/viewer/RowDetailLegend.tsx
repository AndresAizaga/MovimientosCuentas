import { FC } from 'react';
import { Divider, Typography } from '@mui/material';

export interface RowDetailLegendProps {
    title: string;
}
export const RowDetailLegend: FC<RowDetailLegendProps> = ({ title }) => {

  return (
    <Divider textAlign="left" sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">{title}</Typography>
    </Divider>
  );
};
import { FC, useMemo } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import { RowDetailStatus } from './RowDetailStatus.tsx';
import { useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

// eslint-disable-next-line react-refresh/only-export-components
export enum RowDataType {
    Default = 'Default',
    Phone = 'Phone',
    Status = 'Status',
}

export interface RowDetailItemProps {
    data?: string | boolean | number;
    label: string;
    rowDataType?: RowDataType;
}

export const RowDetailItem: FC<RowDetailItemProps> = ({ data = '[No disponible]', label, rowDataType = RowDataType.Default }) => {
  const theme = useTheme();
  const labelColor = blue[400];
  const textColor = theme.palette.grey[700];

  const rowData = useMemo(() => {
    switch (rowDataType) {
    case RowDataType.Status:
      return <RowDetailStatus value={data as boolean || false}/>;
    case RowDataType.Phone:
      return <Link href={`tel:${data}`} target="_blank" rel="noopener"> {data}</Link>;
    default:
      return <Typography variant="body2" color={textColor} fontSize={17}>{data}</Typography>;
    }
  }, [data, rowDataType, textColor]);

  return (
    <>
      <Grid item xs={6} md={6}>
        <Typography variant="body2" color={labelColor} fontSize={14} fontWeight="bold">{label}:
          {
            rowData
          }
        </Typography>
      </Grid>
    </>
  );
};

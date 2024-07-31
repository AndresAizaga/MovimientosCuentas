import { FC } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from '@mui/material';
import { GridValidRowModel } from '@mui/x-data-grid/models/gridRows';

export const DataTablePhoneCell: FC<GridRenderCellParams<GridValidRowModel, string>> = ({ value }) => {
  if (!value) return null;

  return (
    <Link href={`tel:${value}`} target="_blank" rel="noopener">
      {value}
    </Link>
  );
};

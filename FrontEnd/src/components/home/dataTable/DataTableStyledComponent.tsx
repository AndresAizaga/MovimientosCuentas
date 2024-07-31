import { styled } from '@mui/material/styles';
import { DataGrid, GridActionsCellItem, gridClasses } from '@mui/x-data-grid';
import { alpha } from '@mui/material';
import { ODD_OPACITY } from './dataTableConstants.ts';

export const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '& .MuiDataGrid-cell--editable': {
      '& .MuiInputBase-root': {
        height: '100%',
      },
    },
    '& .Mui-error': {
      backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
      color: theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f',
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  },
  '& .MuiDataGrid-menuIconButton': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiDataGrid-sortIcon': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiTablePagination-toolbar': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiTablePagination-selectIcon': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiDataGrid-toolbarContainer': {
    marginBottom: '15px'
  },
}));

export const GridActionsCellItemStyled = styled(GridActionsCellItem)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    color: theme.palette.error.main
  }
}));
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton, esES
} from '@mui/x-data-grid';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useCallback, useMemo } from 'react';
import { GridActionsCellItemStyled, StripedDataGrid } from './DataTableStyledComponent.tsx';
import { DataTableProps } from './DataTable.types.ts';
import _cloneDeep from 'lodash/cloneDeep';

export const DataTable = (props: DataTableProps) => {
  const { columns, handleViewClick, handleEditClick, handleDeleteClick,
    additionalActions = [], disabledActions = false, labelAddButton, handleAddClick,
    updateList, initialColumnsHide, getRowClassName } = props;

  const viewAction = useCallback(
    (id: GridRowId) => () => {
      if (handleViewClick) handleViewClick(id);
    },[handleViewClick],
  );

  const editAction = useCallback(
    (id: GridRowId) => () => {
      if (handleEditClick) handleEditClick(id);
    },[handleEditClick],
  );

  const deleteAction = useCallback(
    (id: GridRowId) => () => {
      if (handleDeleteClick) handleDeleteClick(id);
    },[handleDeleteClick],
  );

  const addAction = useCallback(() => {
    if (handleAddClick) handleAddClick();
  }, [handleAddClick]);

  const columnsDataTable = useMemo<GridColDef[]>(() => {
    const columnsUpdated = _cloneDeep(columns);

    if (!columns.some((c) => c.field === 'actions')
        && (handleViewClick || (!disabledActions))) {

      columnsUpdated.push({
        field: 'actions',
        type: 'actions',
        headerName: 'Acciones',
        sortable: false,
        filterable: false,
        hideable: false,
        width: 150,
        getActions: (params) => {
          const actions: JSX.Element[] = [];

          if (handleViewClick) actions.push(<GridActionsCellItem icon={<Tooltip
            title="Ver Detalles"><VisibilityIcon /></Tooltip>} label="Ver Detalles" onClick={viewAction(params.id)} />);

          if (!disabledActions) {
            if(handleEditClick) actions.push(<GridActionsCellItem
              icon={<Tooltip title="Editar"><EditIcon /></Tooltip>} label="Editar"
              onClick={editAction(params.id)} />);
            if(handleDeleteClick) actions.push(<GridActionsCellItemStyled icon={<Tooltip title="Eliminar"><DeleteIcon /></Tooltip>}
              label="Eliminar" onClick={deleteAction(params.id)} />);
            actions.push(...additionalActions.map((action) => {
              const additionalAction = (id: GridRowId) => () => {
                action.onClick(id);
              }

              return (
                <GridActionsCellItem
                  key={`additional-action-${action.label}`}
                  icon={<Tooltip title={action.label}>{action.icon}</Tooltip>} label={action.label}
                  onClick={additionalAction(params.id)} />
              )
            }));
          }

          return actions;
        },
      });
    }

    return columnsUpdated;
  }, [additionalActions, columns, deleteAction, disabledActions, editAction, handleDeleteClick,
    handleEditClick, handleViewClick, viewAction]);

  const CustomToolbar = () => {

    return (
      <GridToolbarContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            width: '100%',
          }}
        >
          <Box>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            {
              updateList ?
                <Button color="primary" startIcon={<RefreshIcon />} onClick={updateList}>
              Actualizar
                </Button>
                : undefined }
          </Box>
          {
            handleAddClick ?
              <Box>
                <Button color="success" variant="contained" startIcon={<AddIcon />} onClick={addAction}>
                    Añadir {labelAddButton || 'Registro'}
                </Button>
              </Box>
              : undefined
          }
        </Stack>
      </GridToolbarContainer>
    );
  };

  return (
    <Box style={{ width: '100%' }}>
      <StripedDataGrid
        {...props}
        columns={columnsDataTable}
        autoHeight={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
              ...initialColumnsHide,
            },
          },
        }}
        hideFooterSelectedRowCount={true}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSizeOptions={[5, 10, 20]}
        slots={{ toolbar: CustomToolbar }}
        getRowClassName={getRowClassName ? getRowClassName : (params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
    </Box>
  );
};

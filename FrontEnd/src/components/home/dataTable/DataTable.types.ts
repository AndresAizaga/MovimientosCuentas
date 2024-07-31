import { DataGridProps, GridRowId } from '@mui/x-data-grid';
import { VoidFunctionArgument } from '../../../types';

export interface AdditionalAction {
    icon: JSX.Element;
    label: string;
    onClick: VoidFunctionArgument<GridRowId>;
}

export interface DataTableProps extends DataGridProps {
    additionalActions?: AdditionalAction[];
    disabledActions?: boolean;
    handleAddClick?: VoidFunction;
    handleDeleteClick?: VoidFunctionArgument<GridRowId>;
    handleEditClick?: VoidFunctionArgument<GridRowId>;
    handleViewClick?: VoidFunctionArgument<GridRowId>;
    initialColumnsHide?: Record<string, boolean>;
    labelAddButton?: string;
    updateList?: VoidFunction;
}
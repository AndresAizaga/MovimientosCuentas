import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { SetAction, VoidFunctionArgument, VoidFunctionPromise } from '../../types';

export interface Persona {
    direccion?: string,
    edad?: number,
    genero?: string,
    id?: number;
    identificacion?: string,
    nombre?: string,
    telefono?: string
}

export interface Client {
    estado?: boolean,
    id?: number,
    password?: string,
    persona?: Persona,
    personaId?: number
}

export interface SaveClient {
    direccion?: string,
    edad?: number,
    estado?: boolean,
    genero?: string,
    identificacion?: string,
    nombre?: string,
    password?: string,
    telefono?: string
}

export interface HiringTestState {
    clientApiError: string;
    clientColumns: GridColDef[];
    clientDetails?: Client;
    clientFormSuccess: string;
    clientList: Client[];
    errorClientDeleted: string;
    loadingData: boolean;
    loadingDeleteClient: boolean;
    loadingList: boolean;
    openDrawerMenu: boolean;
    showClientDeletedSuccess: boolean;
    showClientForm: boolean;
    showClientViewer: boolean;
    showDeleteConfirmationClient: boolean;
}
export interface HiringTestCallbacks {
    handleAddClient: VoidFunction;
    handleClientDelete: VoidFunctionArgument<GridRowId>;
    handleClientEdit: VoidFunctionArgument<GridRowId>;
    handleClientView: VoidFunctionArgument<GridRowId>;
    handleClose: VoidFunction;
    handleGetAgenciesList: VoidFunctionPromise;
    onDeleteClient: VoidFunctionPromise;
    setClientApiError: SetAction<string>;
    setClientFormSuccess: SetAction<string>;
    setErrorClientDeleted: SetAction<string>;
    setShowClientDeletedSuccess: SetAction<boolean>;
    setShowDeleteConfirmationClient: SetAction<boolean>;
    toggleDrawer: VoidFunction;
}

export interface UseHiringTest {
    callbacks: HiringTestCallbacks;
    state: HiringTestState;
}
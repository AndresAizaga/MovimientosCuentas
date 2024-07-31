import { Client, HiringTestCallbacks, HiringTestState, UseHiringTest } from './HiringTest.types.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { DataTablePhoneCell, DataTableStatusCell } from './dataTable';
import { deleteClient, getAllClients, getDetailsClients } from '../../tools/clientAPi.ts';

export const useHiringTest = (): UseHiringTest => {
  const [openDrawerMenu, setOpenDrawerMenu] = useState(false);
  const [clientList, setClientList] = useState<Client[]>([]);
  const [clientDetails, setClientDetails] = useState<Client | undefined>(undefined);

  const [loadingList, setLoadingList] = useState(false);

  // Client Form
  const [showClientForm, setShowClientForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<GridRowId | undefined>(undefined);
  const [showClientViewer, setShowClientViewer] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [clientFormSuccess, setClientFormSuccess] = useState('');
  const [clientApiError, setClientApiError] = useState<string>('');

  // Delete client
  const [showDeleteConfirmationClient, setShowDeleteConfirmationClient] = useState<boolean>(false);
  const [showClientDeletedSuccess, setShowClientDeletedSuccess] = useState<boolean>(false);
  const [errorClientDeleted, setErrorClientDeleted] = useState<string>('');
  const [loadingDeleteClient, setLoadingDeleteClient] = useState<boolean>(false);

  const clientColumns: GridColDef[] = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'identificacion', headerName: 'Identificación', width: 150,
      valueGetter: (params) => params.row.persona.identificacion
    },
    { field: 'nombre', headerName: 'Nombre', width: 180,
      valueGetter: (params) => params.row.persona.nombre
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 90,
      renderCell: DataTableStatusCell
    },
    { field: 'edad', headerName: 'Edad', type: 'number', width: 70,
      valueGetter: (params) => params.row.persona.edad
    },
    { field: 'genero', headerName: 'Género', width: 100,
      valueGetter: (params) => params.row.persona.genero
    },
    { field: 'password', headerName: 'Contraseña', width: 100 },
    { field: 'telefono', headerName: 'Número telefónico', width: 120, renderCell: DataTablePhoneCell,
      valueGetter: (params) => params.row.persona.telefono
    },
    { field: 'direccion', headerName: 'Dirección', width: 120,
      valueGetter: (params) => params.row.persona.direccion
    },
  ], []);

  const toggleDrawer = () => {
    setOpenDrawerMenu((prevState) => !prevState);
  };
    
  const state: HiringTestState = { openDrawerMenu, clientList, loadingList, clientColumns, loadingDeleteClient, 
    showClientDeletedSuccess, showDeleteConfirmationClient, errorClientDeleted, showClientViewer, clientFormSuccess, showClientForm, 
    loadingData, clientDetails, clientApiError };

  const handleGetAgenciesList = useCallback(async () => {
    setLoadingList(true);
    const list = await getAllClients();
    setLoadingList(false);
    if (list.error) {
      setClientApiError(`Se produjo un error al traer la lista: ${list.error.message}`);
    } else {
      setClientList(list.data || []);
    }
  }, []);

  const handleAddClient = useCallback(async () => {
    setShowClientForm(true);
  }, []);

  const handleClose = useCallback(async () => {
    setClientDetails(undefined);
    setShowClientForm(false);
    setShowClientViewer(false);
    await handleGetAgenciesList();
  }, [handleGetAgenciesList]);

  const handleClientView = useCallback( async(id: GridRowId) => {
    setLoadingData(true);
    const response = await getDetailsClients(id as string);
    setLoadingData(false);
    if (response.error) {
      setClientApiError(`Se produjo un error al traer los detalles del cliente: ${response.error.message}`);
    } else {
      setClientDetails(response.data);
      setShowClientViewer(true);
    }
  }, []);

  const handleClientEdit = useCallback(async (id: GridRowId) => {
    setLoadingData(true);
    const response = await getDetailsClients(id as string);
    setLoadingData(false);
    if (response.error) {
      setClientApiError(`Se produjo un error al traer los detalles del cliente: ${response.error.message}`);
    } else {
      setClientDetails(response.data);
      setShowClientForm(true);
    }
  }, []);

  const handleClientDelete = useCallback((id: GridRowId) => {
    setSelectedClient(id);
    setShowDeleteConfirmationClient(true);
  }, []);

  const onDeleteClient = useCallback(async () => {
    setShowDeleteConfirmationClient(false);
    if (selectedClient) {
      setLoadingDeleteClient(true);
      const response = await deleteClient(selectedClient as string);
      setLoadingDeleteClient(false);
      if (response.error) {
        setErrorClientDeleted(`Se produjo un error al eliminar el cliente: ${response.error.message}`);
      } else {
        setShowClientDeletedSuccess(true);
        await handleGetAgenciesList();
      }
    }
  }, [selectedClient]);

  useEffect(() => {
    void handleGetAgenciesList();
    // We execute this function only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const callbacks: HiringTestCallbacks = { toggleDrawer, handleClientEdit, setErrorClientDeleted, onDeleteClient, 
    setShowDeleteConfirmationClient, setShowClientDeletedSuccess, setClientFormSuccess, handleAddClient, 
    handleClientView, handleClientDelete, handleGetAgenciesList, handleClose, setClientApiError };
    
  return { state, callbacks }
}
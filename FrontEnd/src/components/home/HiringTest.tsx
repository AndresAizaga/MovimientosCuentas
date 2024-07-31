import { FC } from 'react';
import { Box, Container, Divider, IconButton, List, Toolbar } from '@mui/material';
import { useHiringTest } from './HiringTest.hook.tsx';
import { AppBar, ContainerPage, Copyright, Drawer, MenuItemLayout } from './layout';
import Logo from '../../assets/logo.svg';
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { DataTable } from './dataTable';
import { DeleteConfirmationDialog, LoadingModal, SnackbarAlert } from './common';
import { ClientForm } from './clientForm';
import { ClientView } from './ClientView.tsx';

export const HiringTest: FC = () => {
  const { state, callbacks } = useHiringTest();
  const { openDrawerMenu, showClientForm, clientFormSuccess, showClientViewer, 
    clientColumns, errorClientDeleted,
    loadingDeleteClient, loadingData, showDeleteConfirmationClient, showClientDeletedSuccess, 
    loadingList, clientList, clientDetails, clientApiError } = state;
  const { toggleDrawer, setShowClientDeletedSuccess, handleClientDelete, 
    handleClientEdit, handleClientView, handleAddClient, 
    handleGetAgenciesList, setClientFormSuccess, onDeleteClient, 
    setErrorClientDeleted, setShowDeleteConfirmationClient, handleClose, setClientApiError } = callbacks;

  return (
    <Box sx={{ display: 'flex', backgroundColor: (theme) =>
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900], }}>
      <AppBar position="absolute" open={openDrawerMenu}>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(openDrawerMenu && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="logo" height={35} />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openDrawerMenu}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MenuItemLayout openMenuDrawer={openDrawerMenu} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ m: 4 }}>
          <ContainerPage>
            <Box sx={{ mb: 5, width: '100%' }}>
              <Box>
                { showClientForm ? <ClientForm showClientForm={showClientForm} setClientFormSuccess={setClientFormSuccess}
                  handleClose={handleClose} clientDetails={clientDetails}/> : undefined}
                { showClientViewer && clientDetails ? 
                  <ClientView showClientView={showClientViewer} handleClose={handleClose} clientDetails={clientDetails} /> : undefined }
                <LoadingModal loading={loadingData} />
                <DataTable loading={loadingList} rows={clientList} columns={clientColumns} handleAddClick={handleAddClient}
                  labelAddButton='CLIENTE' handleDeleteClick={handleClientDelete} handleEditClick={handleClientEdit}
                  handleViewClick={handleClientView} updateList={handleGetAgenciesList} />
                <SnackbarAlert open={clientFormSuccess !== ''} handleClose={() => setClientFormSuccess('')}
                  message={clientFormSuccess} severity="success" />
                <SnackbarAlert open={clientApiError !== ''} handleClose={() => setClientApiError('')}
                  message={clientApiError} severity="error" />
                <DeleteConfirmationDialog open={showDeleteConfirmationClient} onDelete={onDeleteClient}
                  onClose={() => setShowDeleteConfirmationClient(false)} loadingDelete={loadingDeleteClient}
                  errorDeleted={errorClientDeleted} setErrorDeleted={setErrorClientDeleted} showDeletedSuccess={showClientDeletedSuccess}
                  setShowDeletedSuccess={setShowClientDeletedSuccess} messageSuccess="Cliente eliminado exitosamente"/>
              </Box>
            </Box>
          </ContainerPage>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

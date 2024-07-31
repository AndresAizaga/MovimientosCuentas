import { FC } from 'react';
import { Client } from './HiringTest.types.ts';
import { DialogView } from './common';
import { Box, Card, CardContent, Container, Grid } from '@mui/material';
import { RowDataType, RowDetailItem, RowDetailLegend } from './common/viewer';

export interface ClientViewProps {
  clientDetails: Client;
  handleClose: VoidFunction;
  showClientView: boolean;
}

export const ClientView: FC<ClientViewProps> = (props) => {
  const { clientDetails, showClientView, handleClose } = props;
  
  const { persona, password,  
    estado } = clientDetails;
  
  return (
    <DialogView open={showClientView} title="Detalles del Cliente" handleClose={handleClose}>
      <Container component="main" maxWidth="lg" sx={{ mt: 5, mb: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ mt: 1, mb: 3 }}>
              <RowDetailLegend title="Información del Cliente"/>
              <Grid container spacing={4} >
                <Grid container item spacing={4} xs={12} md={12}>
                  <RowDetailItem data={persona?.identificacion} label="Número de identificación" />
                  <RowDetailItem data={persona?.nombre} label="Nombre" />
                  <RowDetailItem data={persona?.genero} label="Género" />
                  <RowDetailItem data={persona?.edad} label="Edad" />
                  <RowDetailItem rowDataType={RowDataType.Phone} label="Número Telefónico" data={persona?.telefono} />
                  <RowDetailItem data={persona?.direccion} label="Dirección" />
                  <RowDetailItem data={password} label="Contraseña" />
                  <RowDetailItem rowDataType={RowDataType.Status} label="Estado" data={estado} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </DialogView>
  );
};

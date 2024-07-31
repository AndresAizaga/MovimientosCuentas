import { FC } from 'react';
import { ClientFormProps } from './ClientForm.types.ts';
import { useClientForm } from './ClientForm.hook.ts';
import { useTheme } from '@mui/material/styles';
import {
  Box, Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlProps,
  Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select,
  TextField,
  TextFieldProps,
  Typography
} from '@mui/material';
import { Save as SaveIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { DialogForm, LoadingModal, SnackbarAlert, SwitchShowOptions } from '../common';
import { IntegerNumberInput, PhoneNumberInput } from '../common/inputs';

export const ClientForm: FC<ClientFormProps> = (props) => {
  const { showClientForm, handleClose, clientDetails } = props;

  const theme = useTheme();
  
  const { state, callbacks } = useClientForm(props);
  const { inputClientForm, errorSaveClientForm, loadingClientForm, 
    errorIdentificacion, identificacion, password, 
    errorNombre, nombre, genero, estado, 
    edad, direccion, telefono,
    errorPhoneNumber, showPassword } = state;
  const { setErrorSaveClientForm, handleSaveClientForm, 
    handleSubmitClientForm, onChangeNombre, 
    onChangeIdentificacion, onChangeGenero, 
    setDireccion, setPassword, 
    setEdad, setEstado, 
    setTelefono, setErrorPhoneNumber, handleTogglePassword } = callbacks;
  
  const enabledSave = !!nombre && nombre !== '' && errorNombre === '' && !errorPhoneNumber
      && !!identificacion && identificacion !== '' && errorIdentificacion === '';

  const commonPropsTextField: TextFieldProps = {
    margin: 'none',
    fullWidth: true,
    size: 'small'
  };

  const commonPropsSelect: FormControlProps = {
    fullWidth: true,
    size: 'small'
  };

  const title = clientDetails?.id ? 'Editar Cliente' : 'Crear Cliente';
  
  return (
    <DialogForm actionButton={handleSaveClientForm} buttonIcon={<SaveIcon />} enabledButton={enabledSave}
      open={showClientForm} title={title} titleButton="Guardar" stateByForm={inputClientForm}
      handleClose={handleClose}>
      <LoadingModal loading={loadingClientForm} />
      <Container component="main" maxWidth="lg" sx={{ mt: 5, mb: 3 }}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h6" sx={{ mt: 1, color: theme.palette.primary.main }}>
                Cliente
            </Typography>
            <Box component="form" onSubmit={handleSubmitClientForm} noValidate sx={{ mt: 1, mb: 3 }}>
              <Grid container spacing={4} >
                <Grid container item spacing={4}  xs={12} md={12}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...commonPropsTextField}
                      error={errorIdentificacion !== ''}
                      helperText={errorIdentificacion}
                      required
                      name="identification"
                      label="Número de identificación"
                      id="identification"
                      defaultValue={identificacion}
                      onChange={onChangeIdentificacion}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...commonPropsTextField}
                      error={errorNombre !== ''}
                      helperText={errorNombre}
                      required
                      name="name"
                      label="Nombre"
                      id="name"
                      defaultValue={nombre}
                      onChange={onChangeNombre}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl {...commonPropsSelect}>
                      <InputLabel id="label-gender">Género</InputLabel>
                      <Select
                        labelId="label-gender"
                        id="select-gender"
                        defaultValue={genero}
                        label="Género"
                        onChange={onChangeGenero}
                      >
                        <MenuItem value="hombre">Hombre</MenuItem>
                        <MenuItem value="mujer">Mujer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...commonPropsTextField}
                      name="edad"
                      label="Edad"
                      id="edad"
                      defaultValue={edad}
                      onChange={(e) => setEdad(+e.target.value)}
                      InputProps={{
                        inputComponent: IntegerNumberInput as never,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PhoneNumberInput
                      {...commonPropsTextField}
                      setErrorPhoneNumber={setErrorPhoneNumber}
                      name="phoneNumber"
                      label="Número telefónico"
                      id="phoneNumber"
                      phoneNumber={telefono || ''}
                      onChangePhoneNumber={setTelefono}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...commonPropsTextField}
                      name="direccion"
                      label="Dirección"
                      id="direccion"
                      defaultValue={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...commonPropsTextField}
                      name="password"
                      label="Contraseña"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      defaultValue={password}
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword}>
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mt: 2 }}>
                      <SwitchShowOptions checked={estado} onChange={() => setEstado((prevState) => !prevState)} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Button type="submit" disabled={!enabledSave} style={{ display: 'none' }}>
                  Save client
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <SnackbarAlert open={errorSaveClientForm !== ''} handleClose={() => setErrorSaveClientForm('')}
        message={errorSaveClientForm} severity="error" />
    </DialogForm>
  );
};

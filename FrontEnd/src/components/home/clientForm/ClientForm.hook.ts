import {
  ClientFormCallbacks,
  ClientFormProps,
  ClientFormState,
  InputClientFormState,
  UseClientForm
} from './ClientForm.types.ts';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SelectChangeEvent } from '@mui/material';
import {Client, SaveClient} from '../HiringTest.types.ts';
import { ActionResult } from '../../../tools/api.ts';
import { saveClient, updateClient } from '../../../tools/clientAPi.ts';

export const useClientForm = (props: ClientFormProps): UseClientForm => {
  const { clientDetails, setClientFormSuccess, handleClose } = props;

  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [nombre, setNombre] = useState<string | undefined>(clientDetails?.persona?.nombre);
  const [telefono, setTelefono] = useState<string | undefined>(clientDetails?.persona?.telefono);
  const [genero, setGenero] = useState<string | undefined>(clientDetails?.persona?.genero);
  const [password, setPassword] = useState<string | undefined>(clientDetails?.password);
  const [estado, setEstado] = useState<boolean>(clientDetails?.estado || false);
  const [identificacion, setIdentificacion] = useState<string | undefined>(clientDetails?.persona?.identificacion);
  const [edad, setEdad] = useState<number | undefined>(clientDetails?.persona?.edad);
  const [direccion, setDireccion] = useState<string | undefined>(clientDetails?.persona?.direccion);

  const [errorSaveClientForm, setErrorSaveClientForm] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorIdentificacion, setErrorIdentificacion] = useState('');
  const [loadingClientForm, setLoadingClientForm] = useState(false);

  const inputClientForm: InputClientFormState = { edad, nombre, genero, estado, identificacion, telefono, password, direccion };

  const state: ClientFormState = { loadingClientForm, telefono, nombre, 
    inputClientForm, genero, password, estado, identificacion, edad, 
    errorSaveClientForm, errorIdentificacion, errorNombre, direccion, errorPhoneNumber, showPassword };

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const onChangeNombre = useDebouncedCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value === '') {
      setErrorNombre('Campo obligatorio');
    } else {
      setErrorNombre('');
    }
    setNombre(value);
  }, 500);

  const onChangeIdentificacion = useDebouncedCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value === '') {
      setErrorIdentificacion('Campo obligatorio');
    } else {
      setErrorIdentificacion('');
    }
    setIdentificacion(value);
  }, 500);

  const onChangeGenero = useCallback(async (e: SelectChangeEvent) => {
    const value = e.target.value;
    setGenero(value);
  }, []);

  const handleSaveClientForm = useCallback(async () => {
    setLoadingClientForm(true);
    let notification: string;
    let response: ActionResult<void>;

    const clientSave: SaveClient = {
      edad, nombre, genero, identificacion, direccion, telefono, estado, password
    }

    if (clientDetails && clientDetails.id) {
      const clientUpdate: Client = {
        id: clientDetails.id, estado, password, personaId: clientDetails.id, persona: {
          edad, nombre, genero, identificacion, direccion, telefono, id: clientDetails.id
        }
      };
      response = await updateClient( clientUpdate);
      notification = 'Cliente actualizado exitosamente';
    } else {
      response = await saveClient(clientSave);
      notification = 'Cliente añadido exitosamente';
    }

    setLoadingClientForm(false);

    if (response.error) {
      setErrorSaveClientForm(response.error.message || 'Se produjo un error interno, por favor contactar con el administrador');
    } else {
      handleClose();
      setClientFormSuccess(notification);
    }

  }, [clientDetails, direccion, edad, estado, genero, handleClose, identificacion, nombre, password, setClientFormSuccess, telefono]);

  const handleSubmitClientForm = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleSaveClientForm();
  }, [handleSaveClientForm]);

  const callbacks: ClientFormCallbacks = { handleSubmitClientForm, handleSaveClientForm, 
    setErrorSaveClientForm, onChangeGenero, onChangeIdentificacion, 
    onChangeNombre, setDireccion, setEdad, setEstado, setPassword, setTelefono, setErrorPhoneNumber, handleTogglePassword };
    
  return { state, callbacks }
}
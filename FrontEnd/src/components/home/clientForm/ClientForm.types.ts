import { DebouncedFunctionCallback, SetAction, VoidFunctionArgument, VoidFunctionPromise } from '../../../types';
import { ChangeEvent, FormEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { Client } from '../HiringTest.types.ts';

export type InputClientFormState = Pick<ClientFormState, 'nombre' | 'direccion' | 'edad'
    | 'estado' | 'genero' | 'identificacion' | 'password' | 'telefono'>;

export interface ClientFormState {
    direccion?: string;
    edad?: number;
    errorIdentificacion?: string;
    errorNombre?: string;
    errorPhoneNumber: boolean;
    errorSaveClientForm: string;
    estado?: boolean;
    genero?: string;
    identificacion?: string;
    inputClientForm: InputClientFormState;
    loadingClientForm: boolean;
    nombre?: string;
    password?: string;
    showPassword: boolean;
    telefono?: string;
}
export interface ClientFormCallbacks {
    handleSaveClientForm: VoidFunctionPromise;
    handleSubmitClientForm: VoidFunctionArgument<FormEvent<HTMLFormElement>>;
    handleTogglePassword: VoidFunction;
    onChangeGenero: VoidFunctionArgument<SelectChangeEvent>;
    onChangeIdentificacion: DebouncedFunctionCallback<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>;
    onChangeNombre: DebouncedFunctionCallback<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>;
    setDireccion: SetAction<string | undefined>;
    setEdad: SetAction<number | undefined>;
    setErrorPhoneNumber: SetAction<boolean>;
    setErrorSaveClientForm: SetAction<string>;
    setEstado: SetAction<boolean>;
    setPassword: SetAction<string | undefined>;
    setTelefono: SetAction<string | undefined>;
}
export interface UseClientForm {
    callbacks: ClientFormCallbacks;
    state: ClientFormState;
}

export interface ClientFormProps {
    clientDetails?: Client;
    handleClose: VoidFunction;
    setClientFormSuccess: SetAction<string>;
    showClientForm: boolean;
}
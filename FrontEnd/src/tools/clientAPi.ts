import {Client, SaveClient} from '../components/home/HiringTest.types.ts';
import { ActionResult, ApiError, AxiosMethod, requestApi } from './api.ts';
import { Endpoints } from '../types/endpoints.ts';
import _get from 'lodash/get';

export interface ApiListAllClient {
  Result: Client[];
}

export const getAllClients = async (): Promise<ActionResult<Client[] | undefined>> => {
  let response: ApiListAllClient | undefined;

  try {
    response = await requestApi<unknown, ApiListAllClient>({}, Endpoints.ListAllClient, AxiosMethod.Get);
  } catch (e) {
    // TODO: Actualizar la respuesta de error
    const { name, message } = _get(e, 'response.data.error', {}) as ApiError;
    const error = new Error(message);
    error.name = name;
    return { error };
  }
    
  if (response) return { data: response.Result }
    
  return {}
}

export const getDetailsClients = async (id: string): Promise<ActionResult<Client | undefined>> => {
  let response: Client | undefined;

  try {
    response = await requestApi<unknown, Client>({}, Endpoints.ClientDetails, AxiosMethod.Get, `/${id}`);
  } catch (e) {
    // TODO: Actualizar la respuesta de error
    const { name, message } = _get(e, 'response.data.error', {}) as ApiError;
    const error = new Error(message);
    error.name = name;
    return { error };
  }

  if (response) return { data: response }

  return {}
}

export const saveClient = async (client: SaveClient): Promise<ActionResult<void>> => {
  try {
    await requestApi<unknown, Client>(client, Endpoints.CreateClient, AxiosMethod.Post);
  } catch (e) {
    // TODO: Actualizar la respuesta de error
    const { name, message } = _get(e, 'response.data.error', {}) as ApiError;
    const error = new Error(message);
    error.name = name;
    return { error };
  }

  return {}
}

export const updateClient = async (client: Client): Promise<ActionResult<void>> => {
  try {
    await requestApi<unknown, Client>(client, Endpoints.UpdateClient, AxiosMethod.Put);
  } catch (e) {
    // TODO: Actualizar la respuesta de error
    const { name, message } = _get(e, 'response.data.error', {}) as ApiError;
    const error = new Error(message);
    error.name = name;
    return { error };
  }

  return {}
}

export const deleteClient = async (id: string): Promise<ActionResult<void>> => {
  try {
    await requestApi<unknown, Client>({}, Endpoints.DeleteClient, AxiosMethod.Delete, `/${id}`);
  } catch (e) {
    // TODO: Actualizar la respuesta de error
    const { name, message } = _get(e, 'response.data.error', {}) as ApiError;
    const error = new Error(message);
    error.name = name;
    return { error };
  }

  return {}
}
import { Endpoints } from '../types/endpoints.ts';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export enum AxiosMethod {
    Delete = 'Delete',
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
}

export interface ApiError {
    details?:Record<string, unknown>;
    message: string;
    name: string;
    status: number;
}

export interface ActionResult<T> {
    data?: T;
    error?: Error;
}

export const requestApi = async <T, D>(data: T, endpoint: Endpoints, method: AxiosMethod, param?: string): Promise<D> => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;

  let url = `${apiURL}${endpoint}`;
  if (param) url += `${param}`;

  const config: AxiosRequestConfig<D> = { timeout: 30000, headers: {
    'Content-Type': 'application/json'
  } };

  let response: AxiosResponse<D, T>;

  if (method === AxiosMethod.Post) {
    response = await axios.post<D>(url, data, config);
  } else if (method === AxiosMethod.Put) {
    response = await axios.put<D>(url, data, config);
  } else if (method === AxiosMethod.Delete) {
    response = await axios.delete<D>(url, config);
  } else {
    response = await axios.get<D>(url, config);
  }

  return response?.data;
}
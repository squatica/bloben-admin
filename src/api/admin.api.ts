import axios, { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';
import {
  AdminChangePasswordRequest,
  AdminLoginRequest,
  AdminUpdateUserRequest,
  GetAdminAccountResponse,
  GetUsersResponse,
} from 'bloben-interface/admin/admin';
import { CommonResponse } from '../data/interface';
import { LoginResponse } from 'bloben-interface/user/user';
import Axios, { config } from '../lib/Axios';

const V1_BASE_PATH = `/${APP_API_VERSION_1}/admin`;

const AdminApi = {
  login: async (
    url: string,
    data: AdminLoginRequest
  ): Promise<AxiosResponse<LoginResponse>> => {
    return axios.post(`${url}/v1/admin/login`, data, config);
  },
  changePassword: async (
    data: AdminChangePasswordRequest,
    token: string
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.post(`${V1_BASE_PATH}/change-password`, data, token);
  },
  logout: async (token: string): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.get(`${V1_BASE_PATH}/logout`, token);
  },
  getAdminAccount: async (
    token: string
  ): Promise<AxiosResponse<GetAdminAccountResponse>> => {
    return Axios.get(`${V1_BASE_PATH}/login`, token);
  },
  getUsers: async (
    token: string
  ): Promise<AxiosResponse<GetUsersResponse[]>> => {
    return Axios.get(`${V1_BASE_PATH}/users`, token);
  },
  createUser: async (
    data: any,
    token: string
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.post(`${V1_BASE_PATH}/users/`, data, token);
  },
  updateUser: async (
    id: string,
    data: AdminUpdateUserRequest,
    token: string
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.patch(`${V1_BASE_PATH}/users/${id}`, data, token);
  },
  deleteUser: async (
    id: string,
    token: string
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.delete(`${V1_BASE_PATH}/users/${id}`, undefined, token);
  },
  getVersion: async () => {
    return Axios.get(`/v1/version`);
  },
};

export default AdminApi;

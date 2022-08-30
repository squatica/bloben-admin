import axios, { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';
import {
  AdminChangePasswordRequest,
  AdminLoginRequest,
  GetAdminAccountResponse,
} from 'bloben-interface/admin/admin';
import { CommonResponse } from '../data/interface';
import { LoginResponse } from 'bloben-interface/user/user';
import Axios, { config } from '../lib/Axios';

const V1_BASE_PATH = `/${APP_API_VERSION_1}/admin/user`;

const AdminApi = {
  login: async (
    url: string,
    data: AdminLoginRequest
  ): Promise<AxiosResponse<LoginResponse>> => {
    return axios.post(`${url}/v1/admin/user/login`, data, config);
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
    return Axios.get(`${V1_BASE_PATH}`, token);
  },
  getVersion: async () => {
    return Axios.get(`/v1/version`);
  },
};

export default AdminApi;

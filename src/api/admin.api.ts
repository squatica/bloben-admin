import axios, { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';
import {
  AdminChangePasswordRequest,
  AdminLoginRequest,
  GetAdminAccountResponse,
  LoginResponse,
} from 'bloben-interface';
import { CommonResponse } from '../data/interface';
import Axios, { config } from '../lib/Axios';

const V1_BASE_PATH = `/admin/${APP_API_VERSION_1}/auth`;

const AdminApi = {
  login: async (
    url: string,
    data: AdminLoginRequest
  ): Promise<AxiosResponse<LoginResponse>> => {
    return axios.post(`${url}/admin/v1/auth/login`, data, config);
  },
  changePassword: async (
    data: AdminChangePasswordRequest
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.post(`${V1_BASE_PATH}/change-password`, data);
  },
  logout: async (): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.get(`${V1_BASE_PATH}/logout`);
  },
  getAdminAccount: async (): Promise<
    AxiosResponse<GetAdminAccountResponse>
  > => {
    return Axios.get(`${V1_BASE_PATH}`);
  },
  getVersion: async () => {
    return Axios.get(`/app/v1/version`);
  },
};

export default AdminApi;

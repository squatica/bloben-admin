import { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';
import { CommonResponse } from '../data/interface';
import {
  EnableTwoFactorRequest,
  GetTwoFactorSecretResponse,
  LoginWithTwoFactorAdminResponse,
  LoginWithTwoFactorRequest,
} from '../bloben-interface/2fa/2fa';

import Axios, { config } from '../lib/Axios';

const V1_BASE_PATH = `/${APP_API_VERSION_1}/admin/user/2fa`;

const AdminApi = {
  loginWith2FA: async (
    data: LoginWithTwoFactorRequest
  ): Promise<AxiosResponse<LoginWithTwoFactorAdminResponse>> => {
    return Axios.post(`${V1_BASE_PATH}/login`, data, config);
  },
  generate2FA: async (
    token: string
  ): Promise<AxiosResponse<GetTwoFactorSecretResponse>> => {
    return Axios.post(`${V1_BASE_PATH}`, {}, token);
  },
  delete2FA: async (token: string): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.delete(`${V1_BASE_PATH}`, {}, token);
  },
  enable2FA: async (
    data: EnableTwoFactorRequest,
    token: string
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.post(`${V1_BASE_PATH}/enable`, data, token);
  },
};

export default AdminApi;

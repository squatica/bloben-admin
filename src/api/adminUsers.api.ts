import { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';
import {
  AdminUpdateUserRequest,
  GetUsersResponse,
} from '../bloben-interface/admin/admin';
import { CommonResponse } from '../data/interface';
import Axios from '../lib/Axios';

const V1_BASE_PATH = `/${APP_API_VERSION_1}/admin/users`;

const AdminUsersApi = {
  getUsers: async (
    token: string
  ): Promise<AxiosResponse<GetUsersResponse[]>> => {
    return Axios.get(`${V1_BASE_PATH}`, token);
  },
  createUser: async (
    data: any,
    token: string
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.post(`${V1_BASE_PATH}`, data, token);
  },
  updateUser: async (
    id: string,
    data: AdminUpdateUserRequest,
    token: string
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.patch(`${V1_BASE_PATH}/${id}`, data, token);
  },
  deleteUser: async (
    id: string,
    token: string
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.delete(`${V1_BASE_PATH}/${id}`, undefined, token);
  },
};

export default AdminUsersApi;

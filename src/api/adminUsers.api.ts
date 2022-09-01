import { AdminUpdateUserRequest, GetUsersResponse } from 'bloben-interface';
import { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';

import { CommonResponse } from '../data/interface';
import Axios from '../lib/Axios';

const V1_BASE_PATH = `/admin/${APP_API_VERSION_1}/users`;

const AdminUsersApi = {
  getUsers: async (): Promise<AxiosResponse<GetUsersResponse[]>> => {
    return Axios.get(`${V1_BASE_PATH}`);
  },
  createUser: async (data: any): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.post(`${V1_BASE_PATH}`, data);
  },
  updateUser: async (
    id: string,
    data: AdminUpdateUserRequest
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.patch(`${V1_BASE_PATH}/${id}`, data);
  },
  deleteUser: async (id: string): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.delete(`${V1_BASE_PATH}/${id}`);
  },
};

export default AdminUsersApi;

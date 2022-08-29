import { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';

import { Log } from '../data/interface';
import Axios from '../lib/Axios';

const V1_BASE_PATH = `/${APP_API_VERSION_1}/admin/logs`;

const AdminApi = {
  getLogTags: async (token: string): Promise<AxiosResponse<string[]>> => {
    return Axios.get(`${V1_BASE_PATH}/tags`, token);
  },
  getLogDates: async (token: string): Promise<AxiosResponse<string[]>> => {
    return Axios.get(`${V1_BASE_PATH}/dates`, token);
  },
  getLogs: async (
    token: string,
    date: string,
    level: string,
    tags: string | null
  ): Promise<AxiosResponse<Log[]>> => {
    return Axios.get(
      `${V1_BASE_PATH}?date=${date}&level=${level}${
        tags !== null ? `&tags=${tags}` : ''
      }`,
      token
    );
  },
};

export default AdminApi;

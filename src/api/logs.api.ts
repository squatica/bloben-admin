import { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';

import { Log } from '../data/interface';
import Axios from '../lib/Axios';

const V1_BASE_PATH = `/admin/${APP_API_VERSION_1}/logs`;

const LogsApi = {
  getLogTags: async (): Promise<AxiosResponse<string[]>> => {
    return Axios.get(`${V1_BASE_PATH}/tags`);
  },
  getLogDates: async (): Promise<AxiosResponse<string[]>> => {
    return Axios.get(`${V1_BASE_PATH}/dates`);
  },
  getLogs: async (
    date: string,
    level: string,
    tags: string | null
  ): Promise<AxiosResponse<Log[]>> => {
    return Axios.get(
      `${V1_BASE_PATH}?date=${date}&level=${level}${
        tags !== null ? `&tags=${tags}` : ''
      }`
    );
  },
};

export default LogsApi;

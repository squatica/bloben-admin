import { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';

import { CommonResponse } from '../data/interface';
import {
  GetServerSettings,
  PatchServerSettings,
} from '../bloben-interface/serverSettings/serverSettings';
import Axios from '../lib/Axios';

const V1_BASE_PATH = `/${APP_API_VERSION_1}/admin`;

const ServerSettingsApi = {
  get: async (token: string): Promise<AxiosResponse<GetServerSettings>> => {
    return Axios.get(`${V1_BASE_PATH}/server-settings`, token);
  },
  patch: async (
    token: string,
    data: PatchServerSettings
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.patch(`${V1_BASE_PATH}/server-settings`, data, token);
  },
};

export default ServerSettingsApi;

import { AxiosResponse } from 'axios';
import { GetServerSettings, PatchServerSettings } from 'bloben-interface';

import { APP_API_VERSION_1 } from '../data/constants';

import { CommonResponse } from '../data/interface';

import Axios from '../lib/Axios';

const V1_BASE_PATH = `/admin/${APP_API_VERSION_1}`;

const ServerSettingsApi = {
  get: async (): Promise<AxiosResponse<GetServerSettings>> => {
    return Axios.get(`${V1_BASE_PATH}/server-settings`);
  },
  patch: async (
    data: PatchServerSettings
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.patch(`${V1_BASE_PATH}/server-settings`, data);
  },
};

export default ServerSettingsApi;

import axios from 'axios';

const headers: any = {
  credentials: 'same-origin',
  'Content-Type': 'application/json',
  withCredentials: true,
};

export const config: any = {
  timeout: 30000,
  headers,
  withCredentials: true,
};

const createConfig = () => {
  return {
    timeout: 30000,
    headers: {
      ...headers,
    },
    withCredentials: true,
  };
};

// @ts-ignore
const getBaseUrl = () => window.env.apiUrl;

const Axios: any = {
  get: async (path: string) => {
    const URL: string = getBaseUrl() + path;
    return axios.get(URL, createConfig());
  },
  getJSON: async (path: string) => {
    const URL: string = getBaseUrl() + path;
    const response: any = await axios.get(URL, createConfig());

    return response.json();
  },
  post: async (path: string, data: Record<string, unknown>) => {
    const URL: string = getBaseUrl() + path;
    return axios.post(URL, data, createConfig());
  },
  patch: async (path: string, data: Record<string, unknown>) => {
    const URL: string = getBaseUrl() + path;
    return axios.patch(URL, data, createConfig());
  },
  put: async (path: string, data: Record<string, unknown>) => {
    const URL: string = getBaseUrl() + path;
    return axios.put(URL, data, createConfig());
  },
  delete: async (path: string, data: Record<string, unknown>) => {
    const URL: string = getBaseUrl() + path;
    return axios.delete(URL, { ...createConfig(), data });
  },
};

export default Axios;

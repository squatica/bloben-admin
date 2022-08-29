import axios from 'axios';

const headers: any = {
  credentials: 'same-origin',
  'Content-Type': 'application/json',
};

export const config: any = {
  timeout: 5000,
  headers,
};

const createConfig = (token?: string) => {
  return {
    timeout: 5000,
    headers: {
      ...headers,
      token,
    },
  };
};

// @ts-ignore
const getBaseUrl = () => window.env.apiUrl;

const Axios: any = {
  get: async (path: string, token?: string) => {
    const URL: string = getBaseUrl() + path;
    return axios.get(URL, createConfig(token));
  },
  getJSON: async (path: string, token?: string) => {
    const URL: string = getBaseUrl() + path;
    const response: any = await axios.get(URL, createConfig(token));

    return response.json();
  },
  post: async (path: string, data: any, token?: string) => {
    const URL: string = getBaseUrl() + path;
    return axios.post(URL, data, createConfig(token));
  },
  patch: async (path: string, data: any, token?: string) => {
    const URL: string = getBaseUrl() + path;
    return axios.patch(URL, data, createConfig(token));
  },
  put: async (path: string, data: any, token?: string) => {
    const URL: string = getBaseUrl() + path;
    return axios.put(URL, data, createConfig(token));
  },
  delete: async (path: string, data: any, token?: string) => {
    const URL: string = getBaseUrl() + path;
    return axios.delete(URL, { ...createConfig(token), data });
  },
};

export default Axios;

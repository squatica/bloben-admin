export const getHostname = () => {
  if (import.meta.env.VITE_APP_NODE_ENV === 'development') {
    return 'http://localhost:8080';
  } else {
    return `${window.location.protocol}//${window.location.host}`;
  }
};

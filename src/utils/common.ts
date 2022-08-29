export const getHostname = () => {
  if (process.env.REACT_APP_NODE_ENV === 'development') {
    return 'http://localhost:8080';
  } else {
    return `${window.location.protocol}//${window.location.hostname}`;
  }
};

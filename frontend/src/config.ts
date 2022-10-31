export default {
  app: {
    name: process.env.REACT_APP_APP_NAME,
  },
  endpoint: {
    backend: process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:4000',
    auth: process.env.REACT_APP_AUTH_URL ?? 'http://localhost:4077',
  },
};

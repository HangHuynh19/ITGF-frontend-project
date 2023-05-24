import axios from 'axios';

const instance1 = axios.create({
  baseURL: 'https://api.escuelajs.co/graphql',
});

const instance2 = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

instance1.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance2.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance1, instance2 };

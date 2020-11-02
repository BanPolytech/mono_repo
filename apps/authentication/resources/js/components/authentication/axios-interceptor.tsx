import axios from 'axios';

axios.interceptors.response.use(
  (response) => {
    if (response.data.error) {
      if (response.data.error === 999 || response.data.error === 403) {
        document.location.href = '/login?disconnected=true';
      }
    }

    return response;
  },
  (error) => error,
);

import axios, { AxiosError } from 'axios';
import axiosRetry from 'axios-retry';
import config from '../config';

const axiosClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosRetry(axiosClient, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Time in ms (e.g., 1s, 2s, 3s)
  },
  retryCondition: (error: AxiosError) => {
    // Retry on network errors or 5xx status codes
    if (axiosRetry.isNetworkError(error)) {
      return true;
    }
    if (error.response && error.response.status >= 500) {
      return true;
    }
    return false;
  },
});

export default axiosClient;

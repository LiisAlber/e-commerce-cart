import axios, { AxiosInstance } from 'axios';

const FAKESTORE_BASE_URL = import.meta.env.VITE_FAKESTORE_BASE_URL || '';

export const fakestoreAPI: AxiosInstance = axios.create({
  baseURL: FAKESTORE_BASE_URL,
});

// Axios is a library used to make HTTP requests. It offers
// - Promise-based structure for async operations.
// - Automatic JSON data transformation for responses.
// - Enhanced error handling.
// - Ability to create configured HTTP clients with `axios.create`.

import axios, { AxiosInstance } from "axios";

const FAKESTORE_BASE_URL = import.meta.env.VITE_FAKESTORE_BASE_URL || '';


export const fakestoreAPI: AxiosInstance = axios.create({
    baseURL: FAKESTORE_BASE_URL,
});

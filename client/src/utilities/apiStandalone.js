import axios from "axios";
import { config } from "../config";

export const api = {
  get: async (path, token) => {
    const res = await axios.get(`${config.API_BASE_URL}/api${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  post: async (path, data, token) => {
    const res = await axios.post(`${config.API_BASE_URL}/api${path}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  put: async (path, data, token) => {
    const res = await axios.put(`${config.API_BASE_URL}/api${path}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  del: async (path, token) => {
    const res = await axios.delete(`${config.API_BASE_URL}/api${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
import axios from "axios";

const API_URL = "http://localhost:7000/api";

export const getResources = async (taskId) => {
  const response = await axios.get(`${API_URL}/resources?taskId=${taskId}`);
  return response.data;
};

export const getResource = async (id) => {
  const response = await axios.get(`${API_URL}/resources/${id}`);
  return response.data;
};

export const createResource = async (data) => {
  const response = await axios.post(`${API_URL}/resources`, data);
  return response.data;
};
export const updateResource = async (id, data) => {
  const response = await axios.put(`${API_URL}/resources/${id}`, data);
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await axios.delete(`${API_URL}/resources/${id}`);
  return response.data;
};
import axios from 'axios';

const API_URL = 'http://localhost:7000/api';

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return { data: response.data || [] }; 
};

export const getProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};

export const createProject = async (data) => {
  const response = await axios.post(`${API_URL}/projects`, data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await axios.put(`${API_URL}/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/projects/${id}`);
  return response.data;
};
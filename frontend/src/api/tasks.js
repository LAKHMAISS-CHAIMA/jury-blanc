import axios from 'axios';

const API_URL = 'http://localhost:7000/api';

export const getTasks = async (projectId = null) => {
    try {
      const url = projectId ? `${API_URL}/tasks?projectId=${projectId}` : `${API_URL}/tasks`;
      const response = await axios.get(url);
      console.log('API response for getTasks:', response.data);
      return { data: response.data || [] };
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };

  export const getTask = async (id) => {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    console.log('getTask response:', response.data); 
    return response.data; 
  };

export const createTask = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error.response?.data || error.message);
        throw error;
    }
};

export const updateTask = async (id, data) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, data);
    return response.data;
  };
export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error.response?.data || error.message);
        throw error;
    }
};
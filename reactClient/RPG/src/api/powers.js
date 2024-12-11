import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const createPower = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/powers`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in components
  }
};

export const getPowers = async () => {
  try {
    const response = await axios.get(`${baseURL}/powers`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in components
  }
};

export const updatePower = async (id, data) => {
  try {
    const response = await axios.put(`${baseURL}/powers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in components
  }
};

export const deletePower = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/powers/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in components
  }
};

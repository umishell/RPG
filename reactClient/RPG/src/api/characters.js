import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const createCharacter = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/characters`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in components
  }
};

export const getCharacters = async () => {
  try {
    const response = await axios.get(`${baseURL}/characters`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in components
  }
};

export const updateCharacter = async (id, data) => {
  try {
    const response = await axios.put(`${baseURL}/characters/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in components
  }
};

export const deleteCharacter = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in components
  }
};
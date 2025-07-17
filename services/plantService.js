import api from './api';

export const plantService = {
  createPlant: async (plantData) => {
    try {
      const response = await api.post('/api/creation/Plant/', plantData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getPlantById: async (plantId) => {
    try {
      const response = await api.get(`/api/recuperation/Plant/${plantId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllPlants: async () => {
    try {
      const response = await api.get('/api/all/recuperation/Plant');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
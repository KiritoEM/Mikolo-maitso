import api from './api';

export const scannedPlantService = {
  createScannedPlant: async (scannedPlantData) => {
    try {
      const response = await api.post('/api/creation/Scanned_plant/', scannedPlantData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllScannedPlants: async () => {
    try {
      const response = await api.get('/api/all/recuperation/Scanned_plant');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
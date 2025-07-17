import api from './api';

export const diagnosticService = {
  createDiagnostic: async (diagnosticData) => {
    try {
      const response = await api.post('/api/creation/Diagnostic/', diagnosticData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllDiagnostics: async () => {
    try {
      const response = await api.get('/api/all/recuperation/Diagnostic');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
import api from './api';

export const imageAnalysisService = {
  analyzePlantImage: async (imageUri) => {
    try {
      const fileExtension = imageUri.split('.').pop();
      const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';

      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: `photo.${fileExtension}`,
        type: mimeType,
      });

      const response = await api.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erreur analyse image :', error);
      throw error?.response?.data || { message: 'Erreur inconnue' };
    }
  },
};

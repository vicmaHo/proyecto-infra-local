import axios from 'axios';

export const getCoordinates = async (address) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          limit: 1,
        },
      });
  
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      } else {
        throw new Error('No se encontraron coordenadas para esta dirección.');
      }
    } catch (error) {
      console.error('Error obteniendo las coordenadas:', error.message);
      return null;
    }
  };
  
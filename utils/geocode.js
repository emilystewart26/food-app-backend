const axios = require('axios');

async function geocodeWithNominatim(address) {
  const response = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      q: address,
      format: 'json',
      addressdetails: 1,
    },
    headers: {
      'User-Agent': `BootcampFoodAppProject/1.0 (${process.env.NOMINATIM_USER_AGENT_EMAIL})`,
    },
  });

  const location = response.data[0];
  if (!location) {
    throw new Error('Geocoding failed: no results found');
  }

  return {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lon),
  };
}

module.exports = geocodeWithNominatim;

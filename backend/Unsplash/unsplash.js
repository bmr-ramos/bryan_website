const axios = require('axios');

async function getRandomImage() {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    const downloadLocation = response.data.links.download_location;

    // Trigger the download endpoint
    await axios.get(downloadLocation, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch image from Unsplash');
  }
}

module.exports = {
  getRandomImage
};

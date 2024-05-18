const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.get('/random-image', async (req, res) => {
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

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Unsplash image:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch image from Unsplash' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

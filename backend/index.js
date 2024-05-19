const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getRandomImage } = require('./Unsplash API/unsplash');

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: [
    'https://bryan-website-one.vercel.app',
    'https://bryan-website-git-master-theninjaeagles-projects.vercel.app',
    'https://bryan-website-m1o9ixr29-theninjaeagles-projects.vercel.app'
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/random-image', async (req, res) => {
  try {
    const imageData = await getRandomImage();
    console.log('Image data fetched successfully:', imageData); // Add logging
    res.json(imageData);
  } catch (error) {
    console.error('Error fetching Unsplash image:', error); // Add logging
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getRandomImage } = require('./Unsplash/unsplash');

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: [
    'https://bryan-website-red.vercel.app',
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Test route
app.get('/test', (req, res) => {
  res.send('Backend is running!');
});

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

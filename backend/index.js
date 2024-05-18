const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getRandomImage } = require('./Unsplash API/unsplash'); // Import the Unsplash module

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: 'https://bryan-website-one.vercel.app', // Replace this with your actual frontend URL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/random-image', async (req, res) => {
  try {
    const imageData = await getRandomImage();
    res.json(imageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

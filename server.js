const { PORT } = require('./src/helper')
const express = require('express');
const cors = require('cors');
const app = express();
const videosRoutes = require('./routes/videos')

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.static('public'))

// Routes
app.use('/videos', videosRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something happened!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

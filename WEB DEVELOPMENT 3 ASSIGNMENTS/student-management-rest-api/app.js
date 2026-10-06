const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

// Custom logger middleware required by the assignment.
app.use(logger);

// Simple welcome route.
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Student Management REST API is running',
    endpoints: {
      students: '/students'
    }
  });
});

// Modular student routes.
app.use('/students', studentRoutes);

// Handle unknown routes.
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Central error handler.
app.use((err, req, res, next) => {
  console.error(err.stack || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: message
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

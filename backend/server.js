// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const { authRouter } = require('./routes/auth');
const apiRouter = require('./routes/api');

const app = express();

// Middleware
app.use(bodyParser.json());

// Mount routers
app.use('/auth', authRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;

// Sync models with the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});

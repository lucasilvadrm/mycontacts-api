const express = require('express');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
require('express-async-errors');

// routes
const contactRoutes = require('../routes/contactRoutes');
const categoryRoutes = require('../routes/categoryRoutes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors);
    this.app.use(errorHandler);
  }

  routes() {
    this.app.use('/contacts/', contactRoutes);
    this.app.use('/categories/', categoryRoutes);
  }
}

module.exports = new App().app;

const express = require('express');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
require('express-async-errors');

const app = express();

const routes = require('./routes');

const port = 3333;

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`🤞 Server started at http://localhost:${port}`));

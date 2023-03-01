const express = require('express');
require('express-async-errors');

const app = express();

const routes = require('./routes');

const port = 3333;

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => { // error handler
  console.log('----error handler----');
  console.log(error);
  response.sendStatus(500);
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`🤞 Server started at http://localhost:${port}`));

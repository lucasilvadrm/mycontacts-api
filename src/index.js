const express = require('express');

const app = express();

const routes = require('./routes');

const port = 3333;

app.use(express.json());

app.use(routes);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`🤞 Server started at http://localhost:${port}`));

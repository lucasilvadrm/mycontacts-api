const express = require('express');

const app = express();

const port = 3333;

app.get('/', (request, response) => {
  response.send('Teste');
});

app.listen(port, () =>
  console.log(`🤞 Server started at http://localhost:${port}`)
);

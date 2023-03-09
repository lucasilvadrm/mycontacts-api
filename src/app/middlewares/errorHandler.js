module.exports = (error, request, response, next) => { // error handler
  console.log('----error handler----');
  console.log(error);
  response.sendStatus(500);
};

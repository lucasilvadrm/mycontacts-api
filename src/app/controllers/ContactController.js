class ContactController {
  index(request, response) {
    response.send('Contact Controller');
  }

  show() {

  }

  store() {

  }

  update() {

  }

  delete() {

  }
}

// Singleton
module.exports = new ContactController();

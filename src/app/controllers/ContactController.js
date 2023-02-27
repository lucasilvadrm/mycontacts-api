const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
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
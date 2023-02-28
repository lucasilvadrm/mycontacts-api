const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();
    response.status(200).json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    try {
      const contact = await ContactsRepository.findById(id);

      if (!contact) {
        return response.status(404).json({ error: 'Contact not found' });
      }

      return response.status(200).json(contact);
    } catch (err) {
      return response.status(400).json({ error: err });
    }
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      response.status(400).json({ error: 'name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'email já está em uso' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    return response.status(200).json(contact);
  }

  update() {

  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);

    return response.sendStatus(204); // requisição deu certo, mas sem nenhum corpo
  }
}

// Singleton
module.exports = new ContactController();

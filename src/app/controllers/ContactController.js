const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);
    response.status(200).json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.status(200).json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);
      if (contactExists) {
        return response.status(400).json({ error: 'This email is already in use' });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    return response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'email já está em uso' });
      }
    }

    const userUpdated = await ContactsRepository.update(id, {
      name,
      email: email || null, // no caso do email não estiver preenchido
      phone,
      category_id: category_id || null,
    });

    return response.status(200).json(userUpdated);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    await ContactsRepository.delete(id);

    return response.sendStatus(204); // requisição deu certo, mas sem nenhum corpo
  }
}

// Singleton
module.exports = new ContactController();

const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    try {
      const { orderBy } = request.query;

      const contacts = await ContactsRepository.findAll(orderBy);
      response.status(200).json(contacts);
    } catch (error) {
      response.status(200).json({ error });
    }
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
    try {
      const {
        name, email, phone, category_id,
      } = request.body;

      if (!name) {
        return response.status(400).json({ error: 'name is required' });
      }

      const contactExists = await ContactsRepository.findByEmail(email);

      if (contactExists) {
        return response.status(400).json({ error: 'email já está em uso' });
      }

      const contact = await ContactsRepository.create({
        name, email, phone, category_id,
      });

      return response.status(200).json(contact);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'email já está em uso' });
    }

    const userUpdated = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    return response.status(200).json(userUpdated);
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await ContactsRepository.delete(id);

      return response.sendStatus(204); // requisição deu certo, mas sem nenhum corpo
    } catch (error) {
      return response.status(404).json({ error });
    }
  }
}

// Singleton
module.exports = new ContactController();

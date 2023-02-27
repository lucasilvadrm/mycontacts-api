const { v4 } = require('uuid');

const contacts = [
  {
    id: v4(),
    name: 'Lucas',
    email: 'lucas@gmail.com',
    phone: '9988339923',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => { resolve(contacts); });
  }
}

module.exports = new ContactsRepository();

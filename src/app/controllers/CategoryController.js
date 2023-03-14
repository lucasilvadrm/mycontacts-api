const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../utils/isValidUUID');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    response.status(200).json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    const category = await CategoriesRepository.findById(id);
    response.status(200).json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    const updatedCategory = await CategoriesRepository.update(id, { name });
    response.status(200).json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();

const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    try {
      const categories = await CategoriesRepository.findAll();
      response.status(200).json(categories);
    } catch (error) {
      response.status(400).json({ error });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const category = await CategoriesRepository.findById(id);
      response.status(200).json(category);
    } catch (error) {
      response.status(400).json({ error });
    }
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
    try {
      const categoryExists = await CategoriesRepository.findById(id);
      if (!categoryExists) {
        return response.status(404).json({ error: 'Category not found' });
      }

      if (!name) {
        return response.status(400).json({ error: 'Name is required' });
      }

      const updatedCategory = await CategoriesRepository.update(id, { name });
      response.status(200).json(updatedCategory);
    } catch (error) {
      response.status(400).json({ error });
    }
  }

  async delete(request, response) {
    const { id } = request.params;
    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();

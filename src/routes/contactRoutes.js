const { Router } = require('express');
const ContactController = require('../app/controllers/ContactController');

const router = new Router();

router.get('/', ContactController.index);
router.get('/:id', ContactController.show);
router.delete('/:id', ContactController.delete);
router.post('/', ContactController.store);
router.put('/:id', ContactController.update);

module.exports = router;

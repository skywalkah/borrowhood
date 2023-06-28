const router = require('express').Router();
const { ItemController } = require('../../controllers');
const isAuthenticated = require('../../middleware/isAuthenticated');

router.get('/', isAuthenticated, ItemController.getAllItems);
router.get('/reviews/', isAuthenticated, ItemController.getItemsAndReviews);
router.get('/reviews/:id', isAuthenticated, ItemController.getItemAndReviews);
router.post('/', isAuthenticated, ItemController.createItem);
router.get('/:id', isAuthenticated, ItemController.getItem);
router.put('/:id', isAuthenticated, ItemController.updateItem);
router.delete('/:id', isAuthenticated, ItemController.deleteItem);

module.exports = router;

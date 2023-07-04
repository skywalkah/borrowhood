const router = require('express').Router();
const { ItemController } = require('../../controllers');
const isAuthenticated = require('../../middleware/isAuthenticated');

router.get('/', isAuthenticated, ItemController.getAllItems);
router.get('/me', isAuthenticated, ItemController.getMyItems);
router.get(
  '/me/requests',
  isAuthenticated,
  ItemController.getMyItemsWithRequests
);
router.get('/reviews/', isAuthenticated, ItemController.getItemsAndReviews);
router.get('/reviews/:id', isAuthenticated, ItemController.getItemAndReviews);
router.get('/:id', isAuthenticated, ItemController.getItem);
router.post('/', isAuthenticated, ItemController.createItem);
router.put('/:id/update', isAuthenticated, ItemController.updateItem);
router.delete('/:id', isAuthenticated, ItemController.deleteItem);

module.exports = router;

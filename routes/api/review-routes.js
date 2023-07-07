const router = require('express').Router();
const { ReviewController } = require('../../controllers');
const isAuthenticated = require('../../middleware/isAuthenticated');

router.get('/partial/:itemId', isAuthenticated, ReviewController.getPartial);
router.get('/:id', isAuthenticated, ReviewController.getReview);
router.get('/', isAuthenticated, ReviewController.getAllReviews);
router.post('/', isAuthenticated, ReviewController.createReview);
router.put('/:id', isAuthenticated, ReviewController.updateReview);
router.delete('/:id', isAuthenticated, ReviewController.deleteReview);

module.exports = router;

const router = require('express').Router();

const userRoutes = require('./user-routes');
const itemRoutes = require('./item-routes');
const reviewRoutes = require('./review-routes');
const borrowRoutes = require('./borrow-routes');

router.use('/items', itemRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/borrows', borrowRoutes);

// Catch-all route
router.get('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = router;

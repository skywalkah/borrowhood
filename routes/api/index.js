const router = require('express').Router();

const userRoutes = require('./user-routes');
const itemRoutes = require('./item-routes');
const reviewRoutes = require('./review-routes');

router.use('/', userRoutes);
router.use('/items', itemRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;

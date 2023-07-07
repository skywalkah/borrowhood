const router = require('express').Router();
const { BorrowController } = require('../../controllers');
const isAuthenticated = require('../../middleware/isAuthenticated');

// Get my borrowed items
router.get('/mine', isAuthenticated, BorrowController.getMyBorrowedItems);

// Get borrowed items by user
router.get('/:userId', isAuthenticated, BorrowController.getBorrowedItems);

module.exports = router;

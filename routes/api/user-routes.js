const router = require('express').Router();
const { UserController } = require('../../controllers');
const isAuthenticated = require('../../middleware/isAuthenticated');
const { User } = require('../../models');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);
router.get('/', isAuthenticated, UserController.getAllUsers);
router.get('/:id', isAuthenticated, UserController.getUser);
router.get('/items', isAuthenticated, UserController.getAllUsersWithItems);
router.post('/requests/create', isAuthenticated, UserController.createRequest);
router.get('/requests/pending', isAuthenticated, UserController.pendingRequests)
router.get(
  '/:userId/requests',
  isAuthenticated,
  UserController.getAllBorrowRequests
);
router.post(
  '/items/:itemId/return',
  isAuthenticated,
  UserController.returnItem
);
router.put(
  '/items/:itemId/return/approve',
  isAuthenticated,
  UserController.approveReturnRequest
);
router.put(
  '/:id/requests/:requestId/approve',
  isAuthenticated,
  UserController.approveBorrowRequest
);
router.put(
  '/:id/requests/:requestId/reject',
  isAuthenticated,
  UserController.rejectBorrowRequest
);

module.exports = router;

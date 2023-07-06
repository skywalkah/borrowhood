const router = require('express').Router();
const { UserController } = require('../../controllers');
const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);
router.put('/update', isAuthenticated, UserController.updateUser);
router.put('/reset', isAuthenticated, UserController.resetPassword);
router.get('/', isAuthenticated, UserController.getAllUsers);
router.get('/items', isAuthenticated, UserController.getAllUsersWithItems);
router.get('/:id', isAuthenticated, UserController.getUser);
router.post('/requests/create', isAuthenticated, UserController.createRequest);
router.get(
  '/requests/pending',
  isAuthenticated,
  UserController.pendingRequests 
  // this is being used by both borrow and return? 
);
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
router.delete(
  '/:id/requests/:requestId',
  isAuthenticated,
  UserController.cancelRequest
);

module.exports = router;

const router = require('express').Router();
const { UserController } = require('../../controllers');
const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);
router.get('/items', isAuthenticated, UserController.getAllUsersWithItems);
router.get('/', isAuthenticated, UserController.getAllUsers);
router.get('/:id', isAuthenticated, UserController.getUser);
router.post(
  '/:userId/requests/create',
  isAuthenticated,
  UserController.createRequest
);
router.get(
  '/:userId/requests',
  isAuthenticated,
  UserController.getAllBorrowRequests
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

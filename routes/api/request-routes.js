const express = require('express');
const router = express.Router();
const { RequestController } = require('../../controllers')
const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/items/:itemId/request', RequestController.requestBorrow)
router.get('/items/:itemId/requests', RequestController.allRequests)
router.post('/items/:itemId/requests/:requestId/approve', RequestController.approve)
router.post('/items/:itemId/requests/:requestId/reject',  RequestController.reject)

module.exports = router; 

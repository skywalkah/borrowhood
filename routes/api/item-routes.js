const express = require('express');
const router = express.Router()
const { ItemController } = require('../../controllers')

router.post('/items/create', ItemController.create)
router.get('/items', ItemController.all)
router.get('/items/:itemId', ItemController.specificItem)
router.put('/items/:itemId/edit', ItemController.update)
router.delete('/items/:itemId/delete', ItemController.delete)

module.exports = router; 


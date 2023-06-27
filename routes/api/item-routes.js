const express = require('express');
const router = express.Router()
const { Item } = require('../../models')

//POST route to create a new item listing 
router.post('/items/create', async (req, res) => {
    try {
        const { id, item_name, item_description, item_condition } = req.body;
        const newItem = await Item.create({
            id,
            item_name,
            item_description,
            item_condition,
        })
        res.json(newItem)
    } catch(error) {
        res.status(500).json({ error: 'Failed to create item '})
    }
})


module.exports = router; 


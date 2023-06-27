const express = require('express');
const router = express.Router()
const { Item } = require('../../models')

//Create new item
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

//Get all available items
router.get('/items', async (req, res) => {
    try{
        const items = await Item.findAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get items'})
    }
})

//Get a specific item
router.get('/items/:itemId', async (req, res) => {
    try{
        const itemId = req.params.itemId;
        const item = await Item.findByPk(itemId);

        if(!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get item'});
    }
})

//Update an item 
router.put('/items/:itemId/edit', async (req, res) => {
    try{
        const itemId = req.params.itemId;
        const { item_name, item_description, item_condition } = req.body;
        const updatedItem = await Item.update(
            { item_name, item_description, item_condition },
            { where: { id: itemId } }
        );
        if (updatedItem[0] === 0){
            return res.status(404).json({ message: 'Item not found' })
        }
        res.json({ message: 'Item updated!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update item' })
    }
})

//Delete an item 
router.delete('/items/:itemId/delete', async (req,res) => {
    try {
        const itemId = req.params.itemId;
        
        const deletedItem = await Item.destroy({ where: { id: itemId }})
        if (deletedItem === 0){
            return res.status(404).json({ message: 'Item deleted!' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete item' })
    }
})

module.exports = router; 


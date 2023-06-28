const { Item, Review } = require('../models');

const ItemController = {
  // Get all items
  getAllItems: async (req, res) => {
    try {
      const itemList = await Item.findAll();

      if (!itemList) {
        res.status(404).json({ message: 'No items found!' });
        return;
      }

      return res.json(itemList);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Get a specific item by ID
  getItem: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);

      if (!item) {
        res.status(404).json({ message: 'Item not found' });
        return;
      }

      return res.json(item);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Get all items with associated reviews
  getItemsAndReviews: async (req, res) => {
    try {
      const itemList = await Item.findAll({
        include: [
          {
            model: Review,
            as: 'reviews',
          },
        ],
      });

      if (!itemList) {
        res.status(404).json({ message: 'No items with reviews found!' });
        return;
      }

      res.status(200).json(itemList);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a specific items with its reviews
  getItemAndReviews: async (req, res) => {
    try {
      const itemList = await Item.findByPk(req.params.id, {
        include: [
          {
            model: Review,
            as: 'reviews',
          },
        ],
      });

      res.status(200).json(itemList);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new item
  createItem: async (req, res) => {
    try {
      const newItem = await Item.create(req.body);
      return res.json(newItem);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Update a specific item by ID
  updateItem: async (req, res) => {
    try {
      await Item.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      const updatedItem = await Item.findByPk(req.params.id);
      if (!updatedItem)
        return res.status(404).json({ message: 'Item not found' });
      return res.json(updatedItem);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Delete a specific item by ID
  deleteItem: async (req, res) => {
    try {
      const result = await Item.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!result) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = ItemController;

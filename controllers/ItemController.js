const { Item, Review, User, Request } = require('../models');

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

  // Get my items (the logged in user)
  getMyItems: async (req, res) => {
    try {
      const currentUser = req.session.currentUser;

      const user = await User.findByPk(currentUser.id, {
        attributes: { exclude: ['password'] },
        include: {
          model: Item,
          as: 'ownedItems',
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(user.ownedItems);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Get all items owned by the current user
  getMyItemsWithRequests: async (req, res) => {
    try {
      const currentUser = req.session.currentUser;

      const user = await User.findByPk(currentUser.id, {
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Item,
            as: 'ownedItems',
            include: [
              {
                model: Request,
                include: [
                  {
                    model: User,
                    attributes: ['firstName'],
                  },
                ],
              },
            ],
          },
        ],
      });

      console.log('User from db', user);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(user.ownedItems);
    } catch (err) {
      console.error(err);
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
      const { item_name, item_description, item_condition } = req.body;

      // Get the logged-in user from the session or authentication middleware
      const currentUser = req.session.currentUser;

      // Create the item associated with the logged-in user
      await Item.create({
        item_name,
        item_description,
        item_condition,
        user_id: currentUser.id, // Set the user_id to the ID of the logged-in user
      });

      return res
        .status(201)
        .json({ message: `Nice! ${item_name} added successfully` });
    } catch (err) {
      console.error(err);
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

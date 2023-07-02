const { Item, User } = require('../models');

const BorrowController = {
  getMyBorrowedItems: async (req, res) => {
    try {
      const currentUser = req.session.currentUser;

      const user = await User.findByPk(currentUser.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const borrowedItems = await Item.findAll({
        where: { borrowed_by: currentUser.id },
      });

      if (!borrowedItems || borrowedItems.length === 0) {
        return res.json({ message: 'No borrowed items' });
      } else {
        return res.json(borrowedItems);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  getBorrowedItems: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const borrowedItems = await Item.findAll({
        where: { borrowed_by: userId },
      });

      if (borrowedItems.length === 0) {
        return res.status(404).json({ message: 'No borrowed items' });
      } else {
        return res.json(borrowedItems);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
};

module.exports = BorrowController;

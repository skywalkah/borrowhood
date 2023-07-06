const db = require('../models');

module.exports = {
  getFeed: async (req, res) => {
    try {
      const items = await db.Item.findAll({
        include: [
          {
            model: db.User,
            as: 'owner',
            attributes: ['firstName'],
          },
          {
            model: db.Review,
            as: 'reviews',
          },
          {
            model: db.User,
            as: 'borrowedBy',
            attributes: ['firstName'],
          },
          {
            model: db.Request,
            as: 'requests',
          },
        ],
      });

      // Calculate the average rating for each item
      items.forEach(item => {
        const reviews = item.reviews;
        if (reviews.length > 0) {
          const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
          const averageRating = sum / reviews.length;
          item.averageRating = averageRating;
        } else {
          item.averageRating = null;
        }
      });

      const { requests } = items;

      res.render('feed', {
        items,
        isAuthenticated: req.session.isAuthenticated,
        userId: req.session.currentUser.id,
        currentUser: req.session.currentUser,
        requests: requests,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getDashboard: async (req, res) => {
    try {
      // Fetch all items owned by and borrowed by the user
      const user = await db.User.findOne({
        where: { id: req.session.currentUser.id },
        include: [
          {
            model: db.Item,
            as: 'ownedItems',
            include: [
              {
                model: db.Request,
                as: 'requests',
                include: {
                  model: db.User,
                  as: 'user',
                  attributes: ['firstName'],
                },
              },
            ],
          },
          {
            model: db.Item,
            as: 'borrowedItems',
            include: [
              {
                model: db.User,
                as: 'owner',
                attributes: ['firstName'],
              },
            ],
          },
        ],
      });

      // Get user's owned and borrowed items
      const { ownedItems, borrowedItems, requests } = user;

      res.render('dashboard', {
        welcomeMessage: `Hi ${req.session.currentUser.firstName}! Here's your Dashboard.`,
        ownedItems: ownedItems,
        borrowedItems: borrowedItems,
        requests: requests,
        isAuthenticated: req.session.isAuthenticated,
        currentUser: req.session.currentUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getProfile: async (req, res) => {
    try {
      const userId = req.session.currentUser.id;

      // Fetch the user's profile information
      const user = await db.User.findByPk(userId);

      res.render('profile', {
        user,
        isAuthenticated: req.session.isAuthenticated,
        currentUser: req.session.currentUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

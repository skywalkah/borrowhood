const db = require('../models');

module.exports = {
  getFeed: async (req, res) => {
    try {
      const items = await db.Item.findAll({
        include: [
          {
            model: db.User,
            attributes: ['firstName'],
          },
          {
            model: db.Review,
            as: 'reviews',
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

      res.render('feed', {
        items,
        isAuthenticated: req.session.isAuthenticated,
        userId: req.session.currentUser.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getDashboard: async (req, res) => {
    try {
      const items = await db.User.findAll({
        where: { id: req.session.currentUser.id },
        include: db.Item,
      });

      res.render('dashboard', {
        welcomeMessage: `Welcome ${req.session.currentUser.firstName}! Here are your items`,
        items,
        isAuthenticated: req.session.isAuthenticated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

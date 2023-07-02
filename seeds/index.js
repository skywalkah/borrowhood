const sequelize = require('../db/config');
const { User, Item, Review, Request } = require('../models');

const userSeeds = require('./users.json');
const itemSeeds = require('./items.json');
const reviewSeeds = require('./reviews.json');
const requestSeeds = require('./requests.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  const createdItems = await Item.bulkCreate(itemSeeds, {
    individualHooks: true,
    returning: true,
  });

  const createdReviews = await Review.bulkCreate(reviewSeeds, {
    individualHooks: true,
  });

  await Request.bulkCreate(requestSeeds, {
    individualHooks: true,
  });

  // Associate reviews with items based on their order
  for (let i = 0; i < createdReviews.length; i++) {
    const review = createdReviews[i];
    const itemIndex = i % createdItems.length; // Calculate the corresponding item index
    const item = createdItems[itemIndex];

    await review.setItem(item);
  }

  process.exit(0);
};

seedDatabase();

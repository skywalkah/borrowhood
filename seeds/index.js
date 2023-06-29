const sequelize = require('../db/config');
const { User } = require('../models');
const { Item } = require('../models');
const { Review } = require('../models');
const { Request } = require('../models');

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

  await Item.bulkCreate(itemSeeds, {
    individualHooks: true,
    returning: true,
  });

  await Review.bulkCreate(reviewSeeds, {
    individualHooks: true,
    returning: true,
  });

  await Request.bulkCreate(requestSeeds, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

const User = require('./User');
const Review = require('./Review');
const Item = require('./Item');

User.hasMany(Item, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Item.belongsTo(User, { foreignKey: 'user_id' });

Item.hasMany(Review, { foreignKey: 'item_id', onDelete: 'CASCADE' });
Review.belongsTo(Item, { foreignKey: 'item_id' });

module.exports = {
  User,
  Review,
  Item,
};

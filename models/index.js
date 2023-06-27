const User = require('./User');
const Item = require('./Item');
const Review = require('./Review');

User.hasMany(Item, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Item.belongsTo(User, { foreignKey: 'user_id' });

Item.hasMany(Review, { foreignKey: 'item_id', onDelete: 'CASCADE' });
Review.belongsTo(Item, { foreignKey: 'item_id' });

module.exports = {
  User,
  Item,
  Review,
};

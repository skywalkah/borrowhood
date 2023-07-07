const User = require('./User');
const Review = require('./Review');
const Item = require('./Item');
const Request = require('./Request');
const ReturnItem = require('./Return');

User.hasMany(Item, {
  foreignKey: 'user_id',
  as: 'ownedItems',
  onDelete: 'CASCADE',
});
Item.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

User.hasMany(Item, {
  foreignKey: 'borrowed_by',
  as: 'borrowedItems',
  onDelete: 'SET NULL',
});
Item.belongsTo(User, { foreignKey: 'borrowed_by', as: 'borrowedBy' });

Item.hasMany(Review, { foreignKey: 'item_id', onDelete: 'CASCADE' });
Review.belongsTo(Item, { foreignKey: 'item_id' });

User.hasMany(Request, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Request.belongsTo(User, { foreignKey: 'user_id' });

Item.hasMany(Request, { foreignKey: 'item_id', onDelete: 'CASCADE' });
Request.belongsTo(Item, { foreignKey: 'item_id' });

Item.hasOne(ReturnItem, {
  foreignKey: 'item_id',
  onDelete: 'CASCADE',
  as: 'return',
});
ReturnItem.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

User.hasMany(ReturnItem, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'returns',
});
ReturnItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = { User, Review, Item, Request, ReturnItem };

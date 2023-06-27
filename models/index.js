const User = require('./User');
const Comment = require('./Comment');
const Item = require('./Item');

User.hasMany(Item, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Item.belongsTo(User, { foreignKey: 'user_id' });

Item.hasMany(Comment, { foreignKey: 'item_id', onDelete: 'CASCADE' });
Comment.belongsTo(Item, { foreignKey: 'item_id' });

module.exports = {
  User,
  Comment,
  Item
};

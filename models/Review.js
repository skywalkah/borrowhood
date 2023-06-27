const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    item_id: {
      type: DataTypes.UUID,
      references: {
        model: 'item',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Review',
  }
);

module.exports = Review;

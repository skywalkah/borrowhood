const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Item extends Model {
  static associate(models) {
    Item.hasMany(models.Review, {
      foreignKey: 'item_id',
      onDelete: 'CASCADE',
    });
    Item.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  }
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
  }
);

module.exports = Item;
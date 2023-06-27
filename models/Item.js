const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Item extends Model {
  static associate(models) {
    Item.hasMany(models.Comment, {
      foreignKey: 'item_id',
      onDelete: 'CASCADE',
    });
  }
}

Item.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'Item',
  }
);

module.exports = Item;

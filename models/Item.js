const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Item extends Model {
  static associate(models) {
    Item.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'owner',
    });
    Item.belongsTo(models.User, {
      foreignKey: 'borrowed_by',
      onDelete: 'SET NULL',
      as: 'borrowedBy',
    });
    Item.hasMany(models.Review, {
      foreignKey: 'item_id',
      onDelete: 'CASCADE',
    });
    Item.hasMany(models.Request, {
      foreignKey: 'item_id',
      onDelete: 'CASCADE',
      as: 'requests',
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
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    item_condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    borrowed_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
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

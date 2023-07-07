const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class ReturnItem extends Model {
  static associate(models) {
    ReturnItem.belongsTo(models.Item, {
      foreignKey: 'item_id',
      onDelete: 'CASCADE',
      as: 'item',
    });
    ReturnItem.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user',
    });
  }
}

ReturnItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'item',
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
    return_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'return_item',
  }
);

module.exports = ReturnItem;

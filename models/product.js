"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Store), Product.belongsTo(models.Category);
      // Product.hasMany(models.Transaction)
    }

    get newCondition() {
      return this.condition === true ? "Baru" : "Bekas";
    }

    static getProduct(search) {
      const option = {
        where: {},
        include: {
          all: true,
        },
      };

      if (search) {
        option.where = {
          [Op.and]: [
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              stock: {
                [Op.gt]: 0,
              },
            },
          ],
        };
      } else {
        option.where.stock = {
          [Op.gt]: 0,
        };
      }

      return Product.findAll(option);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      imageURL: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      condition: DataTypes.BOOLEAN,
      isLike: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      StoreId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

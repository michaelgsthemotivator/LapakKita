"use strict";

const fs = require("fs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    const datas = JSON.parse(
      fs.readFileSync("./data/product.json", "utf-8")
    ).map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    return queryInterface.bulkInsert("Products", datas);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products");
  },
};

const { Model, DataTypes } = require('sequelize');

class Volunteer extends Model {
  static init(sequelize) {
    super.init({
      cvv_number: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = Volunteer;
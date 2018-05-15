const utils = require('../utils/models')

module.exports = (sequelize, DataTypes) => {
  const fields = [
    'idPeople', 'Name'
  ]

  const model = utils.modelDefinition(DataTypes, fields)

  return sequelize.define('People', model, {
    undescored: true,
    freezeTableName: true,
    timestamps: false,
    tableName: 'People',
    comment: 'Peoples'
  })
}

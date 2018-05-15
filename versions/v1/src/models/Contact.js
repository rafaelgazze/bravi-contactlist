const utils = require('../utils/models')

module.exports = (sequelize, DataTypes) => {
  const fields = [
    'idContact', 'type', 'value', 'idPeople'
  ]

  const model = utils.modelDefinition(DataTypes, fields)

  return sequelize.define('Contact', model, {
    undescored: true,
    freezeTableName: true,
    timestamps: false,
    tableName: 'Contact',
    comment: 'Contacts for peoples'
  })
}

const { isString } = require('lodash')

const fieldDefinition = (types, { type = 'STRING', allowNull = false } = {}) => ({
  type: isString(type) ? types[type] : type,
  allowNull: allowNull,
  validate: {
    notEmpty: !allowNull
  }
})

const buildField = (types, field) =>
  isString(field)
    ? { [field]: fieldDefinition(types) }
    : { [field.name]: {...field, ...fieldDefinition(types, field)} }

const modelDefinition = (types, fields, id = {
  type: types.BIGINT,
  primaryKey: true,
  autoIncrement: true
}) => fields.reduce((model, field) => ({ ...model, ...buildField(types, field) }), { id: { ...id, primaryKey: true } })

module.exports = {
  fieldDefinition,
  modelDefinition
}

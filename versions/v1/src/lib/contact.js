const { Contact } = require('../models')

const insertContact = contact => {
  Contact.create(contact)
}

const getContact = idContact => {
  Contact.findOne({ where: idContact })
}
const updateContact = contact => {
  Contact.update({ type: contact.type, value: contact.value }, { where: contact.idContact })
}

const listContact = idPeople => {
  Contact.list({ where: idPeople })
}

const removeContact = idContact => {
  Contact.remove({ where: idContact })
}

module.exports = {
  insertContact,
  getContact,
  updateContact,
  listContact,
  removeContact
}

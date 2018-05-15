require('rootpath')()
const lib = require('../lib')

const list = async ctx => {
  const peoples = lib.People.list()

  peoples.forEach(people => {
    people.Contacts = lib.Contact.listContact(people.idPeople)
  })
  ctx.body = peoples
}

const remove = async ctx => {
  const { idPeople, contacts } = ctx.request.body

  contacts.forEach(contact => {
    lib.Contact.removeContact(contact.idContact)
  })
  lib.People.removePeople(idPeople)
}

const get = async ctx => {
  const { idPeople } = ctx.request.body
  const people = lib.People.findPeople(idPeople)
  people.Contacts = lib.Contact.listContact(people.idPeople)
  ctx.body = people
}

const insert = async ctx => {
  const { people, contacts } = ctx.request.body
  const peopleCreated = lib.People.insert(people)
  contacts.forEach(contact => {
    contact.idPeople = peopleCreated.idPeople
    lib.Contact.insertContact(contact)
  })
}

const update = async ctx => {
  const { people, contacts } = ctx.request.body
  lib.People.update(people)
  contacts.forEach(contact => {
    lib.Contact.updateContact(contact)
  })
}

module.exports = {
  list,
  insert,
  update,
  get,
  remove
}

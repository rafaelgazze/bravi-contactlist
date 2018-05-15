const { People } = require('../models')

const insertPeople = people => {
  People.create(people).then(result => { return result })
}

const updatePeople = people => {
  People.update(
    { Name: people.Name },
    { where: people.idPeople }
  )
}

const list = () => {
  People.findAll()
}

const findPeople = idPeople => {
  People.findOne({ where: idPeople })
}

const removePeople = idPeople => {
  People.remove({where: idPeople})
}
module.exports = {
  insertPeople,
  findPeople,
  list,
  updatePeople,
  removePeople
}

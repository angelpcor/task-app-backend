import Db from '../db.js'

let User = {}

User.getById = async function(id) {
  return db.query('SELECT * FROM users WHERE id = $1', [id])
}

module.exports
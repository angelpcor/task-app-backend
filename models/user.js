const Db = require('../db.js');

let User = {}

User.getAll = async function() {
  let result = await Db.executeSync('SELECT * FROM users')
  result = result[0]
  return result
}

User.getByName = async function(name) {
  let result = await Db.executeSync('SELECT * FROM users WHERE username = ?', [name])
  result = result[0][0]
  return result
}

User.getById = async function(id) {
  let result = await Db.executeSync('SELECT * FROM users WHERE id = ?', [id])
  result = result[0][0]
  return result
}

User.login = async function(name, password) {
  let result = await Db.executeSync('SELECT * FROM users WHERE username = ? AND password = ?', [name, password])
  result = result[0][0]
  return result
}

User.create = async function(name, password, picture) {
  let existUser = await User.getByName(name)

  if (existUser == undefined) {
    let result = await Db.executeSync('INSERT INTO users (username, password, picture) VALUES (?, ?, ?)', [name, password, picture])
    result = result[0]
    if (result.affectedRows > 0) return true
  } else {
    return false
  }
}

User.updatePicture = async function(id, picture) {
  let result = await Db.executeSync('UPDATE users SET picture = ? WHERE id = ?', [picture, id])
  result = result[0]
  if (result.affectedRows > 0) return true
}

module.exports = User
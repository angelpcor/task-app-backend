let Task = {}

const Db = require('../db.js');

Task.getAll = async function() {
    let result = await Db.executeSync('SELECT * FROM tasks')
    result = result[0]
    return result
}

Task.getByUserId = async function(userId) {
    let result = await Db.executeSync('SELECT id, title, description, completed, created_at FROM tasks WHERE user_id = ?', [userId])
    result = result[0]
    return result
}

Task.create = async function(title, description, userId) {
    let result = await Db.executeSync('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)', [title, description, userId])
    result = result[0]
    if (result.affectedRows > 0) return true
}

Task.remove = async function(id) {
    let result = await Db.executeSync('DELETE FROM tasks WHERE id = ?', [id])
    result = result[0]
    if (result.affectedRows > 0) return true
}

Task.setCompleted = async function(id, completed) {
    let result = await Db.executeSync('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id])
    result = result[0]
    if (result.affectedRows > 0) return true
}

Task.getOwner = async function(id) {
    let result = await Db.executeSync('SELECT user_id FROM tasks WHERE id = ?', [id])
    result = result[0][0]
    return result ? result.user_id : undefined
}

Task.edit = async function(id, title, description) {
    let result = await Db.executeSync('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id])
    result = result[0]
    if (result.affectedRows > 0) return true
}

module.exports = Task
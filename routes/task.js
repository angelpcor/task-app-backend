const e = require('express');
const { application } = require('express');
const express = require('express');
const router = express.Router();

const Db = require('../db.js');
const Task = require('../models/task.js');
const User = require('../models/user.js');

router.post('/getTasks', async (req, res) => {
    let body = req.body;
    let user = body.user;

    if (user == null) {
        res.status(400).json({
            message: 'User is required'
        });
        return;
    }
        
    let password = user.password;
    let name = user.username;

    let userObject = await User.login(name, password);

    if (userObject) {
        let tasks = await Task.getByUserId(userObject.id)
        if (tasks) res.status(200).send(tasks)
        else res.status(404).send('No tasks found')
    } else {
        res.status(404).send('No user found')
    }
})

router.post('/setCompleted', async (req, res) => {
    let body = req.body;
    let user = body.user;
    let password = user.password;
    let name = user.username;
    let taskId = body.task
    let completed = body.completed
    
    let userObject = await User.login(name, password);
    
    if (userObject) {
        let taskOwner = await Task.getOwner(taskId)

        if (!taskOwner) {
            res.status(404).send({message: 'No task found'})
            return
        }

        if (taskOwner == userObject.id) {
            let result = await Task.setCompleted(taskId, completed)
            if (result) res.status(200).send({message: 'Task updated'})
            else res.status(404).send({message: 'Task not found'})
        } else {
            res.status(404).send({message: 'Not owner'})
        }
    } else {
        res.status(404).send({message: 'No user found'})
    }
})

router.post("/editTask", async (req, res) => {
    let body = req.body;
    let user = body.user;

    if (user == null) {
        res.status(400).json({
            message: 'User is required'
        });
        return;
    }
        
    let password = user.password;
    let name = user.username;
    let taskId = body.task
    let title = body.title
    let description = body.description
    
    let userObject = await User.login(name, password);

    if (userObject) {
        let taskOwner = await Task.getOwner(taskId)

        if (!taskOwner) {
            res.status(404).send({message: 'No task found'})
            return
        }

        if (taskOwner == userObject.id) {
            let result = await Task.edit(taskId, title, description)
            if (result) res.status(200).send({message: 'Task updated'})
            else res.status(404).send({message: 'Task not found'})
        } else {
            res.status(404).send({message: 'Not owner'})
        }
    } else {
        res.status(404).send({message: 'No user found'})
    }
})

router.post('/removeTask', async(req, res) => {
    let body = req.body;
    let user = body.user;
    let password = user.password;
    let name = user.username;
    let taskId = body.task
    
    let userObject = await User.login(name, password);
    
    if (userObject) {
        let taskOwner = await Task.getOwner(taskId)
        
        if (!taskOwner) {
            res.status(404).send({message: 'No task found'})
            return
        }

        if (taskOwner == userObject.id) {
            let result = await Task.remove(taskId)
            if (result) res.status(200).send({message: 'Task removed'})
            else res.status(404).send({message: 'Task not found'})
        } else {
            res.status(404).send({message: 'Not owner'})
        }
    } else {
        res.status(404).send({message: 'No user found'})
    }
})

router.post('/createTask', async (req, res) => {
    let body = req.body;
    let user = body.user;
    let title = body.title;
    let description = body.description;


    if (!user) {
        res.status(300).send({ message: 'User is missing' })
        return
    }

    let userObject = await User.getByName(user.username)

    if (!userObject) {
        res.status(300).send({message: 'User does not exist' })
        return
    }

    let pass = userObject.password

    if (pass != user.password) {
        res.status(300).send({message: 'Wrong password' })
        return
    }

    if (!title || !description) {
        res.status(300).send({message: 'Title or description is missing' })
        return
    }

    let completed = false

    let result = await Task.create(title, description, userObject.id)
    if (result) {
        res.status(200).send({message: 'Task created' })
    } else {
        res.status(300).send({message: 'ERROR: Task not created' })
    }
});

module.exports = router;
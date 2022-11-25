const express = require('express');
const router = express.Router();

const User = require('../models/user.js')
const Db = require('../db.js')

router.get('/clearUsers', async(req, res) => {  
    let result = await Db.executeSync('DELETE FROM users')
    result = result[0]
    res.status(200).send(result)
})

router.post('/getUser', async (req, res) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;

    let user = await User.login(username, password)
    if (user) res.status(200).send(user)
    else res.status(404).send({message: 'No users found'})
});

router.post('/createUser', async (req, res) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;
    let picture = body.picture;

    if (!username || !password || !picture) {
        res.send(300, { message: 'Username or password or picture is missing' }) 
        return
    }

    let result = await User.create(username, password, picture);
    if (result) { 
        res.status(200).send({message: 'User created' })
    } else {
        res.status(300).send({message: 'User already exists' })
    }
})

router.post('/updatePicture', async(req, res) => {
    let body = req.body;
    let user = body.user;
    let password = user.password;
    let name = user.username;
    let picture = body.picture

    if (!picture) {
        res.send(300, { message: 'Picture is missing' })
        return
    }
    
    let userObject = await User.login(name, password);
    
    if (userObject) {
        let result = await User.updatePicture(userObject.id, picture)
        if (result) res.status(200).send({message: 'Picture updated'})
        else res.status(404).send({message: 'User not found'})
    } else {
        res.status(404).send({message: 'No user found'})
    }
})

module.exports = router;
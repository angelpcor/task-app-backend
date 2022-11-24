let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const router = express.Router();

const Db = require('./db.js');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

router.post('/createUser', (req, res) => {
    let body = req.body;
    console.log(body);
    res.send(200);
})

app.use('/', router)

// Use Api routes in the App

// Launch app to listen to specified port
app.listen(3000, function () {
    console.log("Running RestHub on port 3000");
})

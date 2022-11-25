let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const router = express.Router();

const userRoutes = require('./routes/user.js');
const taskRoutes = require('./routes/task.js');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));


app.use('/', router)
app.use('/user', userRoutes)
app.use('/task', taskRoutes)

// Use Api routes in the App

// Launch app to listen to specified port
app.listen(3000, function () {
    console.log("Running RestHub on port 3000");
})

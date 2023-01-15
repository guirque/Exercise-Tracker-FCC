const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//Connecting to DB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://fccProjectGuique:enter@fccprojects.ugxakyf.mongodb.net/?retryWrites=true&w=majority')
.then(() => {console.log(`Connected to DB successfully.`)}).catch((error)=>{console.log(`Error connecting to DB: ${error}`)});

//Requiring Models
const {exercises, exerciseUsers} = require('./schemas');

//Getting Logger
app.use(require('./middleware/logger'));

//Requiring POST Controller Functions
const {createUser, addExercises} = require('./controllers/post');

//Requiring GET Controller Functions
const {log, getAllUsers} = require('./controllers/get');

//Parsing Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//POST Requests
app.post('/api/users', createUser);
app.post('/api/users/:id/exercises', addExercises);

//GET Requests
app.get('/api/users', getAllUsers);
app.get('/api/users/:_id/logs', log);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

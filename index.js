const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//Requiring POST Controller Functions
const {createUser, addExercises} = require('./controllers/post');

//Requiring GET Controller Functions
const {log} = require('./controllers/get');

//Parsing Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//POST Requests
app.post('/api/user', createUser);
app.post('/api/user/:id/exercises', addExercises);

//GET Requests
app.get('/api/users/:_id/logs', log);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

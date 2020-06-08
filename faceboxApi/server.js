const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'faceboxadmin',
		password: 'facebox',
		database: 'faceboxapp'
	}
})

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send(db.users) })

app.post('/signin', signin.handleSignIn(db, bcrypt)) // Dependeny injection
									
app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, () => {
	console.log('app is running on port 3001');
})
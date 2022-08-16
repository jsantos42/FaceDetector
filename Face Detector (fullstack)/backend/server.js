//==============================================================================
//	SETUP
//==============================================================================
// Express
const express = require('express');
const app = express();

// Cross-Origin Resource Sharing (when in the middleware, prevents the "No
// Access-Control-Allow-Origin" CORS block")
const cors = require('cors');

// Encrypting passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Connecting to the database
const knex = require('knex');
const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		// port : 5432,
		// user : 'jas',
		// password : '',
		database: 'face-detector'
	}
});

// Middleware
app.use(express.json()); // converts request body info to json format
app.use(cors()); // prevents the "No Access-Control-Allow-Origin" CORS block

// Listen
const port = 3000;
app.listen(port, () => {
	console.log(`app is running on port ${port}`);
})


//==============================================================================
//	ENDPOINTS  (always plan first what endpoints you want on your API)
//==============================================================================
/**
 *	GET ALL USERS ON THE DATABASE
 *	Endpoint: '/'
 *	Method: GET
 *	Body: (empty)
 *	@return an array with all users on the database
 */
app.get('/', (req, res) => {
	db.select().from('users').then(users => {
		if (users.length)
			res.json(users);
		else
			res.status(400).json('No users on the database');
	})
})


/**
 *	GET SPECIFIC USER ON THE DATABASE
 *	Endpoint: '/profile/:id'
 *	Method: GET
 *	Body: (empty)
 *	@return the specified user
 */
/*
(1) Here we're using the 'key, value' syntax, but if using the object one, we
could have:  .where({ id: id })     or with destructuring in ES6:   .where({id})
 */
app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	db.select().from('users').where('id', id)			// (1)
		.then(user => {
			if (user.length)
				res.json(user[0]);
			else
				res.status(400).json('no such user');
		})
})


/**
 *	REGISTER USER ON THE DATABASE
 *	Endpoint: '/register'
 *	Method: POST
 *	Body: json object that has the email, name and password of the new user
 *	@return the newly registered user
 */
/*
(1) respond with the registered user, thanks to the 'returning' method above
(2) catches the error when you try to register the same user twice. However,
you do NOT want to return the 'err' object, because you'd be revealing that
that user is already registered on your db! So, just return a vague string.
 */
app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	
	// I'm having trouble to retrieve the hash from this promise
	// bcrypt.hash(password, saltRounds, (err, hash) => {
	// 	console.log(hash)
	// })
	
	db('users')
		.returning(['*'])									// (1)
		.insert({
			name: name,
			email: email,
			joined: new Date(),
		}).then(user => res.json(user[0]))               	// (1)
		.catch(err => res
			.status(400)
			.json('unable to register'));				// (2)
	
})

/**
 * needing description
 */
app.post('/signIn', (req, res) => {
	const {email, password} = req.body;
	// bcrypt.compare(password, '$2b$10$.rysdb.wu2h85ajtrdgfr./v4bgnei0jptl2yeo6ggxpvy/zdm.aq', (err, res) =>{
	// 	console.log('first', res);
	// })
	// bcrypt.compare('vag', '$2b$10$.rysdb.wu2h85ajtrdgfr./v4bgnei0jptl2yeo6ggxpvy/zdm.aq', (err, res) =>{
	// 	console.log('second', res);
	// })
	let found = false;
	database.users.forEach(user => {
		if (email === user.email && password === user.password) {
			found = true;
			res.json(user);
		}
	})
	if (!found)
		res.status(400).json('error logging in');
})



app.put('/image', (req, res) => {
	const {id} = req.body;
	
	let found = false;
	database.users.forEach(user => {
		if (user.id === Number(id)) {
			found = true
			user.entries++;
			res.json(user.entries);
		}
	})
	if (!found)
		res.status(404).json('no such user')
})



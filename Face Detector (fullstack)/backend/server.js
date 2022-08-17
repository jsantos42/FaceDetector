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
	db.select().from('users').where('id', id)						// (1)
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
(1) Transactions make sure that, when doing multiple operations on a database,
if one fails they all fail, avoiding inconsistencies in a database (for example,
between tables). It should be used if you need to do operations that are related
(in this example, when adding a user to both the 'users' and 'login' table)
(2) the into(<table>) is the same as trx(<table>)
(3) makes sure it returns the whole row of the inserted user
(4) makes sure the transaction is executed if every operation went well.
Otherwise, rollback() undoes any changes to the database.
(5) catches the error when you try to register the same user twice. However, you
do NOT want to return the 'err' object, because you'd be revealing that that
user is already registered on your db! So, just return a vague string.
 */
app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	bcrypt.hash(password, saltRounds, (err, hash) => {
		db.transaction(trx => trx									// (1)
			.insert({
				email: email,
				hash: hash,
			})
			.into('login')											// (2)
			.returning('email')
			.then(emailObjArray => trx
				.insert({
					name: name,
					email: emailObjArray[0].email,
					joined: new Date(),
				})
				.into('users')										// (2)
				.returning(['*'])									// (3)
				.then(user => res.json(user[0]))
			)
			.then(trx.commit)										// (4)
			.catch(trx.rollback)
		)
		.catch(err => {
			console.log(err);
			res.status(400).json('unable to register');	// (5)
		});
	})
})

/**
 *	SIGN IN
 *	Endpoint: '/signIn'
 *	Method: POST
 *	Body: json object that has the email and password of the user
 *	@return the user that signed in
 */
app.post('/signIn', (req, res) => {
	const {email, password} = req.body;
	const errorMessage = 'Wrong credentials.';
	db.select('email', 'hash').from('login').where('email', email)
		.then(data => {
			bcrypt.compare(password, data[0].hash, (err, isPasswordValid) => {
				if (isPasswordValid) {
					db.select().from('users').where('email', email)
						.then(user => res.json(user[0]))
						.catch(err => {
							console.log(err);
							res.status(400).json('unable to get user');
						});
				}
				else
					res.status(400).json(errorMessage);
			})
		})
		.catch(err => {
			console.log(err);
			res.status(400).json(errorMessage);
		});
})


/**
 *	INCREMENT THE ENTRIES VALUE OF THE CURRENT USER
 *	Endpoint: '/entries'
 *	Method: PUT
 *	Body: json object that has the id of the current user
 *	@return the updated value of entries
 */
app.put('/entries', (req, res) => {
	db('users')
		.returning('entries')
		.where('id', req.body.id)
		.increment('entries', 1)
		.then(userEntries => {
			if (userEntries.length)
				res.json(userEntries[0].entries);
			else
				res.status(400).json('unable to get entries');
		});
})
const express = require('express');
const app = express();

//==============================================================================
// CROSS-ORIGIN RESOURCE SHARING (when in the middleware, prevents the "No
// Access-Control-Allow-Origin" CORS block")
//==============================================================================
const cors = require('cors');

//==============================================================================
// ENCRYPTING PASSWORDS
//==============================================================================
const bcrypt = require('bcrypt');
const saltRounds = 10;


//==============================================================================
// "DATABASE"
//==============================================================================
const database = {
	users: [
		{
			id: 1,
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date(),
		},
		{
			id: 2,
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date(),
		},
	]
}


//==============================================================================
// MIDDLEWARE
//==============================================================================
app.use(express.json()); // converts request body info to json format
app.use(cors()); // prevents the "No Access-Control-Allow-Origin" CORS block


//==============================================================================
// ROUTES
//==============================================================================
/*
	First plan what endpoints you want on your API:
		/signin				POST = success/fail
		/register			POST = user
		/profile/:userId	GET = user
		/image				PUT = user
 */

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	
	// I'm having trouble to retrieve the hash from this promise
	// bcrypt.hash(password, saltRounds, (err, hash) => {
	// 	console.log(hash)
	// })
	if (!database.users.filter(user => user.email === email).length) {
		const newUser = {
			id: Number(database.users.slice(-1)[0].id) + 1,
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date(),
		}
		database.users.push(newUser);
		res.json(newUser);
	}
	else
		res.json('email already registered');
})

app.post('/signIn', (req, res) => {
	const	{email, password} = req.body;
	// bcrypt.compare(password, '$2b$10$.rysdb.wu2h85ajtrdgfr./v4bgnei0jptl2yeo6ggxpvy/zdm.aq', (err, res) =>{
	// 	console.log('first', res);
	// })
	// bcrypt.compare('vag', '$2b$10$.rysdb.wu2h85ajtrdgfr./v4bgnei0jptl2yeo6ggxpvy/zdm.aq', (err, res) =>{
	// 	console.log('second', res);
	// })
	let		found = false;
	database.users.forEach(user => {
		if (email === user.email && password === user.password) {
			found = true;
			res.json(user);
		}
	})
	if (!found)
		res.status(400).json('error logging in');
})


app.get('/profile/:id', (req, res) => {
	const	{id} = req.params;
	let		found = false;
	database.users.forEach(i => {
		if (i.id === Number(id)) {
			found = true
			res.json(i);
		}
	})
	if (!found)
		res.status(404).json('no such user')
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


//==============================================================================
// LISTEN
//==============================================================================
const port = 3000;
app.listen(port, () => {
	console.log(`app is running on port ${port}`);
})

const express = require('express');
const app = express();

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
app.use(express.json())


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

app.post('/signIn', (req, res) => {
	const {email, password} = req.body;
	database.users.forEach(user => {
		if (email === user.email && password === user.password)
			res.json('success');
		else
			res.status(400).json('error logging in');
	})
})

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	database.users.push({
			id: Number(database.users.slice(-1)[0].id) + 1,
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date(),
	});
	res.json(database.users.slice(-1)[0]);
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	
	let found = false;
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

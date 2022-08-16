//==============================================================================
// IMPORTING THE EXPRESS PACKAGE
//==============================================================================
const express = require('express');
const app = express();


//==============================================================================
// USING THE EXPRESS MIDDLEWARE
// This allows us to do something with the request before processing it.
//==============================================================================

// The third parameter will be a function to continue to the request processing
app.use((req, res, next) => {
	console.log('express.js middleware working')
	next();
})

/* This makes use of body-parser (package that got incorporated into express.js)
and parses the information received as x-www-form-urlencoded and json (in
Postman, it's inside the raw type). Also, from the documentation:
    "The extended option allows to choose between parsing the URL-encoded data
    with the querystring library (when false) or the qs library (when true)."
*/
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//This will let the server serve the index.html file in the public directory
app.use(express.static(__dirname + '/public'))

//==============================================================================
// DEFINING ROUTES
//==============================================================================

//To test this one, comment line 29, otherwise the static page will override this
app.get('/', (req, res) => {
	res.send('<h1>This is root</h1>')
	// Here are some properties of requests
	console.log(req.query); // Reads a query string; try localhost:3000/?name=me&age=29
	console.log(req.body); // Reads what was sent in the body (x-www-form-urlencoded and json)
	console.log(req.headers); // Reads the headers from requests
	// console.log(req.params); // this one lets test in another route to place a param
})

app.get('/:id/:nextField', (req, res) => {
	console.log(req.params);
	res.send(); //if requesting with 'http://localhost:3000/3/a', {id: '3', nextField: 'a'}
	// res.json(); //this can also be used to send a response in json format
})

const user = {
	user: 'user1',
	hobby: 'skiing',
};

//Note that in Express we don't need to stringify JSON
app.get('/profile', (req, res) => {
	res.send(user);
})

app.post('/profile', (req, res) => {
	console.log(req.body);
	res.send('posting');
})

app.get('/wrongFile', (req, res) => {
	res.status(404).send('not found');
})


//==============================================================================
// LISTENING TO A PORT
//==============================================================================
app.listen(3000);


//==============================================================================
// SIMPLE EXPRESS SERVER THAT SERVES A STATIC PAGE
//==============================================================================
// const express = require('express');
// const app = express();
// app.use(express.static(__dirname + '/public'))
// app.listen(3000);


//==============================================================================
// NODE FILE SYSTEM MODULE - READ, APPEND, WRITE, DELETE
//==============================================================================
const fs = require('fs');

//  This one is asynchronous, hence the callback; it's the preferred one to use
// in a server
fs.readFile('./package.json', {encoding: 'utf8'}, (err, data) => {
	if (err)
		throw err;
	console.log('Async', data);
})

const file = fs.readFileSync('./package.json', {encoding: 'utf8'});
console.log('Sync', file)


fs.appendFile('./testingAppend.txt', 'new info\n', err => {
	if (err)
		console.log(err);
})


fs.writeFile('./testingWrite.txt', 'writing stuff\n', err => {
	if (err)
		console.log(err);
})

// This is the delete method
fs.unlink('./testingAppend.txt', err => {
	if (err)
		console.log(err);
})
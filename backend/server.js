//==============================================================================
//	SETUP
//==============================================================================
// Express
const express = require('express');
const app = express();

// Read env variables from .env file
require('dotenv').config();

const  morgan = require('morgan')

// Cross-Origin Resource Sharing (when in the middleware, prevents the "No
// Access-Control-Allow-Origin" CORS block")
const cors = require('cors');

// Encrypting passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Connecting to the database
const knex = require('knex');
const connectionObj = process.argv[2] ==='localserver'
	? {
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DB,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD
		// port : 5432,
	}
	: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
				rejectUnauthorized: false
		},
	};

const db = knex({
	client: 'pg',
	connection: connectionObj,
});

// Middleware
app.use(morgan('combined'))
app.use(express.json()); // converts request body info to json format
app.use(cors()); // prevents the "No Access-Control-Allow-Origin" CORS block

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
})

// Controllers
const {users} = require("./controllers/users");
const {profile} = require("./controllers/profile");
const {register} = require("./controllers/register");
const {signIn} = require("./controllers/signIn");
const {analyseImage} = require("./controllers/analyseImage");
const {entries} = require("./controllers/entries");


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
// app.get('/', (req, res) => users(req, res, db));
app.get('/', (req, res) => res.send('ITS WORKING'));


/**
 *	GET SPECIFIC USER ON THE DATABASE
 *	Endpoint: '/profile/:id'
 *	Method: GET
 *	Body: (empty)
 *	@return the specified user
 */
app.get('/profile/:id', (req, res) => profile(req, res, db));


/**
 *	REGISTER USER ON THE DATABASE
 *	Endpoint: '/register'
 *	Method: POST
 *	Body: json object that has the email, name and password of the new user
 *	@return the newly registered user
 */
app.post('/register', (req, res) => register(req, res, db, bcrypt, saltRounds));


/**
 *	SIGN IN
 *	Endpoint: '/signIn'
 *	Method: POST
 *	Body: json object that has the email and password of the user
 *	@return the user that signed in
 */
app.post('/signIn', (req, res) => signIn(req, res, db, bcrypt));

/**
 *	SEND IMAGE URL TO CLARIFAI
 *	Endpoint: '/analyseImage'
 *	Method: POST
 *	Body: json object that has the image url
 *	@return the output of the clarifai API with the faceBoxes position
 */
app.post('/analyseImage', analyseImage);

/**
 *	INCREMENT THE ENTRIES VALUE OF THE CURRENT USER
 *	Endpoint: '/entries'
 *	Method: PUT
 *	Body: json object that has the id of the current user
 *	@return the updated value of entries
 */
app.put('/entries', (req, res) => entries(req, res, db));
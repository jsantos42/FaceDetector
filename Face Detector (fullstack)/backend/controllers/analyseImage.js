//==============================================================================
// API INITIALIZATION
//==============================================================================
const {myAPIKey} = require('../api');
const Clarifai = require('clarifai');
const app = new Clarifai.App({
	apiKey: myAPIKey,
})

const analyseImage = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Failed to call API.'));
}

module.exports = {analyseImage};
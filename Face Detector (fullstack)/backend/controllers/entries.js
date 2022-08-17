const entries = (req, res, db) => {
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
	
}

module.exports = {entries};
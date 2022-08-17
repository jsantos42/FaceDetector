const users = (req, res, db) => {
	db.select().from('users').then(users => {
		if (users.length)
			res.json(users);
		else
			res.status(400).json('No users on the database.');
	})
}

module.exports = {users};
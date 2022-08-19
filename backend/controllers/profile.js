/*
(1) Here we're using the 'key, value' syntax, but if using the object one, we
could have:  .where({ id: id })     or with destructuring in ES6:   .where({id})
 */
const profile = (req, res, db) => {
	const {id} = req.params;
	db.select().from('users').where('id', id)						// (1)
		.then(user => {
			if (user.length)
				res.json(user[0]);
			else
				res.status(400).json('no such user');
		})
}

module.exports = {profile};
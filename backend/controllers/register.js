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
const register = (req, res, db, bcrypt, saltRounds) => {
	const {email, name, password} = req.body;
	if (!email || !name || !password)
		res.status(400).json('Every field must be filled in.');
	else
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
				  res.status(400).json('Unable to register.');			// (5)
		   	});
		})
}

module.exports = {register};

const users = [
	{firstName: 'Andrei', lastName: 'Zbn'},
	{firstName: 'Zebra', lastName: 'Zan'},
];


const sortUsers = (users) => {
	const sortedUsers = users.slice().sort((i, j) => {
		if (i.lastName < j.lastName)
			return (-1);
		else if (i.lastName > j.lastName)
			return (1);
		else
			return (0);
	});
	return sortedUsers;
}

const sortedUsers = sortUsers(users);

console.log(users);
console.log(sortedUsers);

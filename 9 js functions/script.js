//==============================================================================
// FUNCTIONS
//==============================================================================
// function sayHello() {
//     console.log("Hello");
// }
//
// sayHello();
//
// var a = function sayBye() {
//     console.log("Byebye");
// }
//
// a();
// sayBye();
//
// function checkDriverAge(age) {
//     if (age < 18)
//         console.log("Sorry, you are too yound to drive this car. Powering off");
//     else if (age > 18)
//         console.log("Powering On. Enjoy the ride!");
//     else if (age === 18)
//         console.log("Congratulations on your first year of driving. Enjoy the ride!");
// }
//
// var checkDriverAge2 = function(age) {
//     if (age < 18)
//         console.log("Sorry, you are too yound to drive this car. Powering off");
//     else if (age > 18)
//         console.log("Powering On. Enjoy the ride!");
//     else if (age === 18)
//         console.log("Congratulations on your first year of driving. Enjoy the ride!");
// }
//
//
// var age = Number(prompt("What is your age?"));
//
// checkDriverAge(age);
// checkDriverAge2(age);

//==============================================================================
// ARRAYS
//==============================================================================
// var array = ["Banana", "Apples", "Oranges", "Blueberries"];
//
// console.log(array);
// array.shift();
// console.log(array);
// array.sort();
// console.log(array);
// array.push("Kiwi");
// console.log(array);
// array.shift();
// console.log(array);
// array.reverse();
// console.log(array);
// array.splice(1,1);
// console.log(array);
//
// var array2 = ["Banana", ["Apples", ["Oranges"], "Blueberries"]];
// console.log(array2[1][1][0]);

//==============================================================================
// FACEBOOK EXAMPLE
//==============================================================================
// var database = [
//     {
//         username: "John",
//         password: "secret",
//     },
// ];
//
// var newsfeed = [
//     {
//         username: "Bobby",
//         timeline: "don't know",
//     },
//     {
//         username: "Keyllin",
//         timeline: "watch me",
//     },
// ];
//
// var userNamePrompt = prompt("Username: ");
// var passwordPrompt = prompt("Password: ");
//
// function signIn(user, password) {
//    if (user === database[0].username && password === database[0].password)
//        console.log(newsfeed);
//    else
//        alert("Sorry, wrong username and/or password.");
// }
//
// signIn(userNamePrompt, passwordPrompt);

//==============================================================================
// LOOPS
//==============================================================================
// var todos = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
// ];
//
// for (var i = 0; i < todos.length; i++) {
//     todos[i] += "!";
// }
//
// // console.log(todos);
//
// // todos.forEach(function(j) {
// //     console.log(j);
// // })
//
// function logTodos(string, iter) {
//     console.log(string, iter);
// }
//
// todos.forEach(logTodos);

//==============================================================================
// FACEBOOK EXAMPLE WITH LOOPS
//==============================================================================
var database = [
    {
        username: "john",
        password: "secret",
    },
    {
        username: "k",
        password: "i",
    },
];

var newsfeed = [
    {
        username: "Bobby",
        timeline: "don't know",
    },
    {
        username: "Keyllin",
        timeline: "watch me",
    },
];

var userNamePrompt = prompt("Username: ");
var passwordPrompt = prompt("Password: ");

function isUserValid(user, password) {
    for (var i = 0; i < database.length; i++) {
        if (user === database[i].username && password === database[i].password)
            return true;
    }
    return false;
}
function signIn(user, password) {
    if (isUserValid(user, password))
        console.log(newsfeed);
    else
        alert("Sorry, wrong username and/or password.");
}

signIn(userNamePrompt, passwordPrompt);
